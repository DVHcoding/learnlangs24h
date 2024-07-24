// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

interface Question {
    questionTitle: string;
    options: string[];
    answer: string;
}

interface State {
    title: string;
    questions: Question[];
    transcript: string;
}

const initialState: State = {
    title: '',
    questions: [],
    transcript: '',
};

const listenSlice = createSlice({
    name: 'listenExercise',
    initialState,
    reducers: {
        addTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        addTranscript: (state, action: PayloadAction<string>) => {
            state.transcript = action.payload;
        },
        addQuestion: (state, action: PayloadAction<string>) => {
            state.questions.push({
                questionTitle: action.payload,
                options: [],
                answer: '',
            });
        },
        addOption: (state, action: PayloadAction<{ questionIndex: number; optionText: string }>) => {
            state.questions[action.payload.questionIndex].options.push(action.payload.optionText);
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            state.questions.splice(action.payload, 1);
        },
        removeOption: (state, action: PayloadAction<{ questionIndex: number; optionIndex: number }>) => {
            state.questions[action.payload.questionIndex].options.splice(action.payload.optionIndex, 1);
            state.questions[action.payload.questionIndex].answer = '';
        },
        setAnswer: (state, action: PayloadAction<{ questionIndex: number; answer: string }>) => {
            state.questions[action.payload.questionIndex].answer = action.payload.answer;
        },
    },
});

export const { addTitle, addTranscript, addQuestion, addOption, removeQuestion, removeOption, setAnswer } = listenSlice.actions;
export const listenReducer = listenSlice.reducer;
