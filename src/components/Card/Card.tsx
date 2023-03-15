import './Card.css';
import { ItemCard } from '../../types';
// import { useAppDispatch, useAppSelector } from '../../store/store';
import { borderRadiusSelector } from '../../store/features/settingsSlice';
// import { removeCard } from '../../store/features/cardSlice';
import { Icon } from '@fluentui/react/lib/Icon';
import { CardContent } from './CardContent';

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
    const borderRadius = 3;
    const cardStyle = {
        borderRadius: `${borderRadius}mm`,
    };

    return (
        <div className="card" style={cardStyle}>
            <CardContent {...props} />
        </div>
    );
};
