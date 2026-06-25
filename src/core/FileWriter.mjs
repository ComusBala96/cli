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

    static write(file, content, overwrite = false) {
        this.ensureDirectory(path.dirname(file));
        if (!overwrite) {
            const basename = path.basename(file);
            const migrationMatch = basename.match(/^\d{4}_\d{2}_\d{2}_\d{6}_(.+)\.php$/);
            if (migrationMatch) {
                const migrationName = migrationMatch[1];
                const exists = fs.readdirSync(path.dirname(file)).some((f) => f.endsWith(`_${migrationName}.php`));
                if (exists) {
                    console.log(`⚠ Skipped ${migrationName} (already exists)`);
                    return;
                }
            } else if (this.exists(file)) {
                console.log(`⚠ Skipped ${basename} (already exists)`);
                return;
            }
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✔ Created ${path.basename(file)}`);
    }
    static insertUnique(content, marker, value) {
        if (!marker || !content.includes(marker)) {
            console.log(`⚠ Marker "${marker}" not found`);
            return {
                updated: false,
                content,
            };
        }
        const normalize = (str) =>
            str
                .replace(/\r\n/g, '\n')
                .replace(/[ \t]+/g, ' ')
                .trim();
        const normalizedContent = normalize(content);
        const normalizedValue = normalize(value);
        if (normalizedContent.includes(normalizedValue)) {
            console.log(`⚠ Content already exists. Skipping injection.`);
            return {
                updated: false,
                content,
            };
        }
        console.log(`✔ Injecting content into marker "${marker}"`);
        return {
            updated: true,
            content: content.replace(marker, `${marker}\n${value}`),
        };
    }
    static inject(file, replaceContent, injectKey = '') {
        if (!this.exists(file)) {
            throw new Error(file + ' not found');
        }
        let content = this.read(file);
        const result = this.insertUnique(content, injectKey, replaceContent);
        if (!result.updated) {
            console.log(`⚠ ${path.basename(file)} unchanged`);
            return;
        }
        this.update(file, result.content);
    }
    static append(file, content) {
        this.ensureDirectory(path.dirname(file));
        fs.appendFileSync(file, '\n' + content, 'utf8');
        console.log(`✔ Updated ${path.basename(file)}`);
    }

    static prepend(file, content) {
        const existing = this.read(file);
        fs.writeFileSync(file, content + '\n' + existing, 'utf8');
        console.log(`✔ Updated ${path.basename(file)}`);
    }

    static update(file, content) {
        this.ensureDirectory(path.dirname(file));
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✔ ${path.basename(file)} Updated`);
    }

    static remove(file) {
        if (this.exists(file)) {
            fs.unlinkSync(file);
            console.log(`✔ Deleted ${path.basename(file)}`);
        }
    }

    static copy(source, destination) {
        this.ensureDirectory(path.dirname(destination));
        fs.copyFileSync(source, destination);
    }
}
