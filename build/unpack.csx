#! "netcoreapp2.0"
if (Args.Count != 2) {
  Console.WriteLine("dotnet script unpack.csx <zip> <folder>");
  return;
}
Console.WriteLine($"Unpacking {Args[0]} into folder {Args[1]}");
System.IO.Compression.ZipFile.ExtractToDirectory(Args[0], Args[1]);
