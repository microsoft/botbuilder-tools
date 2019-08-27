using System.Collections.Generic;

namespace LGgen
{
    class Typescript:ILanguage
    {
        public void Generate(string outPath, LgTemplate temp)
        {
            var w = new Writer(outPath);
            w.WriteLine($"export default class {temp.className}");
            w.WriteLine("{");
            w.Indent();

            foreach (var name in temp.lgTemplateName)
                w.IndentLine($"static {name}:string = \"{name}\";");
            w.Outdent();
            w.IndentLine("}");

            w.Flush();
            w.Close();
        }
    }
}
