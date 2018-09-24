/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
export function stdoutAsync(output: string) { return new Promise((done) => process.stdout.write(output, "utf-8", () => done())); }
export function stderrAsync(output: string) { return new Promise((done) => process.stderr.write(output, "utf-8", () => done())); }
export function logAsync(output: string) { return new Promise((done) => process.stdout.write(output + '\n', "utf-8", () => done())); }
export function errorAsync(output: string) { return new Promise((done) => process.stderr.write(output + '\n', "utf-8", () => done())); }
