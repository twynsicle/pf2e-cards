import { Checkbox, TextField } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
    borderRadiusSelector,
    displayPreviewSelector,
    setBorderRadius,
    setDisplayPreview,
    setCardsPerPage,
    cardsPerPageSelector,
    displayPurchaseValueSelector,
    displaySaleValueSelector,
    playerCountSelector,
    setDisplayPurchaseValue,
    setDisplaySaleValue,
    setPlayerCount,
} from '../../store/features/settingsSlice';
import styled from '@emotion/styled';
import React from 'react';

// calc the vh
const SettingsWrapper = styled.div`
    padding: 10px 10px 10px 10px;
    position: relative;
    height: 95vh;

    .ms-Checkbox {
        margin: 5px 0 0 0;
    }
`;

const SettingHeader = styled.h4`
    color: black;
    margin: 20px 0 0;
`;

const LegalNotice = styled.div`
    position: absolute;
    bottom: 0;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #888;
    padding-right: 10px;
`;

function ensureNumber(value: string, defaultValue: string) {
    if (!value || value === '0' || isNaN(Number(value))) {
        return defaultValue;
    }
    return value;
}

export const Settings = () => {
    const dispatch = useAppDispatch();

    const borderRadius = useAppSelector(borderRadiusSelector);
    const cardsPerPage = useAppSelector(cardsPerPageSelector);

    const displayPurchaseValue = useAppSelector(displayPurchaseValueSelector);
    const displaySaleValue = useAppSelector(displaySaleValueSelector);
    const playerCount = useAppSelector(playerCountSelector);

    const displayPreview = useAppSelector(displayPreviewSelector);

    return (
        <SettingsWrapper>
            <SettingHeader>Print settings</SettingHeader>
            <TextField
                label="Cards per page"
                value={cardsPerPage}
                onChange={(event, newValue) => {
                    const newCardsPerPage = ensureNumber(newValue ?? '', '8');
                    dispatch(setCardsPerPage(newCardsPerPage));
                }}
            />
            <TextField
                label="Border Radius (mm)"
                value={borderRadius}
                onChange={(event, newValue) => {
                    dispatch(setBorderRadius(newValue));
                }}
            />

            <SettingHeader>Gold Value</SettingHeader>
            <Checkbox
                label="Display purchase value"
                checked={displayPurchaseValue}
                onChange={(event, newValue) => {
                    dispatch(setDisplayPurchaseValue(newValue || false));
                }}
            />
            <Checkbox
                label="Display sale value per player"
                checked={displaySaleValue}
                onChange={(event, newValue) => {
                    dispatch(setDisplaySaleValue(newValue || false));
                }}
            />
            <TextField
                label="Number of players"
                value={playerCount}
                onChange={(event, newValue) => {
                    const newPlayerCount = ensureNumber(newValue ?? '', '4');
                    dispatch(setPlayerCount(newPlayerCount));
                }}
            />

            <SettingHeader>Misc</SettingHeader>
            <Checkbox
                label="Display card preview (mouse only)"
                checked={displayPreview}
                onChange={(event, newValue) => {
                    dispatch(setDisplayPreview(newValue || false));
                }}
            />

            <LegalNotice>
                <p>
                    This website uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's
                    Community Use Policy. We are expressly prohibited from charging you to use or access this content.
                    This website is not published, endorsed, or specifically approved by Paizo Inc. For more information
                    about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about
                    Paizo Inc. and Paizo products, please visit paizo.com.
                </p>
            </LegalNotice>
        </SettingsWrapper>
    );
};
