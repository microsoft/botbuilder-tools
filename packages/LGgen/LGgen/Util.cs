using AdaptiveCards.Rendering;
using System;
using Microsoft.Bot.Builder.LanguageGeneration;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace LGgen
{
    class Utils
    {
        public static void GetAllFiles(string dir, List<string> LGfiles)
        {
            DirectoryInfo d = new DirectoryInfo(dir);
            FileSystemInfo[] fsinfos = d.GetFileSystemInfos();
            foreach (var fsinfo in fsinfos)
            {
                if(fsinfo is DirectoryInfo)
                {
                    GetAllFiles(fsinfo.FullName, LGfiles);
                }
                else
                {
                    if(Path.GetExtension(fsinfo.FullName) == ".lg")
                    {
                        LGfiles.Add(fsinfo.FullName);
                    }
                }
            }
        }

        public static string SupportLanguage()
        {
            string s = "Support Language: ";
            foreach (var temp in LanguageRegister.LanguageList)
            {
                s += temp;
                s += " ";
            }
            s += ". ";

            return s;
        }
    }
}
