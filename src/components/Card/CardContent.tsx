import './Card.css';
import { ItemCard } from '../../types';
import { useAppSelector } from '../../store/store';
import {
    displayPurchaseValueSelector,
    displaySaleValueSelector,
    playerCountSelector,
} from '../../store/features/settingsSlice';

export interface CardContentProps {
    card: ItemCard;
}

export interface TraitProps {
    name: string;
}

const Trait = (props: TraitProps) => {
    if (props.name.toLowerCase() === 'consumable') {
        return null;
    }
    return <span className="trait">{props.name} </span>;
};

function convertUsage(usage: string) {
    let result = usage.split('-').join(' ');
    if (result.startsWith('worn')) {
        result = result.replace('worn', 'worn ');
    }
    return result;
}

function calculatePurchaseValue(price: number): string {
    if (price === 0) {
        return 'no value';
    }
    // Round anything below a copper up to a copper
    let remainingPrice = Math.round(price * 100) / 100;
    let result = '';
    const gp = Math.floor(remainingPrice);
    if (gp > 0) {
        result += `${gp}gp`;
        remainingPrice -= gp;
    }
    const sp = Math.floor(remainingPrice * 10);
    if (sp > 0) {
        result += ` ${sp}sp`;
        remainingPrice -= sp;
    }
    const cp = remainingPrice * 10;
    if (cp > 0) {
        result += ` ${cp}cp`;
        remainingPrice -= cp;
    }
    if (remainingPrice > 0) {
        //TODO remove
        console.log('something has gone wrong, initial price:', price);
    }

    return result;
}

//TODO do i need to include damage for mundane and magical weapons?

export const CardContent = (props: CardContentProps) => {
    const item = props.card.item;

    const displayPurchaseValue = useAppSelector(displayPurchaseValueSelector);
    const displaySaleValue = useAppSelector(displaySaleValueSelector);
    const playerCount = useAppSelector(playerCountSelector);

    let fontSize = 'normal';
    let description = item.description;
    // this need to be more sophisticated, maybe count paragraphs?
    if (description.length < 300) {
        fontSize = 'large';
    }
    if (description.length > 850) {
        fontSize = 'small';
    }
    if (description.length > 1200) {
        // description = description.slice(0, 1200);
    }
    // if it's much bigger than this, we should clip the text and add an ellipsis

    let name = item.name;
    let grade = '';
    if (name.includes('(')) {
        const nameParts = name.split('(');
        name = nameParts[0];
        grade = `(${nameParts[1]}`;
    }

    const itemPrice = item.price || 0;
    const purchaseValue = calculatePurchaseValue(itemPrice);
    const saleValue = calculatePurchaseValue(itemPrice / Number(playerCount) / 2);

    return (
        <>
            <p className="header">
                <span className="name"> {name} </span>
                {grade ? <span className="grade">{grade}</span> : null}
                {/*<span className="level"> {item.level} </span>*/}
            </p>

            <div className={`description ${fontSize}`} dangerouslySetInnerHTML={{ __html: description }} />

            <div className="price-group">
                {item.consumable ? <span className="is-consumable">Consumable</span> : null}
                {displayPurchaseValue ? <span className="purchase-value">{purchaseValue}</span> : null}
                {displaySaleValue ? <span className="purchase-value">(Sells for {saleValue})</span> : null}
            </div>

            <p className="properties">
                <span>Rarity: </span>
                <span className="rarity">{item.rarity}; </span>
                <span>Usage: </span>
                <span className="usage">{convertUsage(item.usage)}; </span>
                <span>Bulk: </span>
                <span className="bulk">{item.weight}</span>
            </p>
            <p className="traits">
                {item.traits.map((trait: string, index: number) => (
                    <Trait name={trait} key={`${item.id}-${index}`} />
                ))}
            </p>
        </>
    );
};
