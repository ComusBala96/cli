import fs from 'fs-extra';

export async function readJson<T = any>(file: string): Promise<T> {
    return fs.readJson(file);
}

export async function writeJson(file: string, data: any): Promise<void> {
    await fs.outputJson(file, data, { spaces: 2 });
}
