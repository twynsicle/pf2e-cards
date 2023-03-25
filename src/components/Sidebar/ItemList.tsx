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
    setItems,
} from '../../store/features/itemSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addCard, cardSelector, clearAllCards } from '../../store/features/cardSlice';
import { Item, ItemCard, Filters } from '../../types';
import { Card } from '../Card/Card';
import { displayPreviewSelector } from '../../store/features/settingsSlice';
import { CardPreview } from './CardPreview/CardPreview';
import { useGetItemsQuery } from '../../store/services/item';

const ItemWrapper = styled.div`
    padding: 10px 0 0 0;
    height: calc(100vh - 44px);
    position: relative;
`;

const ErrorState = styled.div`
    padding: 20px 10px 0;
    color: black;
`;

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
    padding: 0px 10px 10px 10px;
    max-height: 70vh;
    overflow: hidden auto;
`;

const NoMatch = styled.div`
    color: #555;
    font-size: 14px;
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

    const { data, error, isLoading } = useGetItemsQuery();
    // const data = null;
    // const error = {};
    // const isLoading = false;

    if (isLoading) {
        return <ErrorState>Loading...</ErrorState>;
    }

    if (error || !data) {
        return <ErrorState>Failed to load cards</ErrorState>;
    }

    dispatch(setItems(data));

    return <ItemListContents />;
};

const ItemListContents = () => {
    const dispatch = useAppDispatch();

    const [previewCard, setPreviewCard] = useState<Item | null>(null);
    const filters: Filters = useAppSelector((state) => filterSelector(state));
    const itemList: Item[] = useAppSelector((state) => filteredItemNameSelector(state));
    const displayPreviewSetting = useAppSelector(displayPreviewSelector);

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
            <ListItem
                data-is-focusable="true"
                onClick={() => addItem(item)}
                onMouseEnter={() => {
                    setPreviewCard(item);
                }}
                onMouseLeave={() => {
                    setPreviewCard(null);
                }}
            >
                <span>{item?.name}</span>
                <span>{item?.level}</span>
            </ListItem>
        );
    }, []);

    return (
        <ItemWrapper>
            <CardPreview display={Boolean(previewCard) && displayPreviewSetting} item={previewCard} />
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
                                dispatch(setShowConsumable(newValue ?? false));
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
                    {itemList.length === 0 && <NoMatch>No items match your filters</NoMatch>}
                    <List items={itemList} onRenderCell={onRenderCell} onShouldVirtualize={() => false} />
                </FocusZone>
            </ListWrapper>
            <DefaultButton
                style={{ width: 'calc(100% - 20px)', margin: '0 10px', position: 'absolute', bottom: '10px' }}
                text="Clear all"
                onClick={clearCards}
            ></DefaultButton>
        </ItemWrapper>
    );
};
