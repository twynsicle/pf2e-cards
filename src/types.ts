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
    price?: string;
    source: string;
    consumable: boolean;
}

export interface ItemCard {
    item: Item;
}

export interface Filters {
    searchTerm: string;
    showConsumable: boolean;
    showPermanent: boolean;
    levelUpper: number;
    levelLower: number;
}
