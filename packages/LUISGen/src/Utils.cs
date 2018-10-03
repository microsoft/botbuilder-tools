// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LUISGen
{
    public class Utils
    {
        public static string NormalizeName(dynamic name)
        {
            return ((string)name).Replace('.', '_').Replace(' ', '_');
        }

        public static bool IsPrebuilt(dynamic name, dynamic app)
        {
            bool isPrebuilt = false;
            if (app.prebuiltEntities != null)
            {
                foreach (var child in app.prebuiltEntities)
                {
                    if (child.name == name)
                    {
                        isPrebuilt = true;
                        break;
                    }
                }
            }
            return isPrebuilt;
        }

        public static bool IsList(dynamic name, dynamic app)
        {
            bool isList = false;
            if (app.closedLists != null)
            {
                foreach(var list in app.closedLists)
                {
                    if (list.name == name)
                    {
                        isList = true;
                        break;
                    }
                    foreach(var role in list.roles)
                    {
                        if (role == name)
                        {
                            // This is not technically accurate since the same role
                            // can be found in multiple types for now.  
                            isList = true;
                            break;
                        }
                    }
                }
            }
            return isList;
        }

        public static string JsonPropertyName(dynamic property, dynamic app)
        {
            var name = ((string)property).Split(':').Last();
            if (name.EndsWith("V2"))
            {
                name = name.Substring(0, name.Length - 2);
            }
            return NormalizeName(name);
        }

        // apply(name, type)
        public static void EntityApply(JObject entity, Action<string> action)
        {
            dynamic dynEntity = entity;
            action((string) dynEntity.name);
            if (dynEntity.roles != null)
            {
                foreach (string role in dynEntity.roles)
                {
                    action(role);
                }
            }
        }

        public static JObject Entity(dynamic name)
        {
            dynamic obj = new JObject();
            obj.name = name;
            obj.roles = new JArray();
            return obj;
        }

        private static void WriteInstances(dynamic entities, Action<string> writeInstance)
        {
            if (entities != null)
            {
                foreach (var entity in entities)
                {
                    Utils.EntityApply((JObject)entity, writeInstance);
                }
            }
        }

        public static void WriteInstances(JObject obj, Action<string> writeInstance)
        {
            dynamic app = obj;
            if (app.entities != null)
            {
                foreach (var entity in app.entities)
                {
                    Utils.EntityApply((JObject)entity, writeInstance);
                    if (entity.children != null)
                    {
                        foreach (var child in entity.children)
                        {
                            writeInstance((string)child);
                        }
                    }
                }
            }
            WriteInstances(app.prebuiltEntities, writeInstance);
            WriteInstances(app.closedLists, writeInstance);
            WriteInstances(app.regex_entities, writeInstance);
            WriteInstances(app.patternAnyEntities, writeInstance);
            WriteInstances(app.composites, writeInstance);
        }
    }
}
