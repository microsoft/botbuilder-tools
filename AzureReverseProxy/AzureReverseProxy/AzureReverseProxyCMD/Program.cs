using System;
using System.IO;
using AzureReverseProxy;
using Newtonsoft.Json;

namespace AzureReverseProxyCMD
{
    class Program
    {
        private static AzureReverseTool AZProxy;
        static void Main(string[] args)
        {
            AppDomain.CurrentDomain.ProcessExit += new EventHandler(OnProcessExit);

            var config = GetConfiguration();

            Console.WriteLine($"Deploying { config.DeploymentName } to group { config.ResourceGroupName }...");
            AZProxy = new AzureReverseTool(config);
            AZProxy.GenerateRelayResource();
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

        private static void OnProcessExit(object sender, EventArgs e)
        {
            Console.WriteLine(Environment.NewLine + "Deleting the generated resources...");
            AZProxy.DeleteResource();
        }
    }
}
