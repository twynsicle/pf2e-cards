import { TextField } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { borderRadiusSelector, setBorderRadius } from '../../store/features/settingsSlice';
import styled from '@emotion/styled';

// calc the vh
const SettingsWrapper = styled.div`
    padding: 10px 10px 10px 10px;
    position: relative;
    height: 95vh;
`;

const LegalNotice = styled.div`
    position: absolute;
    bottom: 0;
    font-size: 12px;
    //font-style: italic;
    line-height: 14px;
    text-align: center;
    color: #888;
    padding-right: 10px;
`;

export const Settings = () => {
    const dispatch = useAppDispatch();

    const borderRadius = useAppSelector(borderRadiusSelector);

    return (
        <SettingsWrapper>
            <TextField
                label="Border Radius (mm)"
                value={borderRadius}
                onChange={(event, newValue) => {
                    console.log('dispatch');
                    dispatch(setBorderRadius(newValue));
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
