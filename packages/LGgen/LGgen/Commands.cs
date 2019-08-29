using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.Bot.Builder.LanguageGeneration;
using System.Linq;

namespace LGgen
{
    public class InputCommand : BaseCommand
    {
        public InputCommand(): base("-i : LG file path or file folder. ", "-i LG_FILE_PATH OR FOLDER", "-i", false)
        {}

        public override void Compile(CommandHandler context)
        {
            if (!TryGetCommandValue(context.Args, out string commandValue))
            {
                return;
            }
            context.InputPath = commandValue;

            if (Directory.Exists(context.InputPath))
            {
                context.Dire = true;
                GetAllFiles(context.InputPath, context.LGFiles);
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

        private void GetAllFiles(string dir, List<string> LGfiles)
        {
            DirectoryInfo d = new DirectoryInfo(dir);
            FileSystemInfo[] fsinfos = d.GetFileSystemInfos();
            foreach (var fsinfo in fsinfos)
            {
                if (fsinfo is DirectoryInfo)
                {
                    GetAllFiles(fsinfo.FullName, LGfiles);
                }
                else
                {
                    if (Path.GetExtension(fsinfo.FullName) == ".lg")
                    {
                        LGfiles.Add(fsinfo.FullName);
                    }
                }
            }
        }
    }

    class CheckCommand : BaseCommand
    {
        public CheckCommand() : base("-c : LG file Grammar Check Mode. In this mode, you only need to input '-c' and '[-i LG_FILE_PATH]' ", "-c", "-c", true)
        { }

        public override void Compile(CommandHandler context)
        {
            if (!TryGetCommandValue(context.Args, out string commandValue))
            {
                return;
            }

            if (context.InputPath == null) throw new Exception("-i command is complosory for Grammar Check Mode. ");
            if (context.LGFiles == null) throw new Exception("Fail to Read any LG File. ");

            TemplateEngine lgEngine = new TemplateEngine();
            try
            {
                lgEngine.AddFiles(context.LGFiles);
                context.Messages.Add("Congratulations! No error in this LG file! ");
            }
            catch (Exception e)
            {
                List<string> errors = e.Message.Split('\n').ToList();
                context.Messages.Add($"This LG file has {errors.Count} errors: ");
                errors.ForEach(i => context.Messages.Add(i));
            }

            context.ExitBeforeGenerate = true;
        }
    }

    class LangCommand : BaseCommand
    {
        public LangCommand() : base($"-l : Generate Class File Mode. Default to C#. Please Choose Language. {SupportLanguage()}", $"-l {SupportLanguage()}", "-l", false)
        { }

        public override void Compile(CommandHandler context)
        {
            if (!TryGetCommandValue(context.Args, out string commandValue))
            {
                return;
            }

            if (context.InputPath == null) throw new Exception("-i command is complosory for Class File Generation Mode. ");
          
            if (!LanguageRegister.CheckLanguage(commandValue)) throw new Exception("Not Support this Language. " + SupportLanguage());
            context.Language = commandValue;
        }

        private static string SupportLanguage()
        {
            string s = "Support Language: ";
            s += string.Join(" ", LanguageRegister.LanguageList);
            s += ".";
            return s;
        }
    }

    class OutputCommand : BaseCommand
    {
        public OutputCommand() : base("-o : designate output path, defaults to directory where LG file is and the same name with LG file", "-o OUTPUT_PATH", "-o", false)
        { }

        public override void Compile(CommandHandler context)
        {
            var hasCommandValue = TryGetCommandValue(context.Args, out string commandValue);

            if (context.InputPath == null || context.Language == null) return;

            if (hasCommandValue) context.OutputPath = context.Dire ?
                    Path.Join(commandValue, "common" + LanguageRegister.GetSuffix(context.Language)) :
                    Path.Join(commandValue, Path.GetFileNameWithoutExtension(context.InputPath) + LanguageRegister.GetSuffix(context.Language));
            else context.OutputPath = context.Dire ? 
                    Path.Join(context.InputPath, "common" + LanguageRegister.GetSuffix(context.Language)) : 
                    Path.ChangeExtension(context.InputPath, LanguageRegister.GetSuffix(context.Language));
        }
    }

    class NameCommand : BaseCommand
    {
        public NameCommand() : base("-n : designate class name, defaults to the same name of LG file", "-n CLASS_NAME", "-n", false)
        { }

        public override void Compile(CommandHandler context)
        {
            var hasCommandValue = TryGetCommandValue(context.Args, out string commandValue);

            if (context.InputPath == null || context.Language == null ) return;

            if (hasCommandValue) context.ClassName = commandValue;
            else context.ClassName = context.Dire ? "common" : Path.GetFileNameWithoutExtension(context.InputPath);
        }
    }

    class VersionCommand : BaseCommand
    {
        public VersionCommand() : base("-v : version", "-v", "-v", true)
        { }

        public override void Compile(CommandHandler context)
        {
            if (!TryGetCommandValue(context.Args, out string commandValue))
            {
                return;
            }

            Console.WriteLine("LGgen version 1.0 ");

            context.ExitBeforeGenerate = true;
        }
    }
}
