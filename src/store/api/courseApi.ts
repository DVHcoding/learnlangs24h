// ##########################
// #      IMPORT NPM        #
// ##########################
import {
    AllCoursesResponseType,
    AllLessonsResponseType,
    AllUnitLessonsResponseType,
    FillBlankExerciseResponseType,
    UnitLessonResponseType,
    UserProcessStatusResponse,
    VideoLectureContentResponseType,
} from 'types/api-types';

// ##########################
// #    IMPORT Components   #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        getAllLessonsByCourseId: builder.query<AllLessonsResponseType, string | null>({
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
            query: (id: string) => `videoLectureContent/${id}`,
            providesTags: ['Exercise'],
        }),
        // get Fill Blank Exercise
        getFillBlankExercise: builder.query<FillBlankExerciseResponseType, string>({
            query: (id: string) => `fillBlankExercise/${id}`,
            providesTags: ['Exercise'],
        }),
        // get User Process Status + populate unitLessonStatus
        getUserProcessStatuses: builder.query<UserProcessStatusResponse, string | undefined>({
            query: (userId) => `userProcessStatuses/${userId}`,
            providesTags: ['UnitLesson'],
        }),
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
    useGetUserProcessStatusesQuery,
} = courseApi;
