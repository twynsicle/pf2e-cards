import fs from 'fs';

function parseDescription(description) {
    // // replace [[/r 6d10]]
    // let parsedDescription = description.replace(/\[\[\/r (.*)]]/gm, (_, capture) => {
    //     return capture;
    // });
    // remove horizontal rule
    let parsedDescription = description.replaceAll('<hr />', '');
    // replace icons
    parsedDescription = parsedDescription.replace(/<span class="pf2-icon">(\w+) <\/span>/gm, (_, type) => {
        // todo cover other cases, or switch back to .tff
        // or use the official font https://www.reddit.com/r/Pathfinder2e/comments/d83hq2/pathfinder_2e_actions_font/
        return `<span class="pf2-icon">${type} </span>`;
    });
    // Replace [[/r {3d6}[acid]]]{3d6 acid damage}
    parsedDescription = parsedDescription.replace(/\[\[\/r \{[\w+]+}\[[\w,]+]]]\{([\w ]+)}/gm, (_, damage) => {
        return damage;
    });
    // Replace [[/r 1[cold]]]{1 cold splash damage
    parsedDescription = parsedDescription.replace(/\[\[\/r \d+\[\w+]]]\{([\w ]+)}/gm, (_, damage) => {
        return `deals ${damage}`;
    });
    // Replace [[/r 1d4 #rounds]]{1d4 rounds}
    parsedDescription = parsedDescription.replace(/\[\[\/r ([\w+]+) #rounds]]\{([\w+ ]+)}/gm, (_, roll, text) => {
        return text;
    });
    // Replace [[/r {3d6}[persistent,acid]]]
    parsedDescription = parsedDescription.replace(/\[\[\/r \{([\w+]+)}\[[\w,]+]]]/gm, (_, roll) => {
        return roll;
    });
    // Replace [[/r 1d20+30 #Counteract]]{+30}
    // Replace [[/r {1d20+28} #Twilight Lantern (Major)]]{+28}
    // Replace [[/r {1d20+31}#Counteract Check]]{+31}
    parsedDescription = parsedDescription.replace(/\[\[\/r {?[\w+]+}? ?#[\w() ]+]]\{([\w+ ]+)}/gm, (_, roll) => {
        return roll;
    });
    // Replace [[/r 1d4]]
    parsedDescription = parsedDescription.replace(/\[\[\/r ([\w+]+)]]/gm, (_, roll) => {
        return roll;
    });
    // Replace [[/r 1d10 #Days to Rebuild Body]]
    parsedDescription = parsedDescription.replace(/\[\[\/r (\w+) ?#[\w() ]+]]/gm, (_, roll) => {
        return roll;
    });
    // Replace @Localize[PF2E.PersistentDamage.Bleed1d6.success]
    parsedDescription = parsedDescription.replace(
        /@Localize\[PF2E\.PersistentDamage\.Bleed([\w]+)\.success]/gm,
        (_, roll) => {
            return `${roll} persistent bleed damage`;
        }
    );
    // @UUID[Compendium.pf2e.spells-srd.Detect Magic]{Detect Magic}
    parsedDescription = parsedDescription.replace(/@UUID\[[\w\-. ]*]\{([\w ]*)}/gm, (_, name) => {
        return name;
    });
    // {3d8}[piercing]{3d8 Piercing Damage}
    parsedDescription = parsedDescription.replace(/\{\w+}\[\w+]\{(.*)}/gm, (_, damage) => {
        return `${damage}`;
    });
    // replace @Template[type:line|distance:120|width:10]{120-foot lines}
    parsedDescription = parsedDescription.replace(/@Template\[[\w:|]+]{([\w+\- ]+)}/gm, (_, text) => {
        return text;
    });
    // replace @Template[type:emanation|distance:20]
    parsedDescription = parsedDescription.replace(/@Template\[type:(\w+)\|distance:(\w+)]/gm, (_, type, distance) => {
        return `${distance}-foot ${type}`;
    });
    // replace @Check[type:fortitude|dc:25|basic:true]
    parsedDescription = parsedDescription.replace(
        /@Check\[type:(\w+)\|dc:(\w+)\|basic:(\w+)\|.*]/gm,
        (_, type, dc, basic) => {
            const basicText = basic === 'true' ? 'basic ' : '';
            // const typeCapitalised = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
            return `DC ${dc} ${basicText}${type}`;
        }
    );
    // replace @Check[type:flat|dc:5]
    // replace @Check[type:fortitude|dc:28|name:Greater Thunderstone|showDC:all]
    // replace @Check[type:will|dc:24|name:Dazzling Bismuth Leopard|traits:uncommon,visual|showDC:all]
    parsedDescription = parsedDescription.replace(/@Check\[type:(\w+)\|dc:(\w+)\|?[|\w:, \-]*]/gm, (_, type, dc) => {
        // TODO will any of this conflict with the one below - make it more general
        // TODO save vs check - check the type?
        // const typeCapitalised = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
        return `DC ${dc} ${type} check`;
    });
    // replace @Check[type:intimdation]
    parsedDescription = parsedDescription.replace(/@Check\[type:(\w+)]/gm, (_, type) => {
        return type;
    });
    // replace @UUID[Compendium.pf2e.spells-srd.Lightning Bolt]{Lightning Bolt}
    // replace @UUID[Compendium.pf2e.conditionitems.Flat-Footed]{Flat-Footed}
    parsedDescription = parsedDescription.replace(/@UUID\[Compendium[\w.\- ]+]\{([\w\- +]+)}/gm, (_, text) => {
        return text;
    });
    // remove @UUID[Compendium...
    parsedDescription = parsedDescription.replace(/(@UUID\[Compendium.*]\{.*})/gm, '');
    // remove Craft requirements
    parsedDescription = parsedDescription.replace(/Craft Requirements.*$/gm, '');
    return parsedDescription;
}

function calculatePrice(values) {
    if (!values) {
        return 'no value';
    }

    let total = 0;
    if (values['pp']) {
        total += values['pp'] * 10;
    }
    if (values['gp']) {
        total += values['gp'];
    }
    if (values['sp']) {
        total += values['sp'] / 10;
    }
    if (values['cp']) {
        total += values['cp'] / 100;
    }
    if (total % 1 === 0) {
        return `${total}gp`;
    }
    if (total % 0.1 === 0) {
        return `${total / 10}sp`;
    }
    if (total % 0.01 === 0) {
        return `${total / 100}cp`;
    }
    return total;
}

fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) throw err;

    let jsonData = JSON.parse(data);

    let output = [];
    let usages = {};
    let noDescription = 0;

    // process the values
    jsonData.results.forEach((item) => {
        // if (!item.system.price) {
        //     return;
        // }
        if (item.name.indexOf('Class Kit') > -1) {
            return;
        }
        if (item.name === "Adventurer's Pack" || item.name === "Cartographer's Kit") {
            return;
        }

        const consumable = item.system.traits?.value.includes('consumable');

        try {
            const processedItem = {
                id: item._id,
                name: item.name,
                level: Number(item.system.level.value),
                traits: item.system.traits.value,
                rarity: item.system.traits.rarity,
                usage: item.system.usage.value,
                weight: String(item.system.weight.value),
                description: parseDescription(item.system.description.value),
                type: item.type,
                consumable: consumable,
                price: calculatePrice(item.system.price?.value),
                source: item.system.source.value,
            };
            output.push(processedItem);
            if (processedItem.description.indexOf('[[/r') > -1) {
                console.log(item.name);
            }
            if (processedItem.description.indexOf('@') > -1) {
                console.log(item.name);
            }
            if (processedItem.description.length === 0) {
                noDescription += 1;
            }
            // if (usages[processedItem.usage]) {
            //     usages[processedItem.usage] += 1;
            // } else {
            //     usages[processedItem.usage] = 1;
            // }
        } catch {
            console.log(item.name);
        }
    });

    console.log(`No description: ${noDescription}`);
    // console.log(usages);

    // write the file back to the file system
    fs.writeFile('src/assets/output.json', JSON.stringify(output), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
