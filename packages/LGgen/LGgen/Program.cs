using System;
using System.ComponentModel.Design.Serialization;
using System.Linq;
using System.Runtime.InteropServices;

namespace LGgen
{
    public class LGgenTool
    {
        public static void Main(string[] args)
        {
            var handler = new CommandHandler(args.ToList())
                .AddCommand(new InputHandler())
                .AddCommand(new CheckHandler())
                .AddCommand(new LangHandler())
                .AddCommand(new OutputHandler())
                .AddCommand(new NameHandler())
                .AddCommand(new VersionHandler());
                
            var usage = handler.GetUsage();

            try
            { 
                handler.Generate();
                handler.Message.ForEach(num => Console.WriteLine(num));
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(usage);
                Environment.Exit(-1);
            }           
        }
    }
}
