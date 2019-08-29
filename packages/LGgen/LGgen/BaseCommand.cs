using System;
using System.Collections.Generic;
using System.Linq;

namespace LGgen
{
    public abstract class BaseCommand
    {
        public BaseCommand(string usage, string usageSample, string command, bool singleCommand = true)
        {
            Usage = usage;
            UsageSample = usageSample;
            Command = command;
            SingleCommand = singleCommand;
        }

        public string Usage { get; set; }
        public string UsageSample { get; set; }
        public string Command { get; set; }
        public bool SingleCommand { get; set; }
        public abstract void Compile(CommandHandler context);

        public bool TryGetCommandValue(List<string> args, out string commandValue)
        {
            commandValue = "";

            if (!args.Contains(Command)) return false;

            if (SingleCommand) return true;
            else if (args.Count == args.IndexOf(Command) + 1)
            {
                throw new Exception($"End with Command {Command} without Value. ");
            }
            else
            {
                var temp = args[args.IndexOf(Command) + 1];
                if (!temp.StartsWith('-') && temp != "")
                {
                    commandValue = temp;
                    return true;
                }
                else throw new Exception($"No Corresponding Value with the Command {Command}. ");
            }
        }
    }
}
