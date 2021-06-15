// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

namespace AzureReverseProxy
{
    public struct AuthorizationRule
    {
        public string PrimaryConnectionString { get; set; }
        public string SecondaryConnectionString { get; set; }
        public string PrimaryKey { get; set; }
        public string SecondaryKey { get; set; }
        public string KeyName { get; set; }
    }
}
