// ##########################
// #      IMPORT NPM        #
// ##########################
import { configureStore } from '@reduxjs/toolkit';

// ##########################
// #    IMPORT Components   #
// ##########################
import { userApi } from './api/userApi';
import { courseApi } from './api/courseApi';
import {
    newCourseReducer,
    newLessonReducer,
    newUnitLessonAndVideoLectureContentReducer,
    newUserProcessStatusReducer,
    updateUserProcessStatusReducer,
    updateUnitLessonAndVideoLectureContentReducer,
    updateUnitLessonAndFillBlankExerciseReducer,
} from './reducer/courseReducer';

// ##########################
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        newCourse: newCourseReducer,
        newLesson: newLessonReducer,
        newUnitLessonAndVideoLectureContent: newUnitLessonAndVideoLectureContentReducer,
        newUserProcessStatus: newUserProcessStatusReducer,
        updateUnitLessonAndVideoLectureContent: updateUnitLessonAndVideoLectureContentReducer,
        updateUnitLessonAndFillBlankExercise: updateUnitLessonAndFillBlankExerciseReducer,
        updateUserProcessStatus: updateUserProcessStatusReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, courseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
