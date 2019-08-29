using System;
using System.Collections.Generic;

namespace LGgen
{
    public class LGGenTool
    {
        private CommandHandler commandHandler;

        public LGGenTool()
        {
            InitHandler();
        }

        public void Generate(string[] args)
        {
            try
            {
                commandHandler.Build(new List<string>(args));
                Execute();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(commandHandler.GetUsage());
                Environment.Exit(-1);
            }
        }

        public void Generate(string argsStr)
        {
            try
            {
                commandHandler.Build(argsStr);
                Execute();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(commandHandler.GetUsage());
                Environment.Exit(-1);
            }
        }


        private void Execute()
        {
                commandHandler.Execute();
                commandHandler.Messages.ForEach(num => Console.WriteLine(num));
        }

        private void InitHandler()
        {
            commandHandler = new CommandHandler()
                .AddCommand(new InputCommand())
                .AddCommand(new CheckCommand())
                .AddCommand(new LangCommand())
                .AddCommand(new OutputCommand())
                .AddCommand(new NameCommand())
                .AddCommand(new VersionCommand());
        }
    }
}
