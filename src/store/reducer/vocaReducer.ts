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
    sentences: Card[];
    vocaPreviews: Card[];
}

const initialState: VocabState = {
    vocabularies: [
        {
            english: '',
            vietnamese: '',
        },
    ],
    sentences: [
        {
            english: '',
            vietnamese: '',
        },
    ],
    vocaPreviews: [],
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
        addSentenceCard: (state) => {
            state.sentences.push({ english: '', vietnamese: '' });
        },
        updateSentenceCard: (state, action: PayloadAction<{ index: number; english: string; vietnamese: string }>) => {
            const { index, english, vietnamese } = action.payload;
            if (state.sentences[index]) {
                state.sentences[index] = { english, vietnamese };
            }
        },
        removeSentenceCard: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.sentences.splice(index, 1);
        },

        updateVocaPreviews: (state, action: PayloadAction<Card[]>) => {
            state.vocaPreviews = action.payload;
        },

        importPreviewsToVocabularies: (state) => {
            state.vocabularies = [...state.vocabularies, ...state.vocaPreviews];
            state.vocaPreviews = []; // Xóa previews sau khi nhập
        },
        importPreviewsToSentences: (state) => {
            state.sentences = [...state.sentences, ...state.vocaPreviews];
            state.vocaPreviews = []; // Xóa previews sau khi nhập
        },
    },
});

const {
    addCard,
    updateCard,
    removeCard,
    addSentenceCard,
    updateSentenceCard,
    removeSentenceCard,
    updateVocaPreviews,
    importPreviewsToVocabularies,
    importPreviewsToSentences,
} = vocaSlice.actions;
const vocaReducer = vocaSlice.reducer;

export {
    addCard,
    updateCard,
    removeCard,
    addSentenceCard,
    updateSentenceCard,
    removeSentenceCard,
    updateVocaPreviews,
    importPreviewsToVocabularies,
    importPreviewsToSentences,
    vocaReducer,
};
