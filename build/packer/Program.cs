using System;
using System.IO;
using System.IO.Compression;

namespace packer
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length != 2)
            {
                Console.WriteLine("packer pack <folder>");
                Console.WriteLine("Will pack all sub-folders as nupkgs\n");
                Console.WriteLine("packer unpack <folder>");
                Console.WriteLine("Will unpack all nupkgs into sub-folders");
                return;
            }

            switch (args[0].ToLower())
            {
                case "pack":
                    foreach (var folder in Directory.GetDirectories(args[1]))
                    {
                        var nupkg = $"{folder}.nupkg";
                        Console.WriteLine($"Packing {folder} folder into {nupkg}");

                        if (File.Exists(nupkg))
                            File.Delete(nupkg);

                        ZipFile.CreateFromDirectory(folder, nupkg);
                    }
                    break;
                    
                case "unpack":
                    foreach (var nupkg in Directory.GetFiles(args[1], "*.nupkg"))
                    {
                        var folder = Path.Combine(args[1], Path.GetFileNameWithoutExtension(nupkg));
                        Console.WriteLine($"Unpacking {nupkg} into folder {folder}");
                        System.IO.Compression.ZipFile.ExtractToDirectory(nupkg, folder);
                    }
                    break;
            }
        }
    }
}