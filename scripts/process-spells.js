import fs from "fs";

fs.readFile('input-spells.json', 'utf8', (err, data) => {
    if (err) throw err;

    let jsonData = JSON.parse(data);

    let output = [];
    let usages = {};
    let noDescription = 0;

    // process the values
    jsonData.forEach((spell) => {
        try {
            const processedSpell = {
                id: spell._id,
                name: spell.name,
                level: Number(spell.system.level.value),
                traits: spell.system.traits.value,
                rarity: spell.system.traits.rarity,
                duration: spell.system.duration.value,
                description: spell.system.description.value
                // heightening:
                // components:
                // rarity

            };
            output.push(processedSpell);
        } catch (exception) {
            console.log(exception);
            console.log(spell.name);
        }
    });

    console.log(`No description: ${noDescription}`);
    // console.log(usages);

    // write the file back to the file system
    fs.writeFile('public/spells.json', JSON.stringify(output), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
