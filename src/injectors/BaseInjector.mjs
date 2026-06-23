export class BaseInjector {
    insertUnique(content, marker, value) {
        if (content.includes(value.trim())) {
            return content;
        }
        return content.replace(marker, `${marker}\n${value}`);
    }
}
