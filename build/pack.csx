#! "netcoreapp2.0"

if (Args.Count != 1)
{
    Console.WriteLine("dotnet pack.csx <folder>");
    Console.WriteLine("Will pack all sub-folders as nupkgs");
    return;
}

foreach (var folder in Directory.GetDirectories(Args[0]))
{
    var nupkg = $"{folder}.nupkg";
    Console.WriteLine($"Packing {folder} folder into {nupkg}");

    if (File.Exists(nupkg))
        File.Delete(nupkg);

    System.IO.Compression.ZipFile.CreateFromDirectory(folder, nupkg);
}

