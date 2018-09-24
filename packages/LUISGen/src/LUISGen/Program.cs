// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
using Newtonsoft.Json;
using System;
using System.IO;

namespace LUISGen
{
    class Program
    {
        static void Usage()
        {
            Console.Error.WriteLine("LUISGen <LUIS.json> [-cs [CLASS]] [-ts [INTERFACE]] [-o PATH]");
            Console.Error.WriteLine("From a LUIS export file generate a strongly typed class for consuming intents and entities.");
            Console.Error.WriteLine("If the input is -, will get the export file from stdin.");
            Console.Error.WriteLine("At least one of -cs or -ts must be supplied.");
            Console.Error.WriteLine("-cs [CLASS] : Generate C# class file including namespace.  Default is Luis.<appName> if no class name is specified.");
            Console.Error.WriteLine("-ts [INTERFACE] : Generate Typescript interface descriptions.  Default is <appName> if no class name is specified.");
            Console.Error.WriteLine("-o PATH : Where to put generated files, defaults to directory where export file is.");
            System.Environment.Exit(-1);
        }

        static string NextArg(ref int i, string[] args, bool optional = false, bool allowCmd = false)
        {
            string arg = null;
            if (i < args.Length)
            {
                arg = args[i];
                if (arg.StartsWith("{"))
                {
                    while (!args[i].EndsWith("}") && ++i < args.Length) ;
                    ++i;
                }
                arg = null;
                if (allowCmd)
                {
                    if (i < args.Length)
                    {
                        arg = args[i];
                    }
                }
                else
                {
                    if (i < args.Length && !args[i].StartsWith('-'))
                    {
                        arg = args[i];
                    }
                    else if (!optional)
                    {
                        Usage();
                    }
                    else
                    {
                        --i;
                    }
                }
            }
            return arg?.Trim();
        }

        static void Main(string[] args)
        {
            string path = null;
            string outPath = null;
            string outType = null;
            var space = "Luis";
            string className = null;
            for (var i = 0; i < args.Length; ++i)
            {
                var arg = NextArg(ref i, args, allowCmd:true);
                if (arg != null)
                {
                    if (path == null)
                    {
                        path = arg;
                    }
                    else
                    {
                        arg = arg.ToLower();
                        if (arg.StartsWith('-'))
                        {
                            switch (arg)
                            {
                                case "-cs":
                                case "-ts":
                                    {
                                        ++i;
                                        var name = NextArg(ref i, args, optional: true);
                                        if (name != null)
                                        {
                                            var lastDot = arg == "-cs" ? name.LastIndexOf('.') : -1;
                                            if (lastDot == -1)
                                            {
                                                className = name;
                                            }
                                            else
                                            {
                                                space = name.Substring(0, lastDot);
                                                className = name.Substring(lastDot + 1);
                                            }
                                        }
                                        outType = arg.Substring(1);
                                    }
                                    break;
                                case "-o":
                                    {
                                        ++i;
                                        outPath = NextArg(ref i, args);
                                    }
                                    break;
                                default:
                                    Usage();
                                    break;
                            }
                        }
                    }
                }
            }
            if (path == null || outType == null)
            {
                Usage();
            }
            outPath = outPath ?? (path == "-" ? "." : Path.GetDirectoryName(path));

            if (path == "-")
            {
                Console.Error.WriteLine("Reading from stdin until EOF (Ctrl-Z).");
            }
            dynamic app;
            using (var inFile = path == "-" ? Console.In : new StreamReader(path))
            {
                app = JsonConvert.DeserializeObject(inFile.ReadToEnd());
            }
            className = className ?? ((string)app.name).Replace(' ', '_');
            if (outType == "cs")
            {
                var description = $"LUISGen {path} -cs {space}.{className} -o {outPath}";
                CSharp.Generate(description, app, className, space, outPath);
            }
            else if (outType == "ts")
            {
                var description = $"LUISGen {path} -ts {className} -o {outPath}";
                Typescript.Generate(description, app, className, outPath);
            }
        }
    }
}
