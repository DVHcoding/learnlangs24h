// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { combineReducers } from '@reduxjs/toolkit';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { userApi } from '@store/api/userApi';
import { courseApi } from '@store/api/courseApi';
import { chatApi } from '@store/api/chatApi';
import {
    newCourseReducer,
    newLessonReducer,
    newUnitLessonAndVideoLectureContentReducer,
    newUserProcessStatusReducer,
    newUnitLessonAndFillBlankExerciseReducer,
    // ######################################
    updateUserProcessStatusReducer,
    updateLessonReducer,
    // ######################################
    deleteLessonAndUnitLessonReducer,
} from './reducer/courseReducer';
import { miscReducer } from './reducer/miscReducer';
import { adminUnitLessonReducer } from './reducer/adminUnitLessonReducer';

// ##########################
const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,

    newCourse: newCourseReducer,
    newLesson: newLessonReducer,
    newUnitLessonAndVideoLectureContent: newUnitLessonAndVideoLectureContentReducer,
    newUnitLessonAndFillBlankExercise: newUnitLessonAndFillBlankExerciseReducer,
    newUserProcessStatus: newUserProcessStatusReducer,

    updateUserProcessStatus: updateUserProcessStatusReducer,
    updateLesson: updateLessonReducer,

    deleteLessonAndUnitLesson: deleteLessonAndUnitLessonReducer,

    misc: miscReducer,
    adminUnitLesson: adminUnitLessonReducer,
});

export default rootReducer;
