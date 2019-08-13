using System;
using System.Reflection;
using System.Resources;
using System.Runtime;
using System.Runtime.Serialization.Formatters;

namespace LGgen
{
    class Program
    {
        static void Usage()
        {
            Console.Error.WriteLine("LGgen [-l cs/ts] [-i LG_FILE_PATH] [-o OUTPUT_PATH]");
            Console.Error.WriteLine("Generate a strongly typed class from a LG file");
            Console.Error.WriteLine("-l cs/ts : select C# or Typescript.");
            Console.Error.WriteLine("-i : LG file path");
            Console.Error.WriteLine("-o : output path, defaults to directory where LG file is and the same name with LG file");
            System.Environment.Exit(-1);
        }

        static void Main(string[] args)
        {
            string lang = null;
            string input = null;
            string output = null;
            //Usage();

            if (args == null) Usage();


            for (var i = 0; i < args.Length; ++i)
            {
                var arg = args[i];
                switch(arg)
                {
                    case "-l" :
                        lang = args[++i];
                        break;

                    case "-i" :
                        input = args[++i];
                        break;

                    case "-o" :
                        if (args.Length == i + 1)
                        {
                            output = input.Substring(0, input.IndexOf('.'));
                            switch(lang)
                            {
                                case "cs":
                                    output += ".cs";
                                    break;
                                case "ts":
                                    output += ".ts";
                                    break;
                            }
                        }                         
                        else
                        {
                            output = args[++i];
                        }   
                        break;
                    default:
                        Usage();
                        break;
                }
            };

            CSharp.test();



        }
    }
}
