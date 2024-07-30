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
import { vocaReducer } from './reducer/vocaReducer';
import { listenReducer } from './reducer/listenReducer';
import { commentApi } from './api/comment.api';
import { commentReducer } from './reducer/comment.reducer';
import { notificationReducer } from './reducer/notification.reducer';
import { notificationApi } from './api/notification.api';

// ##########################
const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,

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

    vocabularies: vocaReducer,
    listenExercise: listenReducer,

    comments: commentReducer,

    notification: notificationReducer,
});

export default rootReducer;
