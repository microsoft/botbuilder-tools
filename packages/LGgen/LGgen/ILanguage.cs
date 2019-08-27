using System.Collections.Generic;

namespace LGgen
{
    public interface ILanguage
    {
        void Generate(string outPath, LgTemplate temp);
    }
}
