using System;
using System.Collections.Generic;

namespace LGgen
{
    public class CommandHandlerBase
    {
        protected static List<string> Args { get; set; } = new List<string>();
        public static List<string> Usage { get; set; } = new List<string>();

        public CommandHandlerBase(List<string> args)
        {
            Args = args;
            LanguageRegister.RegisterAllLanguages();
        }        

        public static string CommandInputGrammarCheck(ICommandMiddleware middleware)
        {
            if (!Args.Contains(middleware.Command)) return new string("");

            if (middleware.SingleCommand) return new string(" ");
            else if (Args.Count == Args.IndexOf(middleware.Command) + 1)
            {
                throw new Exception($"End with Command{middleware.Command} without Value. ");
            }
            else
            {
                var temp = Args[Args.IndexOf(middleware.Command) + 1];
                if (!temp.StartsWith('-') && temp != "") return temp;
                else throw new Exception($"No Corresponding Value with the Command {middleware.Command}. ");
            }
        }
    }
}
