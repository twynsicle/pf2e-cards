import { useAppDispatch, useAppSelector } from '../../store/store';
import { borderRadiusSelector } from '../../store/features/settingsSlice';
import { Icon } from '@fluentui/react/lib/Icon';
import { ItemCardContent } from './ItemCardContent';
import { removeCard } from '../../store/features/cardSlice';
import styled from '@emotion/styled';
import { ItemCard, SpellCard } from "../../types";
import React from "react";
import { SpellCardContent } from "./SpellCardContent";

export type DeletableCardProps = {
    content: ItemCard | SpellCard;
}

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
        dispatch(removeCard(props.content.id));
    }

    const Close = () => {
        return (
            <CloseIcon className="close" onClick={removeCardHandler} style={closeIconStyle}>
                <Icon iconName="ChromeClose" />
            </CloseIcon>
        )
    }

    if ((props.content.content as any).price ) {
        let itemCard = props.content as ItemCard

        return (
            <div className="card" style={cardStyle}>
                <Close />
                <ItemCardContent card={itemCard} />
            </div>
        );
    } else {
        let spellCard = props.content as SpellCard
        return (
            <div className="card" style={cardStyle}>
                <Close />
                <SpellCardContent card={spellCard} />
            </div>
        );
    }
};
