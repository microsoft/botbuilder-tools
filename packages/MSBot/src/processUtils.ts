import * as child_process from "child_process";

// child_process.spawn isn't promise and is complicated in how to captures stream of stdout/sterr
export function spawnAsync(command: string, stdout?: (data: string) => void, stderr?: (data: string) => void): Promise<string> {
    return new Promise<any>((resolve, reject) => {
        let parts = command.split(' ');
        let p = child_process.spawn('az', parts.slice(1), { shell: true, stdio: ['inherit', 'pipe', 'pipe'] });
        let out = '';
        p.stderr.on('data', (data) => {
            if (stderr) {
                stderr(data.toString('utf8'));
            }
        })

        p.stdout.on('data', (data) => {
            out += data;
            if (stdout) {
                stdout(data.toString('utf8'));
            }
        })

        p.on('close', (code) => {
            if (code > 0)
                reject('' + code);
            else
                resolve(out);
        });
    });
}