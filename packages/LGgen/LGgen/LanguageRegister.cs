using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace LGgen
{
    public static class LanguageRegister
    {
        private static Dictionary<string, ILanguage> generateDict = new Dictionary<string, ILanguage>();
        private static Dictionary<string, string> suffixDict = new Dictionary<string, string>();
        public static List<string> languageList = new List<string>();
        private static void Register(string name, string suffix, ILanguage Language)
        {
            generateDict.Add(name, Language);
            suffixDict.Add(name, suffix);
            languageList.Add(name);
        }

        public static bool IsLanguage(string name)
        {
            return languageList.Contains(name);
        }

        public static ILanguage GetGenerate(string name)
        {
            return generateDict[name];
        }

        public static string GetSuffix(string name)
        {
            return suffixDict[name];
        }

        public static void RegisterAllLanguages()
        {
            Register("cs", ".cs", new CSharp());
            Register("ts", ".ts", new Typescript());
        }

    }
}
