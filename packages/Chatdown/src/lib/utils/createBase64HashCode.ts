import * as crypto from 'crypto';

export function createBase64HashCode(contents: string): string {
  return crypto.createHash('sha1').update(contents).digest('base64');
}
