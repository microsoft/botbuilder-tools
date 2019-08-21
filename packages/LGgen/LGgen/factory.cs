using System.Collections.Generic;

namespace LGgen
{
    public interface LanguageBase
    {
        void Generate(string outClass, string className, List<string> lgTemplateName);
    }

    public class Factory
    {
        public static string[] languageList = { "cs", "ts" };

        public static LanguageBase GetInstance(string name)
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

        public static string GetSuffix(string name)
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
