using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace LGgen
{
    class CSharp:ILanguage
    {
        
        public void Generate(string outPath, LgTemplate temp)
        {
            var w = new Writer(outPath);
            w.WriteLine("namespace LGgen");
            w.WriteLine("{");
            w.Indent();
            w.IndentLine($"public class {temp.className}");
            w.IndentLine("{");
            w.Indent();

            foreach (var name in temp.lgTemplateName)
                w.IndentLine($"public const string {name} = \"{name}\";");
            w.Outdent();
            w.IndentLine("}");
            w.Outdent();
            w.IndentLine("}");

            w.Flush();
            w.Close();
        }
    }
}
