namespace LGgen
{
    public interface ICommandMiddleware
    {
        string Usage { get; set; }
        string UsageSample { get; set; }
        string Command { get; set; }
        bool SingleCommand { get; set; }
        void Compile(CommandHandler context);
    }
}