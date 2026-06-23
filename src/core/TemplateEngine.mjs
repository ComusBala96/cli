export class TemplateEngine {
    static validate(content, context = {}) {
        const matches = content.match(/\{\{(.*?)\}\}/g) || [];
        matches.forEach((match) => {
            const key = match.replace('{{', '').replace('}}', '').trim();
            if (!(key in context)) {
                throw new Error(`Missing template variable: ${key}`);
            }
        });
    }

    static render(content, context = {}) {
        this.validate(content, context);
        return content.replace(/\{\{(.*?)\}\}/g, (_, key) => context[key.trim()] ?? '');
    }
}
