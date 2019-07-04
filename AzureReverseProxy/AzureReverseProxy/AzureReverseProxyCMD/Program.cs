using System;
using System.IO;
using AzureReverseProxy;
using Newtonsoft.Json;

namespace AzureReverseProxyCMD
{
    class Program
    {
        static void Main(string[] args)
        {
            var az = new AzureReverseTool(GetConfiguration());
            az.GenerateRelayResource();
        }

        private static IConfiguration GetConfiguration()
        {
            var folder = AppDomain.CurrentDomain.BaseDirectory;
            var file = "appsettings.json";

            using (StreamReader reader = new StreamReader(Path.Combine(folder, file)))
            {
                return JsonConvert.DeserializeObject<Configuration>(reader.ReadToEnd());
            }
        }
    }
}
