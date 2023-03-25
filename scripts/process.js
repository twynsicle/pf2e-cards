import fs from 'fs';
import { convertBRoll, convertCheck, convertRoll, convertTemplate, convertUuid } from './converters.js';
import { regExpEscape } from './utils.js';

function parseDescription(name, description) {
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

    // Replace @Localize[PF2E.PersistentDamage.Bleed1d6.success]
    parsedDescription = parsedDescription.replace(
        /@Localize\[PF2E\.PersistentDamage\.Bleed([\w]+)\.success]/gm,
        (_, roll) => {
            return `${roll} persistent bleed damage`;
        }
    );

    parsedDescription = convertRoll(parsedDescription);
    parsedDescription = convertCheck(parsedDescription);
    parsedDescription = convertTemplate(parsedDescription);
    parsedDescription = convertUuid(parsedDescription);
    parsedDescription = convertBRoll(parsedDescription);

    const effect = new RegExp(`Effect: ${regExpEscape(name)}`, 'gm');
    parsedDescription = parsedDescription.replace(effect, '');

    // remove Craft requirements
    //TODO do i need to put the final </p> back?
    parsedDescription = parsedDescription.replace(/Craft Requirements.*$/gm, '');
    return parsedDescription;
}

function calculatePrice(values) {
    if (!values) {
        return 0;
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
    return total;
}

fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) throw err;

    let jsonData = JSON.parse(data);

    let output = [];
    let usages = {};
    let noDescription = 0;

    // process the values
    jsonData.forEach((item) => {
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
                description: parseDescription(item.name, item.system.description.value),
                type: item.type,
                consumable: consumable,
                price: calculatePrice(item.system.price?.value),
                source: item.system.source.value,
            };
            output.push(processedItem);
            // if (processedItem.description.indexOf('Effect:') > -1) {
            //     console.log(`${item.name} Effect`);
            // }
            if (processedItem.description.indexOf('[[/r') > -1) {
                console.log(`${item.name} \[[[/r`);
            }
            if (processedItem.description.indexOf('@') > -1) {
                console.log(`${item.name} \@`);
            }
            if (processedItem.description.indexOf('{') > -1) {
                console.log(`${item.name} \{`);
            }
            if (processedItem.description.length === 0) {
                noDescription += 1;
            }
            // if (usages[processedItem.usage]) {
            //     usages[processedItem.usage] += 1;
            // } else {
            //     usages[processedItem.usage] = 1;
            // }
        } catch (exception) {
            console.log(exception);
            console.log(item.name);
        }
    });

    console.log(`No description: ${noDescription}`);
    // console.log(usages);

    // write the file back to the file system
    fs.writeFile('public/items.json', JSON.stringify(output), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
