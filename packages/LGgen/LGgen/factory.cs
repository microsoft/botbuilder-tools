using System.Collections.Generic;

namespace LGgen
{
    public interface LanguageBase
    {
        void generate(string outclass, string classname, List<string> lgtemplatename);
    }

    public class Factory
    {
        public static string[] LanguageList = { "cs", "ts" };
        public static LanguageBase getInstance(string name)
        {
            if (name.Equals("cs"))
            {
                return new CSharp();
            }
            else if(name.Equals("ts"))
            {
                return new Typescript();
            }
            else
            {
                return null;
            }
        }

        public static string getSuffix(string name)
        {
            if (name.Equals("cs"))
            {
                return ".cs";
            }
            else if (name.Equals("ts"))
            {
                return ".ts";
            }
            else
            {
                return null;
            }
        }
    }
}