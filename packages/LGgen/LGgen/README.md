#  README

LGgen is a tool for generating strongly typed C# and typescript class file from a LG file.

## Usage

1. build the project.
2. navigate to 'bin/Debug/netcoreapp2.1'.
3. run the command  
`dotnet LGgen.dll [-l cs/ts] [-n CLASS_NAME] [-c] [-i LG_FILE_PATH] [-o OUTPUT_PATH]`   
    * `-l cs/ts` : Select C# or Typescript.  
    * `-i` : LG file path or folder.
    * `-o` : Output path, defaults to directory where LG file is and the same name with LG file  
    * `-n` : Designate class name, defaults to the same name of LG file
    * `-c` : Grammar check mode. You only need to input `[-c] [-i LG_FILE_PATH]` to run the grammar check.
4. The tool will generate a class file. Add this file into your project.
5. For C# file, use the same namespace with the LGfile.  
For Typescript file, use "import CLASS_NAME from './FILENAME'.
6. Then you can reference your LG template name by typing CLASSNAME.TEMPLATENAME and enjoy the auto-completing.

## EXTEND

### Add command line arguments

Implement the method in the "CommandHandler" class and add to Main function.

### Add language support

Build a class base on interface "ILanguage" and update the "RegisterAllLanguage" method in "LanguageRegister" class.
