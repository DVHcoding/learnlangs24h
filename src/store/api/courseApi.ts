// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import {
    AllCoursesResponseType,
    AllLessonsResponseType,
    AllUnitLessonsResponseType,
    FillBlankExerciseResponseType,
    ListenExerciseResponseTypes,
    UnitLessonResponseType,
    UserProcessStatusResponse,
    VideoLectureContentResponseType,
    VocaExerciseResponseTypes,
} from 'types/api-types';
import { GetUnitLessonIdByUserProcessPayload, GetUnitLessonIdByUserProcessResponseType } from 'types/types';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
    }),
    tagTypes: ['Course', 'Lesson', 'UnitLesson', 'Exercise'],
    endpoints: (builder) => ({
        // getAllCourses
        getAllCourses: builder.query<AllCoursesResponseType, void>({
            query: () => 'courses',
            providesTags: ['Course'],
        }),
        // get All Lessons By Course Id
        getAllLessonsByCourseId: builder.query<AllLessonsResponseType, string | undefined>({
            query: (id: string) => `lessons/${id}`,
            providesTags: ['Lesson'],
        }),
        // get All Unit Lesson By Course Id
        getAllUnitLessonsByCourseId: builder.query<AllUnitLessonsResponseType, string | undefined>({
            query: (id) => `unitLessons/${id}`,
            providesTags: ['UnitLesson'],
        }),
        // get All Unit Lesson By Lessons Id
        getAllUnitLessonsByLessonId: builder.query<AllUnitLessonsResponseType, string | undefined>({
            query: (id) => `unitLessonsByLessonId/${id}`,
            providesTags: ['UnitLesson'],
        }),
        // get Unit Lesson By Id
        getUnitLessonById: builder.query<UnitLessonResponseType, string | null>({
            query: (id) => `unitLesson/${id}`,
            providesTags: ['UnitLesson'],
        }),
        // get Video Lecture Content
        getVideoLectureContent: builder.query<VideoLectureContentResponseType, string>({
            query: (id) => `videoLectureContent/${id}`,
            providesTags: ['Exercise'],
        }),
        // get Fill Blank Exercise
        getFillBlankExercise: builder.query<FillBlankExerciseResponseType, string | null>({
            query: (id) => `fillBlankExercise/${id}`,
            providesTags: ['Exercise'],
        }),
        getVocaExercise: builder.query<VocaExerciseResponseTypes, string | null>({
            query: (id) => `course/unitlesson/vocaexercise/${id}`,
        }),
        // get User Process Status + populate unitLessonStatus
        getUserProcessStatuses: builder.query<UserProcessStatusResponse, string | undefined>({
            query: (userId) => `userProcessStatuses/${userId}`,
            providesTags: ['UnitLesson'],
        }),
        getUnitLessonIdByUserProcess: builder.query<GetUnitLessonIdByUserProcessResponseType, GetUnitLessonIdByUserProcessPayload>({
            query: ({ userId, unitLessonId }) => `unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${unitLessonId}`,
            providesTags: ['UnitLesson'],
        }),
        getListenExercise: builder.query<ListenExerciseResponseTypes, string | null>({
            query: (id) => `course/unitlesson/listenexercise/${id}`,
        }),

        /* -------------------------------------------------------------------------- */
        /*                                   CREATE                                   */
        /* -------------------------------------------------------------------------- */
    }),
});

export const {
    useGetAllCoursesQuery,
    useGetAllLessonsByCourseIdQuery,
    useGetAllUnitLessonsByCourseIdQuery,
    useGetAllUnitLessonsByLessonIdQuery,
    useGetUnitLessonByIdQuery,
    useGetVideoLectureContentQuery,
    useGetFillBlankExerciseQuery,
    useGetVocaExerciseQuery,
    useGetUserProcessStatusesQuery,
    useLazyGetUnitLessonIdByUserProcessQuery,
    useGetListenExerciseQuery,
} = courseApi;
