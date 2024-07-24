import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    questionTitle: string;
    options: string[];
    answer: string;
}

interface State {
    questions: Question[];
}

const initialState: State = {
    questions: [],
};

const listenSlice = createSlice({
    name: 'listenExercise',
    initialState,
    reducers: {
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

export const { addQuestion, addOption, removeQuestion, removeOption, setAnswer } = listenSlice.actions;
export const listenReducer = listenSlice.reducer;
