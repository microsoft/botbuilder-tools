using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.Bot.Builder.LanguageGeneration;
using System.Linq;

namespace LGgen
{
    public class InputHandler : ICommandMiddleware
    {
        public string Usage { get; set; } = "-i : LG file path or file folder. ";
        public string UsageSample { get; set; } = "-i LG_FILE_PATH OR FOLDER";
        public string Command { get; set; } = "-i";
        public bool SingleCommand { get; set; } = false;

        public void Compile(CommandHandler context)
        {
            var temp = CommandHandlerBase.CommandInputGrammarCheck(this);

            if (temp == "") return;

            context.InputPath = temp;

            if (Directory.Exists(context.InputPath))
            {
                context.Dire = true;
                Utils.GetAllFiles(context.InputPath, context.LGFiles);
            }
            else if (File.Exists(context.InputPath) && Path.GetExtension(context.InputPath) == ".lg")
            {
                context.LGFiles.Add(context.InputPath);
            }
            else
            {
                throw new Exception("Can't Read your Input. ");
            }
        }
    }

    class CheckHandler : ICommandMiddleware
    {
        public string Usage { get; set; } = "-c : LG file Grammar Check Mode. In this mode, you only need to input '-c' and '[-i LG_FILE_PATH]' ";
        public string UsageSample { get; set; } = "-c";
        public string Command { get; set; } = "-c";
        public bool SingleCommand { get; set; } = true;

        public void Compile(CommandHandler context)
        {
            var temp = CommandHandlerBase.CommandInputGrammarCheck(this);
            if (temp == "") return;

            if (context.InputPath == "") throw new Exception("-i command is complosory for Grammar Check Mode. ");
            if (context.LGFiles == null) throw new Exception("Fail to Read any LG File. ");

            TemplateEngine lgEngine = new TemplateEngine();
            try
            {
                lgEngine.AddFiles(context.LGFiles);
                context.Message.Add("Congratulations! No error in this LG file! ");
            }
            catch (Exception e)
            {
                List<string> errors = e.Message.Split('\n').ToList();
                context.Message.Add($"This LG file has {errors.Count} errors: ");
                errors.ForEach(i => context.Message.Add(i));
            }

            context.ExitBeforeGenerate = true;
        }
    }

    class LangHandler : ICommandMiddleware
    {
        public string Usage { get; set; } = $"-l : Generate Class File Mode. Please Choose Language. {Utils.SupportLanguage()}";
        public string UsageSample { get; set; } = $"-l {Utils.SupportLanguage()}";
        public string Command { get; set; } = "-l";
        public bool SingleCommand { get; set; } = false;

        public void Compile(CommandHandler context)
        {
            var temp = CommandHandlerBase.CommandInputGrammarCheck(this);
            if (temp == "") return;

            if (context.InputPath == "") throw new Exception("-i command is complosory for Class File Generation Mode. ");
          
            if (!LanguageRegister.IsLanguage(temp)) throw new Exception("Not Support this Language. " + Utils.SupportLanguage());
            context.Language = temp;
        }
    }

    class OutputHandler : ICommandMiddleware
    {
        public string Usage { get; set; } = "-o : designate output path, defaults to directory where LG file is and the same name with LG file";
        public string UsageSample { get; set; } = "-o OUTPUT_PATH";
        public string Command { get; set; } = "-o";
        public bool SingleCommand { get; set; } = false;

        public void Compile(CommandHandler context)
        {
            var temp = CommandHandlerBase.CommandInputGrammarCheck(this);

            if (context.InputPath == "" || context.Language == "") return;

            if (temp != "") context.OutputPath = context.Dire ?
                    Path.Join(temp, "common" + LanguageRegister.GetSuffix(context.Language)) :
                    Path.Join(temp, Path.GetFileNameWithoutExtension(context.InputPath) + LanguageRegister.GetSuffix(context.Language));
            else context.OutputPath = context.Dire ? 
                    Path.Join(context.InputPath, "common" + LanguageRegister.GetSuffix(context.Language)) : 
                    Path.ChangeExtension(context.InputPath, LanguageRegister.GetSuffix(context.Language));
        }
    }

    class NameHandler : ICommandMiddleware
    {
        public string Usage { get; set; } = "-n : designate class name, defaults to the same name of LG file";
        public string UsageSample { get; set; } = "-n CLASS_NAME";
        public string Command { get; set; } = "-n";
        public bool SingleCommand { get; set; } = false;

        public void Compile(CommandHandler context)
        {
            var temp = CommandHandlerBase.CommandInputGrammarCheck(this);

            if (context.InputPath == "" || context.Language == "") return;

            if (temp != "") context.ClassName = temp;
            else context.ClassName = context.Dire ? "common" : Path.GetFileNameWithoutExtension(context.InputPath);
        }
    }

    class VersionHandler : ICommandMiddleware
    {
        public string Usage { get; set; } = "-v : version";
        public string UsageSample { get; set; } = "-v";
        public string Command { get; set; } = "-v";
        public bool SingleCommand { get; set; } = true;

        public void Compile(CommandHandler context)
        {
            var temp = CommandHandlerBase.CommandInputGrammarCheck(this);
            if (temp == "") return;

            Console.WriteLine("LGgen version 1.0 ");

            context.ExitBeforeGenerate = true;
        }
    }

}
