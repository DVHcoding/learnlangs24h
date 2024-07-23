// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
    english: string;
    vietnamese: string;
}

export interface IAudio {
    answer: string;
    otherAnswer: string;
}

interface VocabState {
    vocabularies: Card[];
    sentences: Card[];
    audio: IAudio[];
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
    audio: [],
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

        addAudio: (state, action: PayloadAction<IAudio>) => {
            state.audio.push(action.payload);
        },

        updateAudio: (state, action: PayloadAction<{ index: number; answer: string; otherAnswer: string }>) => {
            const { index, answer, otherAnswer } = action.payload;
            if (state.audio[index]) {
                state.audio[index] = { answer, otherAnswer };
            }
        },
        removeAudio: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.audio.splice(index, 1);
        },
        resetVocaForm: () => initialState,
    },
});

export const {
    addCard,
    updateCard,
    removeCard,
    addSentenceCard,
    updateSentenceCard,
    removeSentenceCard,
    updateVocaPreviews,
    importPreviewsToVocabularies,
    importPreviewsToSentences,
    addAudio,
    removeAudio,
    updateAudio,
    resetVocaForm,
} = vocaSlice.actions;
export const vocaReducer = vocaSlice.reducer;
