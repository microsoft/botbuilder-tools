// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

using Microsoft.Azure.Management.Relay;
using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Azure.Management.ResourceManager.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Reflection;
using ResourceManagementClient = Microsoft.Azure.Management.ResourceManager.ResourceManagementClient;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.Management.Relay.Models;

namespace AzureReverseProxy
{
    public class AzureReverseTool
    {
        private readonly IConfiguration config;
        private readonly AzureCredentials credentials;
        private readonly RelayManagementClient relayManagementClient;
        private DispatcherService hybridProxy;

        public AzureReverseTool(IConfiguration config)
        {
            this.config = config;

            // Try to obtain the service credentials
            credentials = new AzureCredentialsFactory().FromServicePrincipal(
                            config.ClientId,
                            config.ClientSecret,
                            config.TenantId,
                            AzureEnvironment.AzureGlobalCloud);

            relayManagementClient = new RelayManagementClient(credentials) { SubscriptionId = config.SubscriptionId };
        }

        public void GenerateRelayResource()
        {
            // Read the template and parameter file contents
            JObject templateFileContents = GetJsonFileContents("AzureReverseProxy.template.json");
            JObject parameterFileContents = GetJsonFileContents("AzureReverseProxy.parameters.json");

            // Assign the deplyment name specified by the user
            parameterFileContents["parameters"]["namespaces_Relay_Demo_name"]["value"] = config.DeploymentName;
            templateFileContents["parameters"]["namespaces_Relay_Demo_name"]["defaultValue"] = config.DeploymentName;

            // Create the resource manager client
            ResourceManagementClient resourceManagementClient = new ResourceManagementClient(credentials)
            {
                SubscriptionId = config.SubscriptionId
            };

            // Create or check that resource group exists
            EnsureResourceGroupExists(resourceManagementClient, config.ResourceGroupName, config.ResourceGroupLocation);

            // Start a deployment
            DeployTemplate(resourceManagementClient, config.ResourceGroupName, config.DeploymentName, templateFileContents, parameterFileContents);
        }

        /// <summary>
        /// Reads a JSON file from the specified path
        /// </summary>
        /// <param name="pathToJson">The full path to the JSON file</param>
        /// <returns>The JSON file contents</returns>
        private static JObject GetJsonFileContents(string fileName)
        {
            var assembly = Assembly.GetExecutingAssembly();

            using (Stream stream = assembly.GetManifestResourceStream(fileName))
            using (StreamReader file = new StreamReader(stream))
            using (JsonTextReader reader = new JsonTextReader(file))
            {
                return (JObject)JToken.ReadFrom(reader);
            }
        }

        /// <summary>
        /// Ensures that a resource group with the specified name exists. If it does not, will attempt to create one.
        /// </summary>
        /// <param name="resourceManagementClient">The resource manager client.</param>
        /// <param name="resourceGroupName">The name of the resource group.</param>
        /// <param name="resourceGroupLocation">The resource group location. Required when creating a new resource group.</param>
        private async static void EnsureResourceGroupExists(ResourceManagementClient resourceManagementClient, string resourceGroupName, string resourceGroupLocation)
        {
            var exists = resourceManagementClient.ResourceGroups.CheckExistenceAsync(resourceGroupName).GetAwaiter().GetResult();
            if (!exists)
            {
                // Console.WriteLine(string.Format("Creating resource group '{0}' in location '{1}'", resourceGroupName, resourceGroupLocation));
                var resourceGroup = new ResourceGroup
                {
                    Location = resourceGroupLocation
                };

                await resourceManagementClient.ResourceGroups.CreateOrUpdateAsync(resourceGroupName, resourceGroup);
            }
            else
            {
                // Console.WriteLine(string.Format("Using existing resource group '{0}'", resourceGroupName));
            }
        }

        /// <summary>
        /// Starts a template deployment.
        /// </summary>
        /// <param name="resourceManagementClient">The resource manager client.</param>
        /// <param name="resourceGroupName">The name of the resource group.</param>
        /// <param name="deploymentName">The name of the deployment.</param>
        /// <param name="templateFileContents">The template file contents.</param>
        /// <param name="parameterFileContents">The parameter file contents.</param>
        private static void DeployTemplate(ResourceManagementClient resourceManagementClient, string resourceGroupName, string deploymentName, JObject templateFileContents, JObject parameterFileContents)
        {
            var deployment = new Deployment
            {
                Properties = new DeploymentProperties
                {
                    Mode = DeploymentMode.Incremental,
                    Template = templateFileContents,
                    Parameters = parameterFileContents["parameters"].ToObject<JObject>()
                }
            };

            var deploymentResult = resourceManagementClient.Deployments.CreateOrUpdate(resourceGroupName, deploymentName, deployment);
        }

        public AuthorizationRule GetAuthorizationRule(string ruleName)
        {
            var response = relayManagementClient.Namespaces.ListKeysWithHttpMessagesAsync(config.ResourceGroupName, config.DeploymentName, ruleName).Result.Response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            return JsonConvert.DeserializeObject<AuthorizationRule>(response);
        }

        public bool CheckExistence()
        {
            var name = new CheckNameAvailability(config.DeploymentName);
            var result = relayManagementClient.Namespaces.CheckNameAvailabilityMethod(name).NameAvailable;

            // The return is inverted since 'result' return TRUE if it doesnt exist
            return (result == null || result == false) ? true : false;
        }

        public void DeleteResource()
        {
            relayManagementClient.Namespaces.Delete(config.ResourceGroupName, config.DeploymentName);
        }

        public async Task CloseListener()
        {
            await hybridProxy.CloseAsync(CancellationToken.None);
        }

        public async Task StartListener()
        {
            hybridProxy = new DispatcherService(config.DeploymentName + ".servicebus.windows.net", "demo-hybrid-connection", "sas-rule", GetAuthorizationRule("sas-rule").PrimaryKey, new System.Uri($"http://localhost:{ config.Port }/"));

            await hybridProxy.OpenAsync(CancellationToken.None);
        }
    }
}
