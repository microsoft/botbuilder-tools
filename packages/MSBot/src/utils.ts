/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
export function uuidValidate(value: string): boolean {
    return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/.test(value);
}

export function showMessage(value: string): string {
    return `${process.env.VERBOSE === 'verbose' ? '[msbot] ' : ''}${value}`;
}
