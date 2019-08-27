using Microsoft.Bot.Builder.LanguageGeneration;
using System.Collections.Generic;

namespace LGgen
{
    class Typescript:ILanguage
    {
        public void Generate(string outPath, string className, List<LGTemplate> temp)
        {
            var w = new Writer(outPath);
            w.WriteLine($"export default class {className}");
            w.WriteLine("{");
            w.Indent();

            temp.ForEach(num => w.IndentLine($"static {num.Name}:string = \"{num.Name}\";"));
            w.Outdent();
            w.IndentLine("}");

            w.Flush();
            w.Close();
        }
    }
}
