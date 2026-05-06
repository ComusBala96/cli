export function moduleIndexTemplate(name: string): string {
    const className = pascal(name);

    return `import { ModuleContract, AppContract } from '@orians/core';

export class ${className}Module implements ModuleContract {
  name = '${name}';

  register(app: AppContract): void {
    app.logger.info('[${name}] register');
  }

  boot(app: AppContract): void {
    app.logger.info('[${name}] boot');
  }
}

export default new ${className}Module();
`;
}

export function modulePageTemplate(name: string): string {
    return `export default function init${pascal(name)}Page(): void {
  console.log('[${name}] page loaded');
}
`;
}

export function pascal(value: string): string {
    return value
        .split(/[-_\s/]+/)
        .filter(Boolean)
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join('');
}
