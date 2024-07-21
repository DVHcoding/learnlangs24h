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
import { UpdateUnitLessonAndGrammarExercisePayloadTypes, UpdateUnitLessonAndVideoLecturePayloadType } from 'types/update.coursesApi.types';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
    }),
    tagTypes: ['Courses'],
    endpoints: (builder) => ({
        // getAllCourses
        getAllCourses: builder.query<AllCoursesResponseType, void>({
            query: () => 'courses',
            providesTags: ['Courses'],
        }),
        // get All Lessons By Course Id
        getAllLessonsByCourseId: builder.query<AllLessonsResponseType, string | null | undefined>({
            query: (id: string) => `lessons/${id}`,
            providesTags: ['Courses'],
        }),
        // get All Unit Lesson By Course Id
        getAllUnitLessonsByCourseId: builder.query<AllUnitLessonsResponseType, string | null | undefined>({
            query: (id) => `unitLessons/${id}`,
            providesTags: ['Courses'],
        }),
        // get All Unit Lesson By Lessons Id
        getAllUnitLessonsByLessonId: builder.query<AllUnitLessonsResponseType, string | null | undefined>({
            query: (id) => `unitLessonsByLessonId/${id}`,
            providesTags: ['Courses'],
        }),
        // get Unit Lesson By Id
        getUnitLessonById: builder.query<UnitLessonResponseType, string | null | undefined>({
            query: (id) => `unitLesson/${id}`,
            providesTags: ['Courses'],
        }),
        // get Video Lecture Content
        getVideoLectureContent: builder.query<VideoLectureContentResponseType, string | null | undefined>({
            query: (id) => `videoLectureContent/${id}`,
            providesTags: ['Courses'],
        }),
        // get Fill Blank Exercise
        getFillBlankExercise: builder.query<FillBlankExerciseResponseType, string | null | undefined>({
            query: (id) => `fillBlankExercise/${id}`,
            providesTags: ['Courses'],
        }),
        getVocaExercise: builder.query<VocaExerciseResponseTypes, string | null | undefined>({
            query: (id) => `course/unitlesson/vocaexercise/${id}`,
            providesTags: ['Courses'],
        }),
        // get User Process Status + populate unitLessonStatus
        getUserProcessStatuses: builder.query<UserProcessStatusResponse, string | undefined | undefined>({
            query: (userId) => `userProcessStatuses/${userId}`,
            providesTags: ['Courses'],
        }),
        getUnitLessonIdByUserProcess: builder.query<GetUnitLessonIdByUserProcessResponseType, GetUnitLessonIdByUserProcessPayload>({
            query: ({ userId, unitLessonId }) => `unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${unitLessonId}`,
            providesTags: ['Courses'],
        }),
        getGrammarExercise: builder.query<GrammarExerciseResponseTypes, string | null | undefined>({
            query: (id) => `course/unitlesson/grammarexercise/${id}`,
            providesTags: ['Courses'],
        }),
        getListenExercise: builder.query<ListenExerciseResponseTypes, string | null | undefined>({
            query: (id) => `course/unitlesson/listenexercise/${id}`,
            providesTags: ['Courses'],
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
            invalidatesTags: ['Courses'],
        }),
        newUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, NewUnitLessonAndGrammarExerciseTypes>({
            query: (payload) => ({
                url: 'course/unitlesson/grammarexercise',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Courses'],
        }),
        /* -------------------------------------------------------------------------- */
        /*                                   UPDATE                                   */
        /* -------------------------------------------------------------------------- */
        updateUnitLessonAndVideoLecture: builder.mutation<MessageResponse, UpdateUnitLessonAndVideoLecturePayloadType>({
            query: (payload) => ({
                url: 'course/unitlesson/videolecture',
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Courses'],
        }),

        updateUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, UpdateUnitLessonAndGrammarExercisePayloadTypes>({
            query: (payload) => ({
                url: `course/unitlesson/grammarexercise`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Courses'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                   DELETE                                   */
        /* -------------------------------------------------------------------------- */
        deleteUnitLessonAndVideoLectureContent: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/videolecture?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Courses'],
        }),
        deleteUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/grammarexercise?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Courses'],
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

    useUpdateUnitLessonAndVideoLectureMutation,
    useUpdateUnitLessonAndGrammarExerciseMutation,

    useDeleteUnitLessonAndVideoLectureContentMutation,
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
