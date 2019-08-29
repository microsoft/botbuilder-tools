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
            commandHandler.Build(new List<string>(args));
            Execute();
        }

        public void Generate(string argsStr)
        {
            commandHandler.Build(argsStr);
            Execute();
        }

        private void Execute()
        {
            try
            {
                commandHandler.Execute();
                commandHandler.Messages.ForEach(num => Console.WriteLine(num));
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(commandHandler.GetUsage());
                Environment.Exit(-1);
            }
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
