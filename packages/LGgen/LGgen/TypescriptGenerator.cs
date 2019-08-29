using Microsoft.Bot.Builder.LanguageGeneration;
using System.Collections.Generic;

namespace LGgen
{
    class TypescriptGenerator : ILanguageGenerator
    {
        public void Generate(string outPath, string className, List<LGTemplate> temp)
        {
            var generatorWriter = new Writer(outPath);
            generatorWriter.WriteLine($"export default class {className}");
            generatorWriter.WriteLine("{");
            generatorWriter.Indent();

            temp.ForEach(num => generatorWriter.IndentLine($"static {num.Name}:string = \"{num.Name}\";"));
            generatorWriter.Outdent();
            generatorWriter.IndentLine("}");

            generatorWriter.Flush();
            generatorWriter.Close();
        }
    }
}
