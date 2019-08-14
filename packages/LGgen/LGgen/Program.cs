using System;
using System.Reflection;
using System.Resources;
using System.Runtime;
using System.Runtime.Serialization.Formatters;
using Microsoft.Bot.Builder.LanguageGeneration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LGgen
{
    class Program
    {
        static void Usage()
        {
            Console.Error.WriteLine("LGgen [-l cs/ts] [-n CLASS_NAME] [-i LG_FILE_PATH] [-o OUTPUT_PATH]");
            Console.Error.WriteLine("Generate a strongly typed class from a LG file");
            Console.Error.WriteLine("-l cs/ts : select C# or Typescript.");
            Console.Error.WriteLine("-i : LG file path");
            Console.Error.WriteLine("-o : output path, defaults to directory where LG file is and the same name with LG file");
            Console.Error.WriteLine("-n : designate class name, defaults to the same name of LG file");
            System.Environment.Exit(-1);
        }

        static void Main(string[] args)
        {
            string lang = null;
            string input = null;
            string output = null;
            string classname = null;
            //Usage();

            if (args == null) Usage();


            for (var i = 0; i < args.Length; ++i)
            {
                var arg = args[i];
                switch (arg)
                {
                    case "-l":
                        lang = args[++i];
                        break;

                    case "-i":
                        input = args[++i];
                        break;

                    case "-n":
                        classname = args[++i];
                        break;

                    case "-o":
                        output = args[++i];
                        break;

                    default:
                        Usage();
                        break;
                }

            };

            if(output == null)
            {
                output = input.Substring(0, input.IndexOf('.'));
                switch (lang)
                {
                    case "cs":
                        output += ".cs";
                        break;
                    case "ts":
                        output += ".ts";
                        break;
                }
            }

            if(classname == null)
            {
                classname = FindClassName(input);
            }
            

            TemplateEngine lgEngine = new TemplateEngine();
            lgEngine.AddFile(input);
            List<string> lgtemplatename = new List<string>();
            lgEngine.Templates.ForEach(num => lgtemplatename.Add(num.Name));
            Console.WriteLine($"generating class file {output}");

            if(lang == "cs")
            {
                CSharp.generate(output, classname, lgtemplatename);
            }

        }

        static string FindClassName(string input)
        {
            if(input.IndexOf('\\') == -1 && input.IndexOf('/') == -1)
            {
                return input.Substring(0, input.IndexOf('.'));
            }
            else
            {
                var index = Math.Max(input.LastIndexOf('\\'), input.LastIndexOf('/'));
                return input.Substring(index+1, input.LastIndexOf('.')-index-1);
            }
        }
    }
}
