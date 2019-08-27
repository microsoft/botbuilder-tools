using System;
using System.Collections.Generic;

namespace LGgen
{
    public class CommandHandlerBase
    {
        protected List<string> args = new List<string>();
        public static List<string> Usage = new List<string>();

        public CommandHandlerBase(List<string> args)
        {
            this.args = args;
            LanguageRegister.RegisterAllLanguages();
            Usage_Init();
        }        

        protected void Usage_Init()
        {
            Usage.Add("LGgen [-l cs/ts] [-i LG_FILE_PATH] [-o OUTPUT_PATH] [-n CLASS_NAME]");
            Usage.Add("Generate a strongly typed class from a LG file");
            Usage.Add("Options: ");
            Usage.Add("-l : choose language. " + Utils.SupportLanguage());
            Usage.Add("-i : LG file path or file folder. ");
            Usage.Add("-o : output path, defaults to directory where LG file is and the same name with LG file");
            Usage.Add("-n : designate class name, defaults to the same name of LG file");
            Usage.Add("-c : LG file grammar check. In this mode, you only need to input '-c' and '[-i LG_FILE_PATH]' ");
        }

        protected string CommandGrammarCheck(string arg)
        {
            if (args.Count == args.IndexOf(arg) + 1)
            {
                throw new Exception("End with a Command without Value. ");
            }
            else
            {
                var temp = args[args.IndexOf(arg) + 1];
                if (!temp.StartsWith('-'))
                    return temp;
                else
                {
                    throw new Exception("No Corresponding Value with the Command. ");
                }
            }
        }
    }
}
