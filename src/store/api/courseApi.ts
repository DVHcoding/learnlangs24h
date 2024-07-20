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
    GrammarExerciseResponseTypes,
    ListenExerciseResponseTypes,
    MessageResponse,
    NewUnitLessonAndGrammarExerciseTypes,
    NewUnitLessonAndVideoLectureContentPayloadType,
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
        getGrammarExercise: builder.query<GrammarExerciseResponseTypes, string | null>({
            query: (id) => `course/unitlesson/grammarexercise/${id}`,
        }),
        getListenExercise: builder.query<ListenExerciseResponseTypes, string | null>({
            query: (id) => `course/unitlesson/listenexercise/${id}`,
        }),

        /* -------------------------------------------------------------------------- */
        /*                                   CREATE                                   */
        /* -------------------------------------------------------------------------- */
        newUnitLessonAndVideoLectureContent: builder.mutation<MessageResponse, NewUnitLessonAndVideoLectureContentPayloadType>({
            query: (payload) => ({
                url: 'newUnitLessonAndVideoLectureContent',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['UnitLesson', 'Lesson', 'Exercise'],
        }),
        newUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, NewUnitLessonAndGrammarExerciseTypes>({
            query: (payload) => ({
                url: 'course/unitlesson/grammarexercise',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['UnitLesson', 'Lesson', 'Exercise'],
        }),
        /* -------------------------------------------------------------------------- */
        /*                                   UPDATE                                   */
        /* -------------------------------------------------------------------------- */

        /* -------------------------------------------------------------------------- */
        /*                                   DELETE                                   */
        /* -------------------------------------------------------------------------- */
        deleteUnitLessonAndVideoLectureContentSlice: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/videolecture?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UnitLesson', 'Lesson', 'Exercise'],
        }),
        deleteUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/grammarexercise?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UnitLesson', 'Lesson', 'Exercise'],
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
    useGetVocaExerciseQuery,
    useGetUserProcessStatusesQuery,
    useLazyGetUnitLessonIdByUserProcessQuery,
    useGetGrammarExerciseQuery,
    useGetListenExerciseQuery,

    useNewUnitLessonAndVideoLectureContentMutation,
    useNewUnitLessonAndGrammarExerciseMutation,

    useDeleteUnitLessonAndVideoLectureContentSliceMutation,
    useDeleteUnitLessonAndGrammarExerciseMutation,
} = courseApi;

// providesTags: ['UnitLesson']
// Được sử dụng trong các query endpoints.
// Nó chỉ ra rằng kết quả của query này cung cấp dữ liệu cho tag 'UnitLesson'.
// Nó "đánh dấu" cache với tag này, cho biết cache này chứa dữ liệu liên quan đến 'UnitLesson'.

// invalidatesTags: ['UnitLesson', 'Course', 'Lesson']:

// Thường được sử dụng trong các mutation endpoints.
// Nó chỉ ra rằng khi mutation này thực hiện thành công, nó sẽ làm mất hiệu lực (invalidate) cache của các query có các tag được liệt kê.
// Điều này có nghĩa là các query có providesTags tương ứng sẽ được coi là "cũ" và cần được fetch lại.
