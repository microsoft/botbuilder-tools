using System.Collections.Generic;
using System.Text;
using Microsoft.Bot.Builder.LanguageGeneration;
using System.Linq;
using System;

namespace LGgen
{
    public class CommandHandler : CommandHandlerBase
    {
        public string InputPath { get; set; } = null;
        public string Language { get; set; } = null;
        public string OutputPath { get; set; } = null;
        public string ClassName { get; set; } = null;     
        public bool Dire { get; set; } = false;
        public bool ExitBeforeGenerate { get; set; } = false;
        public List<string> Message { get; set; } = new List<string>();
        public List<string> LGFiles { get; set; } = new List<string>();
        public List<ICommandMiddleware> MiddleWares { get; set; } = new List<ICommandMiddleware>();

        public CommandHandler(List<string> args) : base(args) { }

        public CommandHandler AddCommand (ICommandMiddleware middleWare)
        {
            MiddleWares.Add(middleWare);

            return this;
        }

        public string GetUsage()
        {
            var stringbuilder = new StringBuilder();
            var usagebuilder = new StringBuilder();
            var usagesamplebuilder = new StringBuilder();
            usagesamplebuilder.Append("LGgen ");
            foreach (var handler in MiddleWares)
            {
                usagesamplebuilder.Append($"[{handler.UsageSample}] ");
                usagebuilder.Append(handler.Usage);
                usagebuilder.Append("\r\n");
            }
            stringbuilder.Append(usagesamplebuilder.ToString());
            stringbuilder.Append("\n\rGenerate a strongly typed class from a LG file \n\rOptions: \n\r");
            stringbuilder.Append(usagebuilder);
            return stringbuilder.ToString();
        }

        private void Compile()
        {
            foreach (var command in MiddleWares)
            {
                command.Compile(this);
                if (ExitBeforeGenerate) return;
            }
            if (InputPath == "" || OutputPath == "" || !LGFiles.Any() || ClassName == "" || Language == "") throw new Exception("Fail to Enter Generate Class File Mode. Check your Input.");
        }

        public void Generate()
        {
            Compile();
            if (ExitBeforeGenerate) return;

            TemplateEngine lgEngine = new TemplateEngine();
            lgEngine.AddFiles(LGFiles);

            Message.Add($"generating class file {OutputPath}");

            LanguageRegister.GetGenerate(Language).Generate(OutputPath, ClassName, lgEngine.Templates);
        }
    }
}

