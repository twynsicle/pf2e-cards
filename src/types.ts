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
    item: Item;
}

export interface Filters {
    searchTerm: string;
    showConsumable: boolean;
    showPermanent: boolean;
    levelUpper: number;
    levelLower: number;
}
