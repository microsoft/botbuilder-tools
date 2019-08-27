using System.Collections.Generic;
using Microsoft.Bot.Builder.LanguageGeneration;


namespace LGgen
{
    class CSharp:ILanguage
    {
        
        public void Generate(string outPath, string className, List<LGTemplate> temp)
        {
            var w = new Writer(outPath);
            w.WriteLine("namespace LGgen");
            w.WriteLine("{");
            w.Indent();
            w.IndentLine($"public class {className}");
            w.IndentLine("{");
            w.Indent();

            temp.ForEach(num => w.IndentLine($"public const string {num.Name} = \"{num.Name}\";"));               
            w.Outdent();
            w.IndentLine("}");
            w.Outdent();
            w.IndentLine("}");

            w.Flush();
            w.Close();
        }
    }
}


