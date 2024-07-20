/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionType } from 'types/api-types';

/* ########################################################################## */
/*                              IMPORT COMPONENTS                             */
/* ########################################################################## */

export interface UnitFormsState {
    title: string;
    time: string;
    icon: string;
    course: string;
    lesson: string;
    lectureType: string;
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

export const { changeUnitForms, changeVideoLecture, changeExerciseType, addQuestion, deleteQuestion, updateQuestion, resetForm } =
    adminUnitLessonSlice.actions;
export const adminUnitLessonReducer = adminUnitLessonSlice.reducer;
