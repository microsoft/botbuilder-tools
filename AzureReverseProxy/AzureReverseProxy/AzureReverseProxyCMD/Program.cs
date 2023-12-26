// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

using System;
using System.IO;
using System.Threading.Tasks;
using AzureReverseProxy;
using Newtonsoft.Json;

namespace AzureReverseProxyCMD
{
    class Program
    {
        private static AzureReverseTool AZProxy;
        private static bool DeleteResource = false;
        private static bool Run = true;
        static void Main(string[] args)
        {
            AppDomain.CurrentDomain.ProcessExit += new EventHandler(OnProcessExit);

            // Event to stop the process
            Console.CancelKeyPress += delegate (object sender, ConsoleCancelEventArgs e) {
                e.Cancel = true;
                Run = false;
                AZProxy.CloseListener().GetAwaiter().GetResult();
            };

            MainAsync().Wait();
        }

        private static async Task MainAsync()
        {
            var config = GetConfiguration();
            AZProxy = new AzureReverseTool(config);

            Console.WriteLine($"Check existence of '{ config.DeploymentName }' in '{ config.ResourceGroupName }' group...");
            if (!AZProxy.CheckExistence())
            {
                Console.WriteLine($"'{ config.DeploymentName }' was not found. Deploying to '{ config.ResourceGroupName }' group...");
                AZProxy.GenerateRelayResource();
                Console.WriteLine($"'{ config.DeploymentName }' created.");
            }
            else
            {
                Console.WriteLine($"'{ config.DeploymentName }' found.");
            }

            Console.WriteLine("Starting listener...\n");
            await AZProxy.StartListener();

            while (Run)
            {
                await Task.Delay(100);
            }
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
            if (AZProxy != null)
            {
                AZProxy.CloseListener().GetAwaiter().GetResult();
            }

            if (DeleteResource)
            {
                Console.WriteLine(Environment.NewLine + "Deleting the generated resources...");
                AZProxy.DeleteResource();
                Console.WriteLine("\nThe resurce was eliminated.");
            }
        }
    }
}
