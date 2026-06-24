export class TemplateEngine {
    static validate(content, context = {}) {
        const matches = content.match(/\[\[\s*[a-zA-Z0-9_]+\s*\]\]/g) || [];
        matches.forEach((match) => {
            const key = match.slice(2, -2).trim();
            if (!(key in context)) {
                throw new Error(`Missing template variable: ${key}`);
            }
        });
    }

    static render(content, context = {}) {
        this.validate(content, context);
        return content.replace(/\[\[\s*([a-zA-Z0-9_]+)\s*\]\]/g, (_, key) => context[key] ?? '');
    }
}
