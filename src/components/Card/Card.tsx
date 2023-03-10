import './Card.css';
import { ItemCard } from '../../types';
import { ReactFitty } from 'react-fitty';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { borderRadiusSelector } from '../../store/features/settingsSlice';
import { removeCard } from '../../store/features/cardSlice';
import { Icon } from '@fluentui/react/lib/Icon';

export interface CardProps {
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

//TODO do i need to include damage for mundane and magical weapons?

export const Card = (props: CardProps) => {
    const dispatch = useAppDispatch();
    const item = props.card.item;

    const borderRadius = useAppSelector(borderRadiusSelector);
    const cardStyle = {
        borderRadius: `${borderRadius}mm`,
    };
    const closeIconStyle = {
        borderTopRightRadius: `${borderRadius}mm`,
    };

    function removeCardHandler() {
        dispatch(removeCard(props.card.item));
    }

    return (
        <div className="card" style={cardStyle}>
            <div className="close" onClick={removeCardHandler} style={closeIconStyle}>
                <Icon iconName="ChromeClose" />
            </div>
            <p className="header">
                <span className="name"> {item.name} </span>
                {/*<span className="level"> {item.level} </span>*/}
            </p>

            <div className="description" dangerouslySetInnerHTML={{ __html: item.description }} />

            {item.consumable ? <p className="is-consumable">Consumable</p> : <p className="price">{item.price}</p>}

            <p className="properties">
                <span>Rarity: </span>
                <span>{item.rarity}; </span>
                <span>Usage: </span>
                <span>{item.usage}; </span>
                <span>Bulk: </span>
                <span>{item.weight}</span>
            </p>
            <p className="traits">
                {item.traits.map((trait: string, index: number) => (
                    <Trait name={trait} key={`${item.id}-${index}`} />
                ))}
            </p>
        </div>
    );
};
