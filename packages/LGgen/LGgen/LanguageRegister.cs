using System;
using System.Collections.Generic;

namespace LGgen
{
    public static class LanguageRegister
    {
        private static Dictionary<string, Type> GenerateDict { get; set; } = new Dictionary<string, Type>();
        private static Dictionary<string, string> SuffixDict { get; set; } = new Dictionary<string, string>();
        public static List<string> LanguageList { get; set; } = new List<string>();
        private static void Register(string name, string suffix, Type type)
        {
            GenerateDict.Add(name, type);
            SuffixDict.Add(name, suffix);
            LanguageList.Add(name);
        }

        public static bool CheckLanguage(string name)
        {
            return LanguageList.Contains(name);
        }

        public static ILanguageGenerator GetGenerate(string name)
        {
            return (ILanguageGenerator)Activator.CreateInstance(GenerateDict[name]);
        }

        public static string GetSuffix(string name)
        {
            return SuffixDict[name];
        }

        public static void RegisterAllLanguages()
        {
            Register("cs", ".cs", typeof(CSharpGenerator));
            Register("ts", ".ts", typeof(TypescriptGenerator));
        }

    }
}
