using Microsoft.Bot.Builder.LanguageGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace LGgen
{
    public class CommandHandler
    {
        public List<string> Args { get; set; }
        public string InputPath { get; set; }
        public string Language { get; set; }
        public string OutputPath { get; set; }
        public string ClassName { get; set; }
        public bool Dire { get; set; }
        public bool ExitBeforeGenerate { get; set; }
        public List<string> Messages { get; set; }
        public List<string> LGFiles { get; set; }
        public List<BaseCommand> Commands { get; set; } 

        public CommandHandler()
        {
            Messages = new List<string>();
            LGFiles = new List<string>();
            Commands = new List<BaseCommand>();
            Language = "cs"; // default cs
            LanguageRegister.RegisterAllLanguages();
        }


        public CommandHandler AddCommand (BaseCommand command)
        {
            Commands.Add(command);
            return this;
        }

        public string GetUsage()
        {
            var stringbuilder = new StringBuilder();
            var usagebuilder = new StringBuilder();
            var usagesamplebuilder = new StringBuilder();
            usagesamplebuilder.Append("LGgen ");

            foreach (var command in Commands)
            {
                usagesamplebuilder.Append($"[{command.UsageSample}] ");
                usagebuilder.Append(command.Usage);
                usagebuilder.Append("\r\n");
            }

            stringbuilder.Append(usagesamplebuilder.ToString());
            stringbuilder.Append("\n\rGenerate a strongly typed class from a LG file \n\rOptions: \n\r");
            stringbuilder.Append(usagebuilder);
            return stringbuilder.ToString();
        }

        private void Compile()
        {
            foreach (var command in Commands)
            {
                command.Compile(this);
                if (ExitBeforeGenerate) return;
            }
            if (InputPath == "" || OutputPath == "" || !LGFiles.Any() || ClassName == "" || Language == "") throw new Exception("Fail to Do Anything. Check your Input.");
        }

        public void Execute()
        {
            if (ExitBeforeGenerate) return;

            var lgEngine = new TemplateEngine().AddFiles(LGFiles);
            Messages.Add($"generating class file {OutputPath}");
            LanguageRegister.GetGenerate(Language).Generate(OutputPath, ClassName, lgEngine.Templates);
        }

        public void Build(List<string> args)
        {
            Args = args;
            Compile();
        }

        public void Build(string argsStr)
        {
            Args = new List<string>(Regex.Split(argsStr, @"\s{1,}"));
            Compile();
        }
    }
}

