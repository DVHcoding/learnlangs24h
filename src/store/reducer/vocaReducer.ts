// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
    english: string;
    vietnamese: string;
}

interface VocabState {
    vocabularies: Card[];
}

const initialState: VocabState = {
    vocabularies: [
        {
            english: '',
            vietnamese: '',
        },
    ],
};

const vocaSlice = createSlice({
    name: 'vocabularies',
    initialState,
    reducers: {
        addCard: (state) => {
            state.vocabularies.push({ english: '', vietnamese: '' });
        },
        updateCard: (state, action: PayloadAction<{ index: number; english: string; vietnamese: string }>) => {
            const { index, english, vietnamese } = action.payload;
            if (state.vocabularies[index]) {
                state.vocabularies[index] = { english, vietnamese };
            }
        },
        removeCard: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.vocabularies.splice(index, 1);
        },
    },
});

export const { addCard, updateCard, removeCard } = vocaSlice.actions;
export const vocaReducer = vocaSlice.reducer;
