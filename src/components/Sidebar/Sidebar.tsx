import styled from '@emotion/styled';
import React from 'react';
import { ItemList } from './ItemList';
import { Pivot, PivotItem } from '@fluentui/react';
import { Settings } from './Settings';

const SidebarWrapper = styled.div`
    //min-width: 300px;
    height: 100vh;
    max-height: 100vh;
    background-color: white;
    //box-shadow: rgb(0 0 0 / 22%) 0px 25.6px 57.6px 0px, rgb(0 0 0 / 18%) 0px 4.8px 14.4p;
    [role='tablist'] {
        padding-left: 5px;
    }
`;

export const Sidebar = () => {
    return (
        <SidebarWrapper>
            <Pivot aria-label="Sidebar">
                <PivotItem headerText="Items">
                    <ItemList />
                </PivotItem>
                <PivotItem headerText="Settings">
                    <Settings />
                </PivotItem>
            </Pivot>
        </SidebarWrapper>
    );
};
