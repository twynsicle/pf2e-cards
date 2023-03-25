import { assert, describe, test } from 'vitest';
import { convertBRoll, convertCheck, convertRoll, convertTemplate, convertUuid } from './converters.js';

describe('convertCheck', () => {
    test('with {link-text}', () => {
        const result = convertCheck('@Check[type:will|dc:38|name:Dimensional Anchor]{DC 38 Will}');
        assert.equal(result, 'DC 38 Will');
    });

    test('general case', () => {
        const result = convertCheck('@Check[type:fortitude|dc:28|name:Greater Thunderstone|showDC:all]');
        assert.equal(result, 'DC 28 fortitude');
    });

    test('no DC', () => {
        const result = convertCheck('@Check[type:intimidation]');
        assert.equal(result, 'intimidation');
    });

    test('dc resolve', () => {
        const result = convertCheck('@Check[type:fortitude|dc:resolve(@actor.system.attributes.classOrSpellDC.value)]');
        assert.equal(result, 'fortitude');
    });

    test('basic save', () => {
        const result = convertCheck('with a @Check[type:reflex|dc:39|basic:true|showDC:all] save');
        assert.equal(result, 'with a DC 39 basic reflex save');
    });

    test('flat check', () => {
        const result = convertCheck('@Check[type:flat|dc:5]');
        assert.equal(result, 'DC 5 flat');
    });

    test('when no @Check tag is present', () => {
        const description = 'This is a description';
        const result = convertCheck(description);
        assert.equal(result, description);
    });

    test('multiple', () => {
        const result = convertCheck(
            'attempt an @Check[type:athletics|dc:25|name:Spider Gun Athletics|traits:conjuration] check or @Check[type:reflex|dc:25|name:Spider Gun Reflex|traits:conjuration] save against DC 25'
        );
        assert.equal(result, 'attempt an DC 25 athletics check or DC 25 reflex save against DC 25');
    });
});

describe('convertTemplate', () => {
    test('with {link-text}', () => {
        const result = convertTemplate('@Template[type:line|distance:120|width:10]{120-foot lines}');
        assert.equal(result, '120-foot lines');
    });

    test('without {link-text}', () => {
        const result = convertTemplate('@Template[type:emanation|distance:20]');
        assert.equal(result, '20-foot emanation');
    });

    test('when no @Template tag is present', () => {
        const description = 'This is a description';
        const result = convertTemplate(description);
        assert.equal(result, description);
    });
});

describe('convertUuid', () => {
    test('with {link-text}', () => {
        const result = convertUuid('@UUID[Compendium.pf2e.spells-srd.Lightning Bolt]{Lightning Bolt}');
        assert.equal(result, 'Lightning Bolt');
    });

    test('with {link-text}2', () => {
        const result = convertUuid('@UUID[Compendium.pf2e.conditionitems.Flat-Footed]{Flat-Footed}');
        assert.equal(result, 'Flat-Footed');
    });

    test('with {link-text}3', () => {
        const result = convertUuid('@UUID[Compendium.pf2e.spells-srd.Detect Magic]{Detect Magic}');
        assert.equal(result, 'Detect Magic');
    });

    test('without {link-text}', () => {
        const result = convertUuid('@UUID[Compendium.pf2e.something]');
        assert.equal(result, '');
    });

    test('without {link-text} - multiple', () => {
        const result = convertUuid(
            "it's @UUID[Compendium.pf2e.conditionitems.Immobilized]{Immobilized} for 1 round or until it @UUID[Compendium.pf2e.actionspf2e.Escape]{Escapes} (DC 25)"
        );
        assert.equal(result, "it's Immobilized for 1 round or until it Escapes (DC 25)");
    });

    test('when no @UUID tag is present', () => {
        const description = 'This is a description';
        const result = convertUuid(description);
        assert.equal(result, description);
    });
});

describe('convertBRoll', () => {
    test('with {link-text}', () => {
        const result = convertBRoll('for [[/br 2d6 #rounds]]{2d6 rounds}');
        assert.equal(result, 'for 2d6 rounds');
    });

    test('when no @UUID tag is present', () => {
        const description = 'This is a description';
        const result = convertBRoll(description);
        assert.equal(result, description);
    });
});

describe('convertRoll', () => {
    test('with {link-text}', () => {
        const result = convertRoll('[[/r {3d6}[acid]]]{3d6 acid damage}');
        assert.equal(result, '3d6 acid damage');
    });

    test('with {link-text}2', () => {
        const result = convertRoll('[[/r (3[splash])[negative]]]{3 negative splash damage}');
        assert.equal(result, '3 negative splash damage');
    });

    test('with {link-text}3 - no gap after [[/r', () => {
        const result = convertRoll('with a [[/r120+28]]{+28} Athletics bonus');
        assert.equal(result, 'with a +28 Athletics bonus');
    });

    test('without {link-text} - with traits', () => {
        const result = convertRoll('[[/r 3d6[persistent,cold]]] damage');
        assert.equal(result, '3d6 persistent cold damage');
    });

    test('without {link-text} - with multiple', () => {
        const result = convertRoll(
            'one [[/r 18d6[fire]]] damage, three [[/r 16d6[fire]]] damage and five [[/r 14d6[fire]]] damage beads'
        );
        assert.equal(result, 'one 18d6 fire damage, three 16d6 fire damage and five 14d6 fire damage beads');
    });

    test('without {link-text} - simple', () => {
        const result = convertRoll('[[/r 1d4]]');
        assert.equal(result, '1d4');
    });

    test('without {link-text} - simple2', () => {
        const result = convertRoll('[[/r 1d10 #Days to Rebuild Body]]');
        assert.equal(result, '1d10');
    });

    test('without {link-text} - weapon damage dice', () => {
        const result = convertRoll('equal to [[/r (1d4+@item.system.damage.dice)[persistent,poison]]]');
        assert.equal(result, 'equal to 1d4 + the number of weapon damage dice');
    });

    test('when no [[\roll tag is present', () => {
        const description = 'This is a description';
        const result = convertRoll(description);
        assert.equal(result, description);
    });
});
