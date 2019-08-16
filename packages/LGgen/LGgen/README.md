#  README

LGgen is a tool for generating strongly typed C# and typescript class file from a LG file.

## Usage

1. build the project.
2. navigate to 'bin/Debug/netcoreapp2.1'.
3. run the command "dotnet LGgen.dll [-l cs/ts] [-n CLASS_NAME] [-i LG_FILE_PATH] [-o OUTPUT_PATH]". 
-l cs/ts : select C# or Typescript.  
-i : LG file path  
-o : output path, defaults to directory where LG file is and the same name with LG file  
-n : designate class name, defaults to the same name of LG file
4. The tool will generate a class file. Add this file into your project.
5. For C# file, use the same namespace with the LGfile.  
For Typescript file, use "import CLASS_NAME from './FILENAME'.
6. Then you can reference your LG template name by typing CLASSNAME.TEMPLATENAME and enjoy the auto-completing.