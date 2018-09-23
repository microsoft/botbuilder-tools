#! "netcoreapp2.0"
if (Args.Count != 1)
{
    Console.WriteLine("dotnet script unpack.csx <folder>");
    Console.WriteLine("Will unpack all nupkgs into sub-folders");
    return;
}
foreach (var nupkg in Directory.GetFiles(Args[0], "*.nupkg"))
{
    var folder = Path.Combine(Args[0], Path.GetFileNameWithoutExtension(nupkg));
    Console.WriteLine($"Unpacking {nupkg} into folder {folder}");
    System.IO.Compression.ZipFile.ExtractToDirectory(nupkg, folder);
}
