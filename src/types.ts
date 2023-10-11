export interface Item {
    id: string;
    name: string;
    level: number;
    traits: string[];
    rarity: string;
    usage: string;
    weight: string; //TODO should be bulk
    description: string;
    type: string;
    price?: number;
    source: string;
    consumable: boolean;
}

export interface ItemCard {
    id: string;
    content: Item;
}

export interface Spell {
    id: string;
    name: string;
    level: number;
    traits: string[];
    rarity: string;
    duration: string;
    description: string
}

export interface SpellCard {
    id: string;
    content: Spell;
}

export interface Filters {
    searchTerm: string;
    levelUpper: number;
    levelLower: number;
}

export interface ItemFilters extends Filters{
    showConsumable: boolean;
    showPermanent: boolean;
}
