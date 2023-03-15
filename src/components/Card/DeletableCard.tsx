import { CardProps } from './Card';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { borderRadiusSelector } from '../../store/features/settingsSlice';
import { Icon } from '@fluentui/react/lib/Icon';
import { CardContent } from './CardContent';
import { removeCard } from '../../store/features/cardSlice';

export interface DeletableCardProps extends CardProps {}

export const DeletableCard = (props: DeletableCardProps) => {
    const dispatch = useAppDispatch();
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
            <CardContent {...props} />
        </div>
    );
};
