using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace LGgen
{
    class CSharp:LanguageBase
    {
        
        public void Generate(string outClass, string className, List<string> lgTemplateName)
        {
            var w = new Writer(outClass);
            w.WriteLine("namespace LGgen");
            w.WriteLine("{");
            w.Indent();
            w.IndentLine($"public class {className}");
            w.IndentLine("{");
            w.Indent();

            foreach (var name in lgTemplateName)
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
