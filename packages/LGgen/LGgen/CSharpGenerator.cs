using System.Collections.Generic;
using Microsoft.Bot.Builder.LanguageGeneration;


namespace LGgen
{
    class CSharpGenerator : ILanguageGenerator
    {
        
        public void Generate(string outPath, string className, List<LGTemplate> temp)
        {
            var generatorWriter = new Writer(outPath);
            generatorWriter.WriteLine("namespace LGgen");
            generatorWriter.WriteLine("{");
            generatorWriter.Indent();
            generatorWriter.IndentLine($"public class {className}");
            generatorWriter.IndentLine("{");
            generatorWriter.Indent();

            temp.ForEach(num => generatorWriter.IndentLine($"public const string {num.Name} = \"{num.Name}\";"));               
            generatorWriter.Outdent();
            generatorWriter.IndentLine("}");
            generatorWriter.Outdent();
            generatorWriter.IndentLine("}");

            generatorWriter.Flush();
            generatorWriter.Close();
        }
    }
}


