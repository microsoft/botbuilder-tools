// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

using System;

namespace AzureReverseProxy
{
    public static class StringEx
    {
        /// <summary>
        /// Ensures the given string ends with the requested pattern. If it does no allocations are performed.
        /// </summary>
        public static string EnsureEndsWith(this string s, string value, StringComparison comparisonType = StringComparison.Ordinal)
        {
            if (!string.IsNullOrEmpty(s) && s.EndsWith(value, comparisonType))
            {
                return s;
            }

            return s + value;
        }
    }
}
