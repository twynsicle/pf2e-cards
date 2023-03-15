export interface Item {
    id: string;
    name: string;
    level: number;
    traits: string[];
    rarity: string;
    usage: string;
    weight: string;
    description: string;
    type: string;
    price?: string | number; //TODO this should only be a string, but we're refactoring this anyway
    source: string;
    consumable: boolean;
}

export interface ItemCard {
    id: string;
    item: Item;
}

export interface Filters {
    searchTerm: string;
    showConsumable: boolean;
    showPermanent: boolean;
    levelUpper: number;
    levelLower: number;
}
