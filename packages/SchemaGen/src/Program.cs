using System;
using System.Collections.Generic;
using System.IO;

namespace SchemaGen
{
    class Program
    {
        static void Usage()
        {
            Console.Error.WriteLine("SchemaGen <schemaPatterns...> [-o PATH] [-n SCHEMANAME]");
            Console.Error.WriteLine("Assemble together all component schema definitions so interfaces tie together allowed implementations.");
            Console.Error.WriteLine("-n SCHEMANAME : Name of schema that includes all the component schemas.");
            Console.Error.WriteLine("-o PATH : Where to copy all schema files and the overall schem.");
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
            var schemaPatterns = new List<string>();
            string name = "all.xsd";
            string outPath = Directory.GetCurrentDirectory();
            bool xml = false;
            for (var i = 0; i < args.Length; ++i)
            {
                var arg = NextArg(ref i, args, allowCmd: true);
                if (arg != null)
                {
                    if (arg.StartsWith('-'))
                    {
                        arg = arg.ToLower();
                        switch (arg)
                        {
                            case "-n":
                                {
                                    ++i;
                                    name = NextArg(ref i, args);
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
                    else
                    {
                        if (arg.EndsWith("xsd"))
                        {
                            xml = true;
                        }
                        schemaPatterns.Add(arg);
                    }
                }
            }
            Directory.CreateDirectory(outPath);
            if (xml)
            {
                XML.ProcessPatterns(schemaPatterns, outPath, name);
            }
        }
    }
}
