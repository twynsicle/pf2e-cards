import { Checkbox, TextField } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
    borderRadiusSelector,
    displayPreviewSelector,
    setBorderRadius,
    setDisplayPreview,
} from '../../store/features/settingsSlice';
import styled from '@emotion/styled';
import { setShowConsumable } from '../../store/features/itemSlice';
import React from 'react';

// calc the vh
const SettingsWrapper = styled.div`
    padding: 10px 10px 10px 10px;
    position: relative;
    height: 95vh;

    .ms-Checkbox {
        margin: 15px 0 0 0;
    }
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

export const Settings = () => {
    const dispatch = useAppDispatch();

    const borderRadius = useAppSelector(borderRadiusSelector);
    const displayPreview = useAppSelector(displayPreviewSelector);

    return (
        <SettingsWrapper>
            <TextField
                label="Border Radius (mm)"
                value={borderRadius}
                onChange={(event, newValue) => {
                    dispatch(setBorderRadius(newValue));
                }}
            />
            <Checkbox
                label="Display Card Preview"
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
