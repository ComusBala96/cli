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

    static write(file, content) {
        this.ensureDirectory(path.dirname(file));
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✔ Created ${path.basename(file)}`);
    }

    static append(file, content) {
        this.ensureDirectory(path.dirname(file));
        fs.appendFileSync(file, '\n' + content, 'utf8');
        console.log(`✔ Updated ${path.basename(file)}`);
    }

    static prepend(file, content) {
        const existing = this.read(file);
        this.write(file, content + '\n' + existing);
    }

    static update(file, callback) {
        const content = this.read(file);
        const updated = callback(content);
        this.write(file, updated);
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
