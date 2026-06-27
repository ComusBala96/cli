import fs from 'fs';
import path from 'path';

export class FileWriter {
    static ensureDirectory(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true,
            });
        }
    }

    static exists(file) {
        return fs.existsSync(file);
    }

    static read(file) {
        if (!this.exists(file)) {
            return '';
        }
        return fs.readFileSync(file, 'utf8');
    }
    static resolveFile(file) {
        const basename = path.basename(file);
        const dir = path.dirname(file);
        const migrationMatch = basename.match(/^\d{4}_\d{2}_\d{2}_\d{6}_(.+)\.php$/);
        if (!migrationMatch) {
            return file;
        }
        const migrationName = migrationMatch[1];
        const found = fs.readdirSync(dir).find((f) => f.endsWith(`_${migrationName}.php`));
        return found ? path.join(dir, found) : file;
    }
    static write(file, content, overwrite = false) {
        this.ensureDirectory(path.dirname(file));
        const target = this.resolveFile(file);
        if (!overwrite && this.exists(target)) {
            console.log(`⚠ Skipped ${path.basename(target)} (already exists)`);
            return;
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✔ Created ${path.basename(file)}`);
    }

    static update(file, content) {
        this.ensureDirectory(path.dirname(file));
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✔ ${path.basename(file)} Updated`);
    }

    static remove(file, stopAt) {
        if (!this.exists(file)) {
            return;
        }
        const target = this.resolveFile(file);
        if (!this.exists(target)) {
            console.log(`⚠ ${path.basename(target)} not found`);
            return;
        }
        fs.unlinkSync(file);
        console.log(`✔ Deleted ${path.basename(file)}`);
        this.removeEmptyDirectories(path.dirname(file), stopAt);
    }
    static removeEmptyDirectories(dir, stopAt) {
        while (dir.startsWith(stopAt)) {
            if (!fs.existsSync(dir) || fs.readdirSync(dir).length > 0) {
                break;
            }
            fs.rmdirSync(dir);
            console.log(`✔ Removed empty directory ${path.basename(dir)}`);
            const parent = path.dirname(dir);
            if (parent === dir || parent === stopAt) {
                break;
            }
            dir = parent;
        }
    }
    // static insertUnique(content, marker, value) {
    //     if (!marker || !content.includes(marker)) {
    //         console.log(`⚠ Marker "${marker}" not found`);
    //         return {
    //             updated: false,
    //             content,
    //         };
    //     }
    //     const normalize = (str) =>
    //         str
    //             .replace(/\r\n/g, '\n')
    //             .replace(/[ \t]+/g, ' ')
    //             .trim();
    //     const normalizedContent = normalize(content);
    //     const normalizedValue = normalize(value);
    //     if (normalizedContent.includes(normalizedValue)) {
    //         console.log(`⚠ Content already exists. Skipping injection.`);
    //         return {
    //             updated: false,
    //             content,
    //         };
    //     }
    //     console.log(`✔ Injecting content into marker "${marker}"`);
    //     return {
    //         updated: true,
    //         content: content.replace(marker, `${marker}\n${value}`),
    //     };
    // }
    // static inject(file, replaceContent, injectKey = '') {
    //     if (!this.exists(file)) {
    //         throw new Error(file + ' not found');
    //     }
    //     let content = this.read(file);
    //     const result = this.insertUnique(content, injectKey, replaceContent);
    //     if (!result.updated) {
    //         console.log(`⚠ ${path.basename(file)} unchanged`);
    //         return;
    //     }
    //     this.update(file, result.content);
    // }
    static injectBlock(file, marker, key, content) {
        if (!this.exists(file)) {
            throw new Error(`${file} not found`);
        }
        let source = this.read(file);
        const start = `// <orians:${key}:start>`;
        const end = `// <orians:${key}:end>`;
        if (source.includes(start)) {
            console.log(`⚠ ${key} already exists`);
            return;
        }
        const block = `${start}
${content.trim()}
${end}`;
        source = source.replace(marker, `${marker}\n${block}`);
        this.update(file, source);
    }
    static updateBlock(file, key, content) {
        if (!this.exists(file)) {
            throw new Error(`${file} not found`);
        }
        const start = `// <orians:${key}:start>`;
        const end = `// <orians:${key}:end>`;
        let source = this.read(file);
        const regex = new RegExp(`${start}[\\s\\S]*?${end}`, 'g');
        if (!regex.test(source)) {
            console.log(`⚠ Block ${key} not found`);
            return;
        }
        source = source.replace(regex, `${start}\n${content.trim()}\n${end}`);
        this.update(file, source);
    }

    static removeBlock(file, key) {
        if (!this.exists(file)) {
            return;
        }
        const start = `// <orians:${key}:start>`;
        const end = `// <orians:${key}:end>`;
        let source = this.read(file);
        const regex = new RegExp(`\\n?${start}[\\s\\S]*?${end}\\n?`, 'g');
        if (!regex.test(source)) {
            console.log(`⚠ Block ${key} not found`);
            return;
        }
        source = source.replace(regex, '');
        this.update(file, source);
        console.log(`✔ Removed ${key}`);
    }
}
