import fs from 'fs-extra';
import path from 'node:path';

export async function ensureDir(dir: string): Promise<void> {
    await fs.ensureDir(dir);
}

export async function writeFile(file: string, content: string): Promise<void> {
    await fs.ensureDir(path.dirname(file));
    await fs.writeFile(file, content, 'utf8');
}

export async function readFile(file: string): Promise<string> {
    return fs.readFile(file, 'utf8');
}

export async function exists(file: string): Promise<boolean> {
    return fs.pathExists(file);
}

export async function remove(file: string): Promise<void> {
    await fs.remove(file);
}

export function cwd(...segments: string[]): string {
    return path.resolve(process.cwd(), ...segments);
}
