import { CardProps } from './Card';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { borderRadiusSelector } from '../../store/features/settingsSlice';
import { Icon } from '@fluentui/react/lib/Icon';
import { CardContent } from './CardContent';
import { removeCard } from '../../store/features/cardSlice';
import styled from '@emotion/styled';

export interface DeletableCardProps extends CardProps {}

const CloseIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    color: #ccc;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
        color: white;
    }
`;

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
        dispatch(removeCard(props.card.id));
    }

    return (
        <div className="card" style={cardStyle}>
            <CloseIcon className="close" onClick={removeCardHandler} style={closeIconStyle}>
                <Icon iconName="ChromeClose" />
            </CloseIcon>
            <CardContent {...props} />
        </div>
    );
};
