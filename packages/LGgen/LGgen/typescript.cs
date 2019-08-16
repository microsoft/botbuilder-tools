using System.Collections.Generic;

namespace LGgen
{
    class Typescript
    {
        public static void generate(string outclass, string classname, List<string> lgtemplatename)
        {
            var w = new Writer(outclass);
            w.WriteLine("export default class LGgen");
            w.WriteLine("{");
            w.Indent();

            foreach (var name in lgtemplatename)
                w.IndentLine($"static {name}:string = \"{name}\";");
            w.Outdent();
            w.IndentLine("}");

            w.Flush();
            w.Close();
        }
    }
}
