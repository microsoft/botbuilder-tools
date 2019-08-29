using System;

namespace LGgen
{
    class Program
    {
        static void Main(string[] args)
        {
            var lGGenTool = new LGGenTool();
            //FunctionTest


            //lGGenTool.Generate(new string[] { "-c", "-i" , "../../../LGtest.lg"});
            lGGenTool.Generate(new string[] { "-l", "cs", "-i", "../../../LGtest.lg" });
            //lGGenTool.Generate("-l cs -i ../../../LGtest.lg");
            //lGGenTool.Generate(new string[] { "-l", "ts", "-i", "../../../LGtest.lg" });
            //lGGenTool.Generate(new string[] { "-l", "cs", "-i", "../../../LGtest_Folder" });
            //lGGenTool.Generate(new string[] { "-l", "ts", "-i", "../../../LGtest.lg", "-o", "../../../LGtest_OutputChoice/"});
            //lGGenTool.Generate(new string[] { "-l", "cs", "-i", "../../../LGtest.lg", "-n", "LG", "-o" , "../../../LGtest_ClassNameChoice/"});
            //lGGenTool.Generate(new string[] { "-v" });

            //Error Test

            //lGGenTool.Generate(new string[] { "-o", "cs" });
            //lGGenTool.Generate(new string[] { "-a" });
            //lGGenTool.Generate(new string[] { "-c" });
            //lGGenTool.Generate(new string[] { "-i"  , "../../../LGtest.lg" });
            //lGGenTool.Generate(new string[] { " - i", ".. / .. / .. / LGtest.lg" });
            //lGGenTool.Generate(new string[] { "-l", "py", "-i", "../../../LGtest.lg"});
            //lGGenTool.Generate(new string[] { "-l", "cs", "-i" });
        }
    }
}
