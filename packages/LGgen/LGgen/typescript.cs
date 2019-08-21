using System.Collections.Generic;

namespace LGgen
{
    class Typescript:LanguageBase
    {
        public void Generate(string outClass, string className, List<string> lgTemplateName)
        {
            var w = new Writer(outClass);
            w.WriteLine($"export default class {className}");
            w.WriteLine("{");
            w.Indent();

            foreach (var name in lgTemplateName)
                w.IndentLine($"static {name}:string = \"{name}\";");
            w.Outdent();
            w.IndentLine("}");

            w.Flush();
            w.Close();
        }
    }
}
