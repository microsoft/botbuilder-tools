// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

using System;
using System.Collections.Generic;
using System.Text;

namespace AzureReverseProxy
{
    public struct Configuration : IConfiguration
    {
        public string SubscriptionId { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string ResourceGroupName { get; set; }
        public string DeploymentName { get; set; }

        /// <summary>
        /// Must be specified for creating a new resource group
        /// </summary>
        public string ResourceGroupLocation { get; set; }
        public string TenantId { get; set; }
        public int Port { get; set; }
    }
}
