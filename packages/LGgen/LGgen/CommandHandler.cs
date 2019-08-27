using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Bot.Builder.LanguageGeneration;

namespace LGgen
{
    public class CommandHandler : CommandHandlerBase
    {
        private string inputPath = null;
        private string lang = null;
        private string outputPath = null;
        private string className = null;
        private List<string> LGFiles = new List<string>();
        private bool Dire = false;
        private bool GrammarCheckMode = false;
        public static List<string> Message = new List<string>();

        public CommandHandler(List<string> args) : base(args) { }

        public CommandHandler UseLangHandler()
        {
            if (GrammarCheckMode) return this;

            if (args.Contains("-l"))
            {
                lang = CommandGrammarCheck("-l");
                if (!LanguageRegister.IsLanguage(lang)) throw new Exception("Not Support this Language. " + Utils.SupportLanguage());
            }
            else
            {
                throw new Exception("-l Command is Complosory. ");
            }
            return this;
        }

        public CommandHandler UseInputHandler()
        {
            if (args.Contains("-i"))
            {
                inputPath = CommandGrammarCheck("-i");

                if (Directory.Exists(inputPath))
                {
                    Dire = true;
                    Utils.GetAllFiles(inputPath, LGFiles);
                }
                else if (File.Exists(inputPath) && Path.GetExtension(inputPath) == ".lg")
                {
                    LGFiles.Add(inputPath);
                }
                else
                {
                    throw new Exception("Can't Read your Input. ");
                }
            }
            else
            {
                throw new Exception("-i Command is Complosory. ");
            }

            return this;

        }

        public CommandHandler UseNameHandler()
        {
            if (GrammarCheckMode) return this;

            if (args.Contains("-n"))
            {
                className = CommandGrammarCheck("-n");
            }
            else
            {
                className = Dire ? "common" : Path.GetFileNameWithoutExtension(inputPath);
            }

            return this;
        }

        public CommandHandler UseOutputHandler()
        {
            if (GrammarCheckMode) return this;

            if (args.Contains("-o"))
            {
                outputPath = Dire ? Path.Join(CommandGrammarCheck("-o"), "common" + LanguageRegister.GetSuffix(lang)) : Path.Join(CommandGrammarCheck("-o"), Path.GetFileNameWithoutExtension(inputPath) + LanguageRegister.GetSuffix(lang));
            }
            else
            {
                outputPath = Dire ? Path.Join(inputPath, "common" + LanguageRegister.GetSuffix(lang)) : Path.ChangeExtension(inputPath, LanguageRegister.GetSuffix(lang));
            }

            return this;
        }

        public CommandHandler UseCheckHandler()
        {
            if (args.Contains("-c"))
            {
                if (LGFiles == null) throw new Exception("Fail to Read any LG File. ");

                TemplateEngine lgEngine = new TemplateEngine();
                try
                {
                    lgEngine.AddFiles(LGFiles);
                    Message.Add("Congratulations! No error in this LG file! ");
                }
                catch (Exception e)
                {
                    List<string> errors = e.Message.Split('\n').ToList();
                    Message.Add($"This LG file has {errors.Count} errors: ");
                    errors.ForEach(i => Message.Add(i));
                }

                GrammarCheckMode = true;
            }

            return this;

        }

        public CommandHandler Generate()
        {
            if (GrammarCheckMode) return this;

            if (LGFiles == null) throw new Exception("Fail to Read any LG File. ");

            TemplateEngine lgEngine = new TemplateEngine();
            lgEngine.AddFiles(LGFiles);

            Message.Add($"generating class file {outputPath}");

            ILanguage languagebase = LanguageRegister.GetGenerate(lang);
            languagebase.Generate(outputPath, className, lgEngine.Templates);

            return this;
        }

    }


}

