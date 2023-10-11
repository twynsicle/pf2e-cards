import styled from '@emotion/styled';
import { FocusZone, FocusZoneDirection, Label, List, SearchBox, Slider } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import React, { useState } from 'react';
import {
    filterSelector,
    setSearchTerm,
    setLevelLower,
    setLevelUpper,

} from '../../store/features/spellSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addCard, clearAllCards } from '../../store/features/cardSlice';
import { Filters, Spell } from "../../types";
import { displayPreviewSelector } from '../../store/features/settingsSlice';
import { CardPreview } from './CardPreview/CardPreview';
import { useGetSpellsQuery } from "../../store/services/spell";
import { filteredSpellNameSelector, setSpells } from "../../store/features/spellSlice";

const SpellWrapper = styled.div`
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

const SpellLevel = styled.div`
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

export const SpellList = () => {
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetSpellsQuery();
    // const data = null;
    // const error = {};
    // const isLoading = false;

    if (isLoading) {
        return <ErrorState>Loading...</ErrorState>;
    }

    if (error || !data) {
        return <ErrorState>Failed to load cards</ErrorState>;
    }

    dispatch(setSpells(data));

    return <SpellListContents />;
};

const SpellListContents = () => {
    const dispatch = useAppDispatch();

    const [previewCard, setPreviewCard] = useState<Spell | null>(null);
    const filters: Filters = useAppSelector((state) => filterSelector(state));
    const spellList: Spell[] = useAppSelector((state) => filteredSpellNameSelector(state));
    const displayPreviewSetting = useAppSelector(displayPreviewSelector);

    const onSliderChange = (lower: number, upper: number) => {
        dispatch(setLevelLower(lower));
        dispatch(setLevelUpper(upper));
    };

    function clearCards() {
        dispatch(clearAllCards());
    }

    function addSpell(spell: Spell) {
        dispatch(addCard(spell));
    }

    const onRenderCell = React.useCallback((spell: Spell | undefined, index: number | undefined) => {
        if (!spell) {
            return null;
        }
        return (
            <ListItem
                data-is-focusable="true"
                onClick={() => addSpell(spell)}
                onMouseEnter={() => {
                    setPreviewCard(spell);
                }}
                onMouseLeave={() => {
                    setPreviewCard(null);
                }}
            >
                <span>{spell?.name}</span>
                <span>{spell?.level}</span>
            </ListItem>
        );
    }, []);

    return (
        <SpellWrapper>
            <CardPreview display={Boolean(previewCard) && displayPreviewSetting} card={previewCard} />
            <SearchWrapper>
                <SearchBox
                    placeholder="Filter spells"
                    value={filters.searchTerm}
                    onChange={(event, newValue) => dispatch(setSearchTerm(newValue))}
                />
                <FiltersWrapper>
                    <Label>Item Type</Label>
                    <SpellLevel>
                        <Slider
                            ranged
                            label="Item level"
                            min={1}
                            max={10}
                            defaultValue={filters.levelUpper}
                            defaultLowerValue={filters.levelLower}
                            onChanged={(event, number, range) => {
                                if (range) {
                                    onSliderChange(range[0], range[1]);
                                }
                            }}
                        />
                    </SpellLevel>
                </FiltersWrapper>
            </SearchWrapper>
            <ListWrapper>
                <FocusZone direction={FocusZoneDirection.vertical}>
                    {spellList.length === 0 && <NoMatch>No spells match your filters</NoMatch>}
                    <List items={spellList} onRenderCell={onRenderCell} onShouldVirtualize={() => true} />
                </FocusZone>
            </ListWrapper>
            <DefaultButton
                style={{ width: 'calc(100% - 20px)', margin: '0 10px', position: 'absolute', bottom: '10px' }}
                text="Clear all"
                onClick={clearCards}
            ></DefaultButton>
        </SpellWrapper>
    );
};
