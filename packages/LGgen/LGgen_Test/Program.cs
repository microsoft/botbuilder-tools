using System;

namespace LGgen
{
    class Program
    {
        static void Main(string[] args)
        {
            //LGgenTool.Main(new string[] { "-c", "-i" , "../../../LGtest.lg"});
            //LGgenTool.Main(new string[] { "-l", "cs", "-i", "../../../LGtest.lg" });
            //LGgenTool.Main(new string[] { "-l", "ts", "-i", "../../../LGtest.lg" });
            //LGgenTool.Main(new string[] { "-l", "cs", "-i", "../../../LGtest_Folder" });
            //LGgenTool.Main(new string[] { "-l", "ts", "-i", "../../../LGtest.lg", "-o", "../../../LGtest_OutputChoice/"});
            LGgenTool.Main(new string[] { "-l", "cs", "-i", "../../../LGtest.lg", "-n", "LG", "-o" , "../../../LGtest_ClassNameChoice/"});
        }
    }
}
