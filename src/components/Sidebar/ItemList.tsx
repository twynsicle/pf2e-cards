import styled from '@emotion/styled';
import { Checkbox, FocusZone, FocusZoneDirection, Label, List, SearchBox, Slider } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import React, { Fragment, useState } from 'react';
import {
    filteredItemNameSelector,
    filterSelector,
    setSearchTerm,
    setShowConsumable,
    setShowPermanent,
    setLevelLower,
    setLevelUpper,
} from '../../store/features/itemSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addCard, cardSelector, clearAllCards } from '../../store/features/cardSlice';
import { Item, ItemCard, Filters } from '../../types';

const ItemWrapper = styled.div``;

const SearchWrapper = styled.div`
    padding: 10px;
`;

const FiltersWrapper = styled.div``;

const ItemType = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;

    .ms-Checkbox {
        margin: 0 10px 0 0;
    }
`;

const ItemLevel = styled.div`
    //margin-bottom: -10px;

    .ms-Slider .ms-Slider-container label {
        width: 20px;
    }
`;

//TODO make max-height a calculation
const ListWrapper = styled.div`
    //background-color: #555;
    padding: 0 10px 10px 10px;
    margin-bottom: 10px;
    height: 80vh;
    max-height: 70vh;
    overflow: hidden auto;
`;

const ListItem = styled.div`
    padding: 2px 0 2px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    color: black;
    font-size: 12px;
`;

export const ItemList = () => {
    const dispatch = useAppDispatch();

    const filters: Filters = useAppSelector((state) => filterSelector(state));
    const itemList: Item[] = useAppSelector((state) => filteredItemNameSelector(state));

    //TODO show preview on hover
    //TODO show empty message when no resuls

    const onSliderChange = (lower: number, upper: number) => {
        dispatch(setLevelLower(lower));
        dispatch(setLevelUpper(upper));
    };

    function clearCards() {
        dispatch(clearAllCards());
    }

    function addItem(item: Item) {
        dispatch(addCard(item));
    }

    const onRenderCell = React.useCallback((item: Item | undefined, index: number | undefined) => {
        if (!item) {
            return null;
        }
        return (
            <ListItem data-is-focusable="true" onClick={() => addItem(item)}>
                <span>{item?.name}</span>
                <span>{item?.level}</span>
            </ListItem>
        );
    }, []);

    return (
        <ItemWrapper>
            <SearchWrapper>
                <SearchBox
                    placeholder="Filter items"
                    value={filters.searchTerm}
                    onChange={(event, newValue) => dispatch(setSearchTerm(newValue))}
                />
                <FiltersWrapper>
                    <Label>Item Type</Label>
                    <ItemType>
                        <Checkbox
                            label="Consumable"
                            checked={filters.showConsumable}
                            onChange={(event, newValue) => {
                                dispatch(setShowConsumables(newValue ?? false));
                            }}
                        />

                        <Checkbox
                            label="Permanent"
                            checked={filters.showPermanent}
                            onChange={(event, newValue) => {
                                dispatch(setShowPermanent(newValue ?? false));
                            }}
                        />
                    </ItemType>
                    <ItemLevel>
                        <Slider
                            ranged
                            label="Item level"
                            min={0}
                            max={20}
                            defaultValue={filters.levelUpper}
                            defaultLowerValue={filters.levelLower}
                            onChanged={(event, number, range) => {
                                if (range) {
                                    onSliderChange(range[0], range[1]);
                                }
                            }}
                        />
                    </ItemLevel>
                </FiltersWrapper>
            </SearchWrapper>
            <ListWrapper>
                <FocusZone direction={FocusZoneDirection.vertical}>
                    <List items={itemList} onRenderCell={onRenderCell} onShouldVirtualize={() => false} />
                </FocusZone>
            </ListWrapper>
            <DefaultButton text="Clear all" onClick={clearCards}></DefaultButton>
        </ItemWrapper>
    );
};
