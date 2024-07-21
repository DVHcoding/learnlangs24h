/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* ########################################################################## */
/*                              IMPORT COMPONENTS                             */
/* ########################################################################## */
import { QuestionType } from 'types/api-types';

export interface UnitFormsState {
    title: string;
    time: string;
    icon: string;
    course: string;
    lesson: string;
    lectureType: string;
    date: string;
}

export interface VideoLectureState {
    videoUrl: string;
    description: string;
    totalTime: string;
}

export interface FillBlankExerciseState {
    questions: QuestionType[]; // Thay đổi nếu câu hỏi không phải là string
}

export interface AdminUnitLessonState {
    unitForms: UnitFormsState;
    videoLecture: VideoLectureState;
    fillBlankExercise: FillBlankExerciseState;
    exerciseType: string;
}

const initialState: AdminUnitLessonState = {
    unitForms: {
        title: '',
        time: '',
        icon: '',
        course: '',
        lesson: '',
        lectureType: '',
        date: '',
    },
    videoLecture: {
        videoUrl: '',
        description: '',
        totalTime: '',
    },
    fillBlankExercise: {
        questions: [],
    },
    exerciseType: '',
};

export const adminUnitLessonSlice = createSlice({
    name: 'createUnit',
    initialState,
    reducers: {
        changeUnitForms: (state, action: PayloadAction<{ name: keyof UnitFormsState; value: string }>) => {
            const { name, value } = action.payload;
            state.unitForms[name] = value;
        },
        changeEditableForms: (state, action: PayloadAction<Partial<UnitFormsState>>) => {
            // Cập nhật từng trường trong unitForms mà không cần gửi từng cái riêng biệt
            // var obj = { a: 1 };
            // var copy = Object.assign({}, obj);
            // console.log(copy); // { a: 1 }
            Object.assign(state.unitForms, action.payload);
        },
        changeVideoEditForms: (state, action: PayloadAction<Partial<VideoLectureState>>) => {
            // Cập nhật từng trường trong unitForms mà không cần gửi từng cái riêng biệt
            // var obj = { a: 1 };
            // var copy = Object.assign({}, obj);
            // console.log(copy); // { a: 1 }
            Object.assign(state.videoLecture, action.payload);
        },

        changeVideoLecture: (state, action: PayloadAction<{ name: keyof VideoLectureState; value: string }>) => {
            const { name, value } = action.payload;
            state.videoLecture[name] = value;
        },

        changeExerciseType: (state, action: PayloadAction<string>) => {
            state.exerciseType = action.payload;
        },
        addQuestion: (state, action: PayloadAction<QuestionType>) => {
            state.fillBlankExercise.questions.push(action.payload);
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            state.fillBlankExercise.questions.splice(action.payload, 1);
        },
        updateQuestion: (state, action: PayloadAction<{ index: number; question: QuestionType }>) => {
            const { index, question } = action.payload;
            state.fillBlankExercise.questions[index] = question;
        },
        resetForm: () => initialState,
    },
});

export const {
    changeUnitForms,
    changeEditableForms,
    changeVideoEditForms,
    changeVideoLecture,
    changeExerciseType,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    resetForm,
} = adminUnitLessonSlice.actions;
export const adminUnitLessonReducer = adminUnitLessonSlice.reducer;
