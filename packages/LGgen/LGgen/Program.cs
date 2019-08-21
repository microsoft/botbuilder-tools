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
            Handler.UseDashLHandler();
            Handler.UseDashIHandler();
            Handler.UseDashCHandler();
            Handler.UseDashOHandler();
            Handler.UseDashNHandler();
            Handler.Generate();
        }

    }

    public static class Handler
    {
        static string InputPath = null;
        static List<string> LGFiles = new List<string>();
        static string lang = null;
        static string OutputPath = null;
        static string ClassName = null;
        static List<string> Args = new List<string>();
        static string[] Usage = null;
        static bool Dire = false;

        public static void Import(List<string> args)
        {
            Args = args;          
        }

        public static void UseDashLHandler()
        {
            
            if (Args.Contains("-l"))
            {
                lang = Args[Args.IndexOf("-l") + 1];
            }

        }

        public static void UseDashIHandler()
        {
            
            if (Args.Contains("-i"))
            {
                InputPath = Args[Args.IndexOf("-i") + 1];

                if (Directory.Exists(InputPath))
                {
                    Dire = true;
                    Utils.GetAllFiles(InputPath, LGFiles);
                }
                else if (File.Exists(InputPath) && InputPath.EndsWith(".lg"))
                {
                    LGFiles.Add(InputPath);
                }
                else
                {
                    Console.WriteLine("Can't read your input");
                }                
            }

        }

        public static void UseDashOHandler()
        {
            if (Args.Contains("-o"))
            {
                OutputPath = Args[Args.IndexOf("-o") + 1];
            }
            else
            {
                if(Dire)
                {
                    OutputPath = InputPath + "/common" + Factory.getSuffix(lang);
                }
                else
                {
                    OutputPath = InputPath.Substring(0, InputPath.LastIndexOf('.')) + Factory.getSuffix(lang);
                }
            }
        }

        public static void UseDashNHandler()
        {
            if(Args.Contains("-n"))
            {

                ClassName = Args[Args.IndexOf("-n") + 1];
            }
            else if(Dire)
            {
                ClassName = "common";
            }
            else 
            {
                ClassName = Utils.FindClassName(InputPath);
            }
        }

        public static void UseDashCHandler()
        {
            if (Args.Contains("-c"))
            {
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
            TemplateEngine lgEngine = new TemplateEngine();
            lgEngine.AddFiles(LGFiles);

            List<string> lgtemplatename = new List<string>();
            lgEngine.Templates.ForEach(num => lgtemplatename.Add(num.Name));
            Console.WriteLine($"generating class file {OutputPath}");

            LanguageBase languagebase = Factory.getInstance(lang);
            languagebase.generate(OutputPath, ClassName, lgtemplatename);
        }

    }

}