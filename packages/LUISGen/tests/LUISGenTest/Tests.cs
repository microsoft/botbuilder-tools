// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Bot.Builder.AI.Luis;
using Newtonsoft.Json;
using Microsoft.Bot.Builder;
using Newtonsoft.Json.Linq;
using Microsoft.Bot.Builder.Ai.LUIS.Tests;
using RichardSzalay.MockHttp;
using System.Net.Http;
using Microsoft.Bot.Builder.Adapters;
using Microsoft.Bot.Schema;
using System.Text;

namespace LUISGenTest
{
    [TestClass]
    public class Tests
    {
        private readonly string _appId = TestUtilities.GetKey("LUISAPPID", "ab48996d-abe2-4785-8eff-f18d15fc3560");
        private readonly string _endpointKey = TestUtilities.GetKey("LUISAPPKEY", null);
        private readonly string _endpoint = TestUtilities.GetKey("LUISENDPOINT", "https://westus.api.cognitive.microsoft.com");
        // Changing this to false will cause running against the actual LUIS service.
        // This is useful in order to see if the oracles for mocking or testing have changed.
        private readonly bool _mock = false;

        private bool WithinDelta(JToken token1, JToken token2, double delta, bool compare = false)
        {
            bool withinDelta = true;
            if (token1.Type == JTokenType.Object && token2.Type == JTokenType.Object)
            {
                var obj1 = (JObject)token1;
                var obj2 = (JObject)token2;
                withinDelta = obj1.Count == obj2.Count;
                foreach (var property in obj1)
                {
                    if (!withinDelta)
                    {
                        break;
                    }
                    withinDelta = obj2.TryGetValue(property.Key, out JToken val2) && WithinDelta(property.Value, val2, delta, compare || property.Key == "score" || property.Key == "intents");
                }
            }
            else if (token1.Type == JTokenType.Array && token2.Type == JTokenType.Array)
            {
                var arr1 = (JArray)token1;
                var arr2 = (JArray)token2;
                withinDelta = arr1.Count() == arr2.Count();
                for (var i = 0; withinDelta && i < arr1.Count(); ++i)
                {
                    withinDelta = WithinDelta(arr1[i], arr2[i], delta);
                    if (!withinDelta)
                    {
                        break;
                    }
                }
            }
            else if (!token1.Equals(token2))
            {
                if (token1.Type == token2.Type)
                {
                    var val1 = (JValue)token1;
                    var val2 = (JValue)token2;
                    withinDelta = false;
                    if (compare &&
                        double.TryParse((string)val1, out double num1)
                                && double.TryParse((string)val2, out double num2))
                    {
                        withinDelta = Math.Abs(num1 - num2) < delta;
                    }
                }
                else
                {
                    withinDelta = false;
                }
            }
            return withinDelta;
        }

        private JObject Json<T>(T result)
        {
            return (JObject)JsonConvert.DeserializeObject(
                JsonConvert.SerializeObject(result,
                    new JsonSerializerSettings
                    {
                        Formatting = Formatting.Indented,
                        NullValueHandling = NullValueHandling.Ignore
                    }));
        }

        // To create a file to test:
        // 1) Create a <name>.json file with an object { Text:<query> } in it.
        // 2) Run this test which will fail and generate a <name>.json.new file.
        // 3) Check the .new file and if correct, replace the original .json file with it.
        public async Task<T> TestJson<T>(string file) where T : IRecognizerConvert, new()
        {
            var expectedPath = GetFilePath(file);
            var newPath = expectedPath + ".new";

            using (var expectedJsonReader = new JsonTextReader(new StreamReader(expectedPath)))
            {
                var expectedJson = await JToken.ReadFromAsync(expectedJsonReader);
                using (var mockResponse = new MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(expectedJson["luisResult"]))))
                {
                    var text = expectedJson["text"] ?? expectedJson["Text"];
                    var query = text.ToString();
                    var context = GetContext(query);

                    var mockHttp = new MockHttpMessageHandler();
                    mockHttp.When(GetRequestUrl()).WithPartialContent(query)
                        .Respond("application/json", mockResponse);

                    var luisRecognizer = GetLuisRecognizer(mockHttp, true, new LuisPredictionOptions { IncludeAllIntents = true });
                    var typedResult = await luisRecognizer.RecognizeAsync<T>(context, CancellationToken.None);
                    var typedJson = Json(typedResult);

                    if (!WithinDelta(expectedJson, typedJson, 0.1))
                    {
                        using (var writer = new StreamWriter(newPath))
                        {
                            writer.Write(typedJson);
                        }

                        Assert.Fail($"Returned JSON in {newPath} != expected JSON in {expectedPath}");
                    }
                    else
                    {
                        File.Delete(expectedPath + ".new");
                    }
                    return typedResult;
                }
            }
        }

        [TestMethod]
        public async Task TestGeneration()
        {
            var r = await TestJson<Contoso_App>("test.json");
            var (intent, score) = r.TopIntent();
            Assert.AreEqual(Contoso_App.Intent.EntityTests, intent);
        }

        [TestMethod]
        public async Task TestHierarchy()
        {
            var r = await TestJson<Contoso_App>("testhierarchy.json");
            var (intent, score) = r.TopIntent();
            Assert.AreEqual(Contoso_App.Intent.Travel, intent);
        }

        [TestMethod]
        public async Task TestPattern()
        {
            var r = await TestJson<Contoso_App>("testpatterns.json");
            var (intent, score) = r.TopIntent();
            Assert.AreEqual(Contoso_App.Intent.search, intent);
        }

        private static TurnContext GetContext(string utterance)
        {
            var b = new TestAdapter();
            var a = new Activity
            {
                Type = ActivityTypes.Message,
                Text = utterance,
                Conversation = new ConversationAccount(),
                Recipient = new ChannelAccount(),
                From = new ChannelAccount()
            };
            return new TurnContext(b, a);
        }

        private IRecognizer GetLuisRecognizer(MockHttpMessageHandler messageHandler, bool verbose = false, LuisPredictionOptions options = null)
        {
            if (!_mock && _endpointKey == null)
            {
                Assert.Inconclusive("Cannot run live tests without an endpoint key.");
            }
            var luisApp = new LuisApplication(_appId, _endpointKey, _endpoint);
            return new LuisRecognizer(luisApp, options, verbose, _mock ? new MockedHttpClientHandler(messageHandler.ToHttpClient()) : null);
        }

        private string GetRequestUrl() => $"{_endpoint}/luis/v2.0/apps/{_appId}";

        // Access the checked-in oracles so that if they are changed you can compare the changes and easily modify them.
        private const string _testData = @"..\..\..\TestData\";

        private Stream GetResponse(string fileName)
        {
            var path = Path.Combine(_testData, fileName);
            return File.OpenRead(path);
        }

        private string GetFilePath(string fileName)
        {
            var path = Path.Combine(_testData, fileName);
            return path;
        }
    }

    public class MockedHttpClientHandler : HttpClientHandler
    {
        private readonly HttpClient client;

        public MockedHttpClientHandler(HttpClient client)
        {
            this.client = client;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var mockedRequest = new HttpRequestMessage()
            {
                RequestUri = request.RequestUri,
                Content = request.Content,
                Method = request.Method
            };
            return client.SendAsync(mockedRequest, cancellationToken);
        }
    }
}
