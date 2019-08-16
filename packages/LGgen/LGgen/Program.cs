using System;
using System.Reflection;
using System.Resources;
using System.Runtime;
using System.Runtime.Serialization.Formatters;
using Microsoft.Bot.Builder.LanguageGeneration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System.Linq;

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
            Console.Error.WriteLine("-v : show the version");
            Console.Error.WriteLine("-c : LG file grammar check. In this mode, you only need to input '-c' and '[-i LG_FILE_PATH]' ");
            System.Environment.Exit(-1);
        }

        static void Main(string[] args)
        {
            string lang = null;
            string input = null;
            string output = null;
            string classname = null;
            bool grammarcheck = false;

            if (args == null) Usage();

            if (args.Length == 1 && args[0] == "-v")
            {
                Console.WriteLine("LGgen version 1.0.0");
                return;
            }          

            for (var i = 0; i < args.Length; ++i)
            {
                var arg = args[i];
                switch (arg)
                {
                    case "-l":
                        lang = args[++i];
                        break;

                    case "-c":
                        grammarcheck = true;
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

            if(output == null && grammarcheck == false)
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

            if(classname == null && grammarcheck == false)
            {
                classname = FindClassName(input);
            }
           

            TemplateEngine lgEngine = new TemplateEngine();

            if (grammarcheck == true)
            {
                Check(lgEngine, input);
                return;
            }
            else
            {
                lgEngine.AddFile(input);
            }         
            List<string> lgtemplatename = new List<string>();
            lgEngine.Templates.ForEach(num => lgtemplatename.Add(num.Name));
            Console.WriteLine($"generating class file {output}");

            if(lang == "cs")
            {
                CSharp.generate(output, classname, lgtemplatename);
            }
            else if(lang == "ts")
            {
                Typescript.generate(output, classname, lgtemplatename);
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
                return input.Substring(index + 1, input.LastIndexOf('.') - index - 1);
            }
        }

        static void Check(TemplateEngine lgEngine, string input)
        {
            try
            {
                lgEngine.AddFile(input);
                Console.WriteLine("Congratulations! No error in this LG file! ");
            }
            catch(Exception e)
            {
                List<string> errors = e.Message.Split('\n').ToList();
                Console.WriteLine($"This LG file has {errors.Count} errors: ");
                errors.ForEach(i => Console.WriteLine(i));    
            }
        }
    }
}
