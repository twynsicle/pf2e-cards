export function convertCheck(description) {
    return description.replace(/@Check\[(.*?)](\{.*?})?/gm, (_, content, text) => {
        if (text) {
            return text.replace('{', '').replace('}', '');
        }

        let tags = convertContentToTagMap(content);

        if (!tags['dc']) {
            return `${tags['type']}`;
        }

        if (tags['dc'].startsWith('resolve')) {
            return `${tags['type']}`;
        }

        if (tags['basic'] === 'true') {
            return `DC ${tags['dc']} basic ${tags['type']}`;
        }

        return `DC ${tags['dc']} ${tags['type']}`;
    });
}

export function convertTemplate(description) {
    return description.replace(/@Template\[(.*?)](\{.*?})?/gm, (_, content, text) => {
        if (text) {
            return text.replace('{', '').replace('}', '');
        }

        let tags = convertContentToTagMap(content);

        return `${tags['distance']}-foot ${tags['type']}`;
    });
}

export function convertUuid(description) {
    return description.replace(/@UUID\[(.*?)](\{.*?})?/gm, (_, content, text) => {
        if (text) {
            return text.replace('{', '').replace('}', '');
        }
        // For @UUID without link text, we'll just remove the string.
        return '';
    });
}

export function convertBRoll(description) {
    return description.replace(/\[\[\/br ?(.*?)]](\{.*?})?/gm, (_, content, text) => {
        if (text) {
            return text.replace('{', '').replace('}', '');
        }
        // For br without link text, we'll just remove the string.
        return '';
    });
}

export function convertRoll(description) {
    // We are using lazy checking, but that gets tripped up by the closing ] in our traits.
    return description.replace(/\[\[\/r ?(.*?)]?]](\{.*?})?/gm, (_, content, text) => {
        if (text) {
            return text.replace('{', '').replace('}', '');
        }

        if (content.indexOf('#') > -1) {
            return content.split('#')[0].trim();
        }

        if (content.indexOf('@item.system.damage.dice') > -1) {
            return content.replace(/\((.*?)\+@item.*/, (_, roll) => `${roll} + the number of weapon damage dice`);
        }

        return content.replace(/(.*)\[([\w,]+)/gm, (_, roll, traits) => {
            return `${roll} ${traits.split(',').join(' ')}`;
        });
    });
}

function convertContentToTagMap(content) {
    let tags = {};
    content.split('|').map((tag) => {
        let t = tag.split(':');
        tags[t[0]] = t[1];
    });
    return tags;
}
