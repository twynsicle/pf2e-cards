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
    price?: number;
    source: string;
    consumable: boolean;
}

export interface ItemCard {
    item: Item;
}
