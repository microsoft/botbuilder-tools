/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as child_process from 'child_process';

// child_process.spawn isn't promise and is complicated in how to captures stream of stdout/sterr
export function spawnAsync(command: string, stdout?: (data: string) => void, stderr?: (data: string) => void): Promise<string> {
    return new Promise<string>((resolve: (value?: string) => void, reject: (value?: string) => void): void => {
        const parts: string[] = command.split(' ');
        const p: child_process.ChildProcess = child_process.spawn(parts[0], parts.slice(1), {
            shell: true, stdio: ['inherit', 'pipe', 'pipe']
        });
        let out: string = '';
        p.stderr.on('data', (data: Buffer) => {
            if (stderr) {
                stderr(data.toString('utf8'));
            }
        });

        p.stdout.on('data', (data: Buffer) => {
            out += data;
            if (stdout) {
                stdout(data.toString('utf8'));
            }
        });

        p.on('close', (code: number) => {
            if (code > 0) {
                reject(` ${code}`);
            } else {
                resolve(out);
            }
        });
    });
}
