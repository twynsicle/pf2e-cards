import styled from '@emotion/styled';
import { Checkbox, FocusZone, FocusZoneDirection, Label, List, SearchBox, Slider } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import React, { Fragment, useState } from 'react';
import { filteredItemNameSelector } from '../../store/features/itemSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addCard, clearAllCards } from '../../store/features/cardSlice';
import { Item } from '../../types';

const ItemWrapper = styled.div``;

const SearchWrapper = styled.div`
    padding: 10px;
`;

const Filters = styled.div``;

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
    const [showConsumables, setShowConsumables] = useState(true);
    const [showPermanent, setShowPermanent] = useState(true);
    const [levelLower, setLevelLower] = React.useState(0);
    //TODO there are items above level 20
    const [levelUpper, setLevelUpper] = React.useState(20);
    const [search, setSearch] = useState<string | undefined>('');

    //TODO show preview on hover
    //TODO persist some of these filters somewhere

    const onSliderChange = (lower: number, upper: number) => {
        setLevelLower(lower);
        setLevelUpper(upper);
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

    // const itemNames: string[] = useAppSelector(itemNameSelector);
    const itemNames: Item[] = useAppSelector((state) =>
        filteredItemNameSelector(state, {
            searchTerm: search?.toLowerCase(),
            showConsumables: showConsumables,
            showPermanent: showPermanent,
            levelLower: levelLower,
            levelUpper: levelUpper,
        })
    );

    return (
        <ItemWrapper>
            <SearchWrapper>
                <SearchBox placeholder="Filter items" onChange={(event, newValue) => setSearch(newValue)} />
                <Filters>
                    <Label>Item Type</Label>
                    <ItemType>
                        <Checkbox
                            label="Consumables"
                            checked={showConsumables}
                            onChange={() => setShowConsumables(!showConsumables)}
                        />

                        <Checkbox
                            label="Permanent"
                            checked={showPermanent}
                            onChange={() => setShowPermanent(!showPermanent)}
                        />
                    </ItemType>
                    <ItemLevel>
                        <Slider
                            ranged
                            label="Item level"
                            min={0}
                            max={20}
                            defaultValue={20}
                            defaultLowerValue={0}
                            onChange={(event, range) => {
                                if (range) {
                                    onSliderChange(range[0], range[1]);
                                }
                            }}
                        />
                    </ItemLevel>
                </Filters>
            </SearchWrapper>
            <ListWrapper>
                <FocusZone direction={FocusZoneDirection.vertical}>
                    <List items={itemNames} onRenderCell={onRenderCell} onShouldVirtualize={() => false} />
                </FocusZone>
            </ListWrapper>
            <DefaultButton text="Clear all" onClick={clearCards}></DefaultButton>
        </ItemWrapper>
    );
};
