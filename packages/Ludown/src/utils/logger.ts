import { writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * @description
 * Describes a logger class that keeps buffering any logs in a temporary
 * buffer, and then flushes that buffer in a file when it is done.
 */
export const logger = ((fileName: string) => {
    const filePath = resolve(__dirname, fileName);

    let buffer: string = '';

    return {
        buffer: (message: string) => {
            buffer = buffer.concat(message);
        },
        flush: () => {
            writeFileSync(filePath, buffer, { encoding: 'utf-8' });
        }
    };
})('ludown-debug.log');
