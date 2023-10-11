import './Card.css';
import { Spell, SpellCard } from "../../types";

export interface CardContentProps {
    card: SpellCard;
}

export interface TraitProps {
    name: string;
}

const Trait = (props: TraitProps) => {
    return <span className="trait">{props.name} </span>;
};

export const SpellCardContent = (props: CardContentProps) => {
    const spell = props.card.content as Spell;

    let name = spell.name;

    let fontSize = 'normal';

    if (!spell.description) {
        console.log('test', spell)
        return <div>no description</div>
    }

    let description = spell.description;
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

    return (
        <>
            <p className="header">
                <span className="name"> {name} </span>
                <span className="level"> {spell.level} </span>
            </p>

            <div className={`description ${fontSize}`} dangerouslySetInnerHTML={{ __html: description }} />

            <p className="properties">
                <span>Rarity: </span>
                <span className="rarity">{spell.rarity}; </span>
            </p>
            <p className="traits">
                {spell.traits.map((trait: string, index: number) => (
                    <Trait name={trait} key={`${spell.id}-${index}`} />
                ))}
            </p>
        </>
    );
};
