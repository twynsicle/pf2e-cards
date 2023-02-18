export const alchemistsFire = {
  name: "Alchemist's Fire",
  level: 11,
  traits: ["alchemical", "bomb", "consumable", "fire", "splash"],
  rarity: "common",
  usage: "held-in-one-hand",
  weight: "L",
  description:
    "<p><strong>Activate</strong> <span class=\"pf2-icon\">A</span> Strike</p>\n<p>Alchemist's fire is a combination of volatile liquids that ignite when exposed to air. Alchemist's fire deals 3d8 fire damage, 3 persistent fire damage, and 3 fire splash damage. You gain a +2 item bonus to attack rolls.</p>",
  isConsumable: true,
};

export const maskOfTheBanshee = {
  name: "Mask of the Banshee",
  level: 9,
  traits: ["auditory", "invested", "magical", "necromancy", "negative"],
  rarity: "common",
  usage: "wornmask",
  weight: "-",
  description:
    '<p>This ice-blue half-mask is adorned with a wicked silver grin that covers the wearer\'s mouth, leaving the rest of the face uncovered. You gain a +2 item bonus to Intimidation checks.</p>\n<p><strong>Activate</strong> <span class="pf2-icon">2 </span>envision, Interact</p>\n<p><strong>Frequency</strong> once per day</p>\n<hr />\n<p><strong>Effect</strong> The mask emits a soul-chilling scream that deals [[/r 6d10]] negative damage to each living creature in a @Template[type:emanation|distance:20] (@Check[type:fortitude|dc:25|basic:true] save).</p>\n<p><strong>Craft Requirements</strong> Supply a casting of <em>wail of the banshee</em>.</p>',
  isConsumable: false,
};
