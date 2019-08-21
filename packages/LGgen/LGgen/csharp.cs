using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace LGgen
{
    class CSharp:LanguageBase
    {
        
        public void generate(string outclass, string classname, List<string> lgtemplatename)
        {
            var w = new Writer(outclass);
            w.WriteLine("namespace LGgen");
            w.WriteLine("{");
            w.Indent();
            w.IndentLine($"public class {classname}");
            w.IndentLine("{");
            w.Indent();

            foreach (var name in lgtemplatename)
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
