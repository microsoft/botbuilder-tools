using System;
using System.Collections.Generic;

namespace LGgen
{
    public static class LanguageRegister
    {
        private static Dictionary<string, Type> generateDict = new Dictionary<string, Type>();
        private static Dictionary<string, string> suffixDict = new Dictionary<string, string>();
        public static List<string> languageList = new List<string>();
        private static void Register(string name, string suffix, Type type)
        {
            generateDict.Add(name, type);
            suffixDict.Add(name, suffix);
            languageList.Add(name);
        }

        public static bool IsLanguage(string name)
        {
            return languageList.Contains(name);
        }

        public static ILanguage GetGenerate(string name)
        {
            return (ILanguage)Activator.CreateInstance(generateDict[name]);
        }

        public static string GetSuffix(string name)
        {
            return suffixDict[name];
        }

        public static void RegisterAllLanguages()
        {
            Register("cs", ".cs", typeof(CSharp));
            Register("ts", ".ts", typeof(Typescript));
        }

    }
}
