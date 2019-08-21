using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection.Metadata;
using Microsoft.Bot.Builder.LanguageGeneration;

namespace LGgen
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Handler.Import(args.ToList());
            Handler.UseInputHandler();
            Handler.UseCheckHandler();
            Handler.UseLangHandler(); 
            Handler.UseOutputHandler();
            Handler.UseNameHandler();
            Handler.Generate();
        }

    }

    public static class Handler
    {
        static string inputPath = null;
        static List<string> LGFiles = new List<string>();
        static string lang = null;
        static string outputPath = null;
        static string className = null;
        static List<string> Args = new List<string>();
        static List<string> Usage = new List<string>();
        static bool Dire = false;

        public static void Import(List<string> args)
        {
            Args = args;
            Usage.Add("LGgen [-l cs/ts] [-i LG_FILE_PATH] [-o OUTPUT_PATH] [-n CLASS_NAME]");
            Usage.Add("Generate a strongly typed class from a LG file");
            Usage.Add("Options: ");
        }

        public static void Error_Usage()
        {
            Console.WriteLine("Error! Please Read the Usage. ");
            Usage.ForEach(num => Console.Error.WriteLine(num));
            Environment.Exit(-1);
        }

        public static string InputCheck(string arg)
        {
            if (Args.Count == Args.IndexOf(arg) + 1)
            {
                Error_Usage();
                return null;
            }
            else
            {
                var temp = Args[Args.IndexOf(arg) + 1];
                if (!temp.StartsWith('-'))
                    return temp;
                else
                {
                    Error_Usage();
                    return null;
                }
            }
        }

        public static void UseLangHandler()
        {
            Usage.Add("-l cs/ts : select C# or Typescript.");

            if (Args.Contains("-l"))
            {
                lang = InputCheck("-l");
                if (!Factory.languageList.Contains(Args[Args.IndexOf("-l") + 1])) Error_Usage();
            }
            else
            {
                Error_Usage();
            }

        }

        public static void UseInputHandler()
        {
            Usage.Add("-i : LG file path or file folder. ");
            if (Args.Contains("-i"))
            {
                inputPath = InputCheck("-i");            

                if (Directory.Exists(inputPath))
                {
                    Dire = true;
                    Utils.GetAllFiles(inputPath, LGFiles);
                }
                else if (File.Exists(inputPath) && inputPath.EndsWith(".lg"))
                {
                    LGFiles.Add(inputPath);
                }
                else
                {
                    Console.WriteLine("Can't read your input");
                    Error_Usage();
                }                
            }
            else
            {
                Error_Usage();
            }

        }

        public static void UseOutputHandler()
        {
            Usage.Add("-o : output path, defaults to directory where LG file is and the same name with LG file");

            
            if (Args.Contains("-o"))
            {
                outputPath = InputCheck("-o");               
            }
            else
            {
                outputPath = Dire ? inputPath + "/common" + Factory.GetSuffix(lang) : inputPath.Substring(0, inputPath.LastIndexOf('.')) + Factory.GetSuffix(lang);
            }
        }

        public static void UseNameHandler()
        {
            Usage.Add("-n : designate class name, defaults to the same name of LG file");

            if (Args.Contains("-n"))
            {
                className = InputCheck("-n");             
            }
            else
            {
                className = Dire ? "common": Utils.FindClassName(inputPath);
            }
        }

        public static void UseCheckHandler()
        {
            Usage.Add("-c : LG file grammar check. In this mode, you only need to input '-c' and '[-i LG_FILE_PATH]' ");

            if (Args.Contains("-c"))
            {
                if (LGFiles == null) Error_Usage();

                TemplateEngine lgEngine = new TemplateEngine();
                try
                {
                    lgEngine.AddFiles(LGFiles);
                    Console.WriteLine("Congratulations! No error in this LG file! ");
                }
                catch (Exception e)
                {
                    List<string> errors = e.Message.Split('\n').ToList();
                    Console.WriteLine($"This LG file has {errors.Count} errors: ");
                    errors.ForEach(i => Console.WriteLine(i));
                }
                finally
                {
                    Environment.Exit(0);
                }
            }
            
        }

        public static void Generate()
        {
            if (LGFiles == null) Error_Usage();

            TemplateEngine lgEngine = new TemplateEngine();
            lgEngine.AddFiles(LGFiles);

            List<string> lgtemplatename = new List<string>();
            lgEngine.Templates.ForEach(num => lgtemplatename.Add(num.Name));
            Console.WriteLine($"generating class file {outputPath}");

            LanguageBase languagebase = Factory.GetInstance(lang);
            languagebase.Generate(outputPath, className, lgtemplatename);
        }

    }

}
