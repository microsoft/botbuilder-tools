#! "netcoreapp2.0"

if (Args.Count != 2) {
  Console.WriteLine("dotnet pack.csx <folder> <zipfile>");
  return;
}

Console.WriteLine($"Packing {Args[0]} folder into {Args[1]}");

if (File.Exists(Args[1]))
   File.Delete(Args[1]);
   
System.IO.Compression.ZipFile.CreateFromDirectory(Args[0], Args[1]);

