using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LGgen_Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            LGgen.Program.Main(new string[] { "-i", "C:/Users/t-hahan/Desktop/Newfolder/mytest1.lg", "-l", "-cs" });
        }
    }
}
