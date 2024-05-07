// ##########################
// #      IMPORT NPM        #
// ##########################
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import { courseApi } from './api/courseApi';
import {
    newCourseReducer,
    newLessonReducer,
    newContentUnitLessonReducer,
    newUnitLessonReducer,
    newUserProcessStatusReducer,
    updateUserProcessStatusReducer,
    updateUnitLessonAndVideoLectureContentReducer,
} from './reducer/courseReducer';

// ##########################
// #    IMPORT Components   #
// ##########################

// ##########################
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        newCourse: newCourseReducer,
        newLesson: newLessonReducer,
        newUnitLesson: newUnitLessonReducer,
        newContentUnitLesson: newContentUnitLessonReducer,
        newUserProcessStatus: newUserProcessStatusReducer,
        updateUnitLessonAndVideoLectureContent: updateUnitLessonAndVideoLectureContentReducer,
        updateUserProcessStatus: updateUserProcessStatusReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, courseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
