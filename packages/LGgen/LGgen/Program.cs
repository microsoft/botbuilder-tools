using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;


namespace LGgen
{
    public class LGgenTool
    {
        public static void Main(string[] args)
        {
            try
            {
                _ = new CommandHandler(args.ToList())
                    .UseInputHandler()
                    .UseCheckHandler()
                    .UseLangHandler()
                    .UseOutputHandler()
                    .UseNameHandler()
                    .Generate();

                CommandHandler.Message.ForEach(num => Console.WriteLine(num));
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                CommandHandlerBase.Usage.ForEach(num => Console.Error.WriteLine(num));
                Environment.Exit(-1);
            }

        }

    }

}
