// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace LUISGen
{
    public class Writer
    {
        public int IndentSize = 4;
        public int IndentLevel = 0;
        private StreamWriter _output;

        public void Indent()
        {
            IndentLevel += IndentSize;
        }

        public void Outdent()
        {
            IndentLevel -= IndentSize;
        }

        public Writer(string outputPath)
        {
            _output = new StreamWriter(outputPath);
        }

        public void Write(string str)
        {
            _output.Write(str);
        }

        public void WriteLine(string str)
        {
            _output.WriteLine(str);
        }

        public void WriteLine()
        {
            _output.WriteLine();
        }

        public void Indent(string str)
        {
            for (var i = 0; i < IndentLevel; ++i)
            {
                _output.Write(' ');
            }
            _output.Write(str);
        }

        public void IndentLine(string str)
        {
            Indent(str + _output.NewLine);
        }

        public void Close()
        {
            _output.Close();
        }
    }
}
