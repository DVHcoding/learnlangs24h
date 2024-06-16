// ##########################
// #      IMPORT NPM        #
// ##########################
import { configureStore } from '@reduxjs/toolkit';

// ##########################
// #    IMPORT Components   #
// ##########################
import { userApi } from './api/userApi';
import { courseApi } from './api/courseApi';
import { chatApi } from './api/chatApi';
import {
    newCourseReducer,
    newLessonReducer,
    newUnitLessonAndVideoLectureContentReducer,
    newUserProcessStatusReducer,
    newUnitLessonAndFillBlankExerciseReducer,
    // ######################################
    updateUserProcessStatusReducer,
    updateUnitLessonAndVideoLectureContentReducer,
    updateUnitLessonAndFillBlankExerciseReducer,
    updateLessonReducer,
    // ######################################
    deleteUnitLessonAndVideoLectureContentReducer,
    deleteUnitLessonAndFillBlankExerciseReducer,
    deleteLessonAndUnitLessonReducer,
} from './reducer/courseReducer';

// ##########################
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,

        newCourse: newCourseReducer,
        newLesson: newLessonReducer,
        newUnitLessonAndVideoLectureContent: newUnitLessonAndVideoLectureContentReducer,
        newUnitLessonAndFillBlankExercise: newUnitLessonAndFillBlankExerciseReducer,
        newUserProcessStatus: newUserProcessStatusReducer,

        updateUnitLessonAndVideoLectureContent: updateUnitLessonAndVideoLectureContentReducer,
        updateUnitLessonAndFillBlankExercise: updateUnitLessonAndFillBlankExerciseReducer,
        updateUserProcessStatus: updateUserProcessStatusReducer,
        updateLesson: updateLessonReducer,

        deleteUnitLessonAndVideoLectureContent: deleteUnitLessonAndVideoLectureContentReducer,
        deleteUnitLessonAndFillBlankExercise: deleteUnitLessonAndFillBlankExerciseReducer,
        deleteLessonAndUnitLesson: deleteLessonAndUnitLessonReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, courseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
