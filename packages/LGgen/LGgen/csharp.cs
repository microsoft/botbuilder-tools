using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Bot.Builder.LanguageGeneration;

namespace LGgen
{
    class CSharp
    {
        public static void test()
        {
            TemplateEngine lgEngine = new TemplateEngine();
            lgEngine.AddFile("C:/Users/t-hahan/Desktop/New folder/mytest.lg");
            lgEngine.Templates.ForEach(num => Console.WriteLine(num.Name));

        }
    }
}
