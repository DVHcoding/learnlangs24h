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

interface PictureOptions {
    image: {
        public_id: string;
        url: string;
    };
    text: string;
}

interface QuestionPictures {
    questionTitle: string;
    options: PictureOptions[];
    answer: string;
}

interface State {
    title: string;
    questions: Question[];
    questionsPictures: QuestionPictures[];
    transcript: string;
}

const initialState: State = {
    title: '',
    questions: [],
    questionsPictures: [],
    transcript: '',
};

const listenSlice = createSlice({
    name: 'listenExercise',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<any>) => {
            state.questions = action.payload;
        },
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
        /* -------------------------------------------------------------------------- */
        /*                                PICTURES TEST                               */
        /* -------------------------------------------------------------------------- */
        addPictureQuestion: (state, action: PayloadAction<string>) => {
            state.questionsPictures.push({
                questionTitle: action.payload,
                options: [],
                answer: '',
            });
        },
        addPictureOption: (state, action: PayloadAction<{ questionIndex: number; pictureOption: PictureOptions }>) => {
            state.questionsPictures[action.payload.questionIndex].options.push(action.payload.pictureOption);
        },
        updatePictureOption: (
            state,
            action: PayloadAction<{
                questionIndex: number;
                optionIndex: number;
                image: { public_id: string; url: string };
            }>
        ) => {
            const { questionIndex, optionIndex, image } = action.payload;
            state.questionsPictures[questionIndex].options[optionIndex].image = image;
        },
        removePictureQuestion: (state, action: PayloadAction<number>) => {
            state.questionsPictures.splice(action.payload, 1);
        },
        removePictureOption: (state, action: PayloadAction<{ questionIndex: number; optionIndex: number }>) => {
            state.questionsPictures[action.payload.questionIndex].options.splice(action.payload.optionIndex, 1);
            state.questionsPictures[action.payload.questionIndex].answer = '';
        },
        setPictureAnswer: (state, action: PayloadAction<{ questionIndex: number; answer: string }>) => {
            state.questionsPictures[action.payload.questionIndex].answer = action.payload.answer;
        },
    },
});

export const {
    setQuestions,
    addTitle,
    addTranscript,
    addQuestion,
    addOption,
    removeQuestion,
    removeOption,
    setAnswer,

    addPictureQuestion,
    addPictureOption,
    removePictureQuestion,
    removePictureOption,
    setPictureAnswer,
    updatePictureOption,
} = listenSlice.actions;
export const listenReducer = listenSlice.reducer;
