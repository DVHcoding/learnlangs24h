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
    updateUnitLessonAndVideoLectureContentReducer,
    updateUnitLessonAndFillBlankExerciseReducer,
    updateLessonReducer,
    // ######################################
    deleteUnitLessonAndVideoLectureContentReducer,
    deleteUnitLessonAndFillBlankExerciseReducer,
    deleteLessonAndUnitLessonReducer,
} from './reducer/courseReducer';
import { miscReducer } from './reducer/miscReducer';

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

    updateUnitLessonAndVideoLectureContent: updateUnitLessonAndVideoLectureContentReducer,
    updateUnitLessonAndFillBlankExercise: updateUnitLessonAndFillBlankExerciseReducer,
    updateUserProcessStatus: updateUserProcessStatusReducer,
    updateLesson: updateLessonReducer,

    deleteUnitLessonAndVideoLectureContent: deleteUnitLessonAndVideoLectureContentReducer,
    deleteUnitLessonAndFillBlankExercise: deleteUnitLessonAndFillBlankExerciseReducer,
    deleteLessonAndUnitLesson: deleteLessonAndUnitLessonReducer,

    misc: miscReducer,
});

export default rootReducer;
