// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.Relay;
using Newtonsoft.Json;

namespace AzureReverseProxy
{
    class DispatcherService
    {
        private readonly string _connectionName;
        readonly HttpClient _httpClient;
        readonly string _hybridConnectionSubpath;
        private readonly string _key;
        private readonly string _keyName;
        readonly HybridConnectionListener _listener;
        private readonly string _relayNamespace;
        private readonly Uri _targetServiceAddress;

        public DispatcherService(string relayNamespace, string connectionName, string keyName, string key, Uri targetServiceAddress)
        {
            _relayNamespace = relayNamespace;
            _connectionName = connectionName;
            _keyName = keyName;
            _key = key;
            _targetServiceAddress = targetServiceAddress;

            var tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(_keyName, _key);
            _listener = new HybridConnectionListener(new Uri(string.Format("sb://{0}/{1}", _relayNamespace, _connectionName)), tokenProvider);

            _httpClient = new HttpClient
            {
                BaseAddress = targetServiceAddress
            };
            _httpClient.DefaultRequestHeaders.ExpectContinue = false;

            _hybridConnectionSubpath = _listener.Address.AbsolutePath.EnsureEndsWith("/");
        }

        public async Task OpenAsync(CancellationToken cancelToken)
        {
            _listener.RequestHandler = ListenerRequestHandler;
            await _listener.OpenAsync(cancelToken);
            Console.WriteLine("Azure Service Bus is listening on \n\r\t{0}\n\rand routing requests to \n\r\t{1}\n\r\n\r", _listener.Address, _httpClient.BaseAddress);
        }

        public Task CloseAsync(CancellationToken cancelToken)
        {
            _httpClient.Dispose();
            return _listener.CloseAsync(cancelToken);
        }

        private async void ListenerRequestHandler(RelayedHttpListenerContext context)
        {
            var startTimeUtc = DateTime.UtcNow;
            try
            {
                Console.WriteLine("Calling {0}...", _targetServiceAddress);
                var requestMessage = CreateHttpRequestMessage(context);
                var responseMessage = await _httpClient.SendAsync(requestMessage);
                await SendResponseAsync(context, responseMessage);
                await context.Response.CloseAsync();
            }

            catch (Exception ex)
            {
                LogException(ex);
                SendErrorResponse(ex, context);
            }
            finally
            {
                LogRequest(startTimeUtc);
            }
        }

        private async Task SendResponseAsync(RelayedHttpListenerContext context, HttpResponseMessage responseMessage)
        {
            context.Response.StatusCode = responseMessage.StatusCode;
            context.Response.StatusDescription = responseMessage.ReasonPhrase;
            foreach (var header in responseMessage.Headers)
            {
                if (string.Equals(header.Key, "Transfer-Encoding"))
                {
                    continue;
                }

                context.Response.Headers.Add(header.Key, string.Join(",", header.Value));
            }

            var responseStream = await responseMessage.Content.ReadAsStreamAsync();
            await responseStream.CopyToAsync(context.Response.OutputStream);
        }

        private void SendErrorResponse(Exception ex, RelayedHttpListenerContext context)
        {
            context.Response.StatusCode = HttpStatusCode.InternalServerError;
            context.Response.StatusDescription = $"Internal Server Error: {ex.GetType().FullName}: {ex.Message}";
            context.Response.Close();
        }

        private HttpRequestMessage CreateHttpRequestMessage(RelayedHttpListenerContext context)
        {
            var requestMessage = new HttpRequestMessage();
            if (context.Request.HasEntityBody)
            {
                requestMessage.Content = new StreamContent(context.Request.InputStream);
                
                var contentType = context.Request.Headers[HttpRequestHeader.ContentType];
                if (!string.IsNullOrEmpty(contentType))
                {
                    requestMessage.Content.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType);
                }
            }

            var relativePath = context.Request.Url.GetComponents(UriComponents.PathAndQuery, UriFormat.Unescaped);
            relativePath = relativePath.Replace(_hybridConnectionSubpath, string.Empty, StringComparison.OrdinalIgnoreCase);
            requestMessage.RequestUri = new Uri(relativePath, UriKind.RelativeOrAbsolute);
            requestMessage.Method = new HttpMethod(context.Request.HttpMethod);

            foreach (var headerName in context.Request.Headers.AllKeys)
            {
                if (string.Equals(headerName, "Host", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(headerName, "Content-Type", StringComparison.OrdinalIgnoreCase))
                {
                    // Don't flow these headers here
                    continue;
                }

                requestMessage.Headers.Add(headerName, context.Request.Headers[headerName]);
            }

            return requestMessage;
        }

        private void LogRequest(DateTime startTimeUtc)
        {
            var stopTimeUtc = DateTime.UtcNow;

            Console.WriteLine("...and back {0:N0} ms...", stopTimeUtc.Subtract(startTimeUtc).TotalMilliseconds);
            Console.WriteLine("");
        }

        private void LogRequestActivity(HttpRequestMessage requestMessage)
        {
            var content = requestMessage.Content.ReadAsStringAsync().Result;
            Console.ForegroundColor = ConsoleColor.Yellow;
            var s = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };

            dynamic o = JsonConvert.DeserializeObject(content);
            var formatted = JsonConvert.SerializeObject(o, s);
            Console.WriteLine(formatted);
            Console.ResetColor();
        }

        private static void LogException(Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(ex);
            Console.WriteLine("");
            Console.ResetColor();
        }
    }
}
