import './Card.css';
import { ItemCard } from '../../types';

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

//TODO do i need to include damage for mundane and magical weapons?

export const CardContent = (props: CardContentProps) => {
    const item = props.card.item;

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
        description = description.slice(0, 1200);
    }
    // if it's much bigger than this, we should clip the text and add an ellipsis

    let name = item.name;
    if (name.includes('(') && name.length < 27) {
        name = name.split('(').join('<br/>(');
    }

    return (
        <>
            <p className="header" dangerouslySetInnerHTML={{ __html: name }}>
                {/*<span className="name"> {name} </span>*/}
                {/*<span className="level"> {item.level} </span>*/}
            </p>

            <div className={`description ${fontSize}`} dangerouslySetInnerHTML={{ __html: description }} />

            {item.consumable ? <p className="is-consumable">Consumable</p> : <p className="price">{item.price}</p>}

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
