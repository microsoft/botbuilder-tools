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
        public static string FindClassName(string input)
        {
            
            if (input.IndexOf('\\') == -1 && input.IndexOf('/') == -1)
            {
                return input.Substring(0, input.IndexOf('.'));
            }
            else
            {
                var index = Math.Max(input.LastIndexOf('\\'), input.LastIndexOf('/'));
                return input.Substring(index + 1, input.LastIndexOf('.') - index - 1);
            }
        }

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
                    if(fsinfo.FullName.EndsWith(".lg"))
                    {
                        LGfiles.Add(fsinfo.FullName);
                    }
                }
            }
        }
    }
}