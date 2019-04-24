import * as child_process from 'child_process';
import * as util from 'util';
const exec = util.promisify(child_process.exec);

export async function runCommand(command: string, log: boolean): Promise<any> {
    if (log) {
        console.log(command);
    }
    let p = await exec(command, { maxBuffer: 1024 * 2048 });
    try {
        return JSON.parse(p.stdout);
    } catch (err) {
        return p.stdout;
    }
}
