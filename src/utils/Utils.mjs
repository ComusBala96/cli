import pluralize from 'pluralize';

export class Utils {
    /*
    |--------------------------------------------------------------------------
    | String Helpers
    |--------------------------------------------------------------------------
    */

    static toPascalCase(str = '') {
        return str
            .split(/[^a-zA-Z0-9]+/)
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }

    static toSnakeCase(str = '') {
        return str
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
            .toLowerCase();
    }

    static toCapitalize(str = '') {
        return str
            .split('/')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('/');
    }

    static joinBackSlash(str = '') {
        return str.split('/').join('\\');
    }

    static toSentenceCase(value = '', separator = ' ') {
        return String(value)
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[_/-]+/g, ' ')
            .trim()
            .split(/\s+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(separator);
    }

    /*
    |--------------------------------------------------------------------------
    | Namespace Helpers
    |--------------------------------------------------------------------------
    */
    static getFirstPath(str = '') {
        return str.split('/')[0];
    }
    static excludeFirstPath(str = '') {
        return str.split('/').slice(1);
    }

    static excludeLastPath(str = '') {
        return str.split('/').slice(0, -1).join('/');
    }

    static convertPath(str = '', separator = '/', join = '.') {
        const arr = str.split(separator);
        return arr.join(join);
    }
    static addPage(str = '') {
        const arr = str.split('/');
        arr.splice(1, 0, 'pages');
        return arr.join('/');
    }
    /*
    |--------------------------------------------------------------------------
    | Laravel Helpers
    |--------------------------------------------------------------------------
    */
    static tableName(model) {
        return pluralize(this.toSnakeCase(model));
    }
    
    static migrationFile(model) {
        const table = this.tableName(model);
        const now = new Date();
        const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('_');
        const time = [String(now.getHours()).padStart(2, '0'), String(now.getMinutes()).padStart(2, '0'), String(now.getSeconds()).padStart(2, '0')].join('');
        return `${date}_${time}_create_${table}_table.php`;
    }

    /*
    |--------------------------------------------------------------------------
    | Breadcrumbs
    |--------------------------------------------------------------------------
    */

    static generateBreadCrumbs(pathName, firstPath) {
        const segments = pathName.split('/');
        return segments.map((segment, index) => {
            const key = `b${index + 1}`;
            let url = '';
            if (index === 0) {
                url = firstPath + '/dashboard';
            }
            if (index === segments.length - 1 && index !== 0) {
                url =
                    firstPath +
                    '/' +
                    segments
                        .slice(1)
                        .map((item) => item.toLowerCase())
                        .join('/');
            }

            return `
        '${key}' => [
            'name' => '${segment}',
            'url' => '${url}'
        ]`;
        });
    }
}
