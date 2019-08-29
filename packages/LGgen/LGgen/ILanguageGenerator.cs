using System.Collections.Generic;
using Microsoft.Bot.Builder.LanguageGeneration;

namespace LGgen
{
    public interface ILanguageGenerator
    {
        void Generate(string outPath, string clssName, List<LGTemplate> temp);
    }
}
