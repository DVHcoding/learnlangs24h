// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { NewUnitLessonAndListenExercisePayload, NewUnitLessonAndVocaExercisePayload } from 'types/create.coursesApi.types';
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
import {
    UpdateUnitLessonAndGrammarExercisePayloadTypes,
    UpdateUnitLessonAndListenExercisePayloadTypes,
    UpdateUnitLessonAndVideoLecturePayloadType,
    UpdateUnitLessonAndVocaExercisePayloadTypes,
} from 'types/update.coursesApi.types';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
    }),
    tagTypes: ['Courses', 'Lesson', 'UnitLesson', 'VideoLecture', 'VocabularyLecture', 'Exercise', 'UserProcess'],
    endpoints: (builder) => ({
        // getAllCourses
        getAllCourses: builder.query<AllCoursesResponseType, void>({
            query: () => 'courses',
            providesTags: ['Courses'],
        }),
        // get All Lessons By Course Id
        getAllLessonsByCourseId: builder.query<AllLessonsResponseType, string | null | undefined>({
            query: (id: string) => `lessons/${id}`,
            providesTags: ['Lesson'],
        }),
        // get All Unit Lesson By Course Id
        getAllUnitLessonsByCourseId: builder.query<AllUnitLessonsResponseType, string | null | undefined>({
            query: (id) => `unitLessons/${id}`,
            providesTags: ['UnitLesson'],
        }),
        // get All Unit Lesson By Lessons Id
        getAllUnitLessonsByLessonId: builder.query<AllUnitLessonsResponseType, string | null | undefined>({
            query: (id) => `unitLessonsByLessonId/${id}`,
            providesTags: ['UnitLesson'],
        }),
        // get Unit Lesson By Id
        getUnitLessonById: builder.query<UnitLessonResponseType, string | null | undefined>({
            query: (id) => `unitLesson/${id}`,
            providesTags: ['UnitLesson'],
        }),
        // get Video Lecture Content
        getVideoLectureContent: builder.query<VideoLectureContentResponseType, string | null | undefined>({
            query: (id) => `videoLectureContent/${id}`,
            providesTags: ['VideoLecture'],
        }),
        // get Fill Blank Exercise
        getFillBlankExercise: builder.query<FillBlankExerciseResponseType, string | null | undefined>({
            query: (id) => `fillBlankExercise/${id}`,
            providesTags: ['Exercise'],
        }),
        getVocaExercise: builder.query<VocaExerciseResponseTypes, string | null | undefined>({
            query: (id) => `course/unitlesson/vocaexercise/${id}`,
            providesTags: ['VocabularyLecture'],
        }),
        // get User Process Status + populate unitLessonStatus
        getUserProcessStatuses: builder.query<UserProcessStatusResponse, string | undefined | undefined>({
            query: (userId) => `userProcessStatuses/${userId}`,
            providesTags: ['UserProcess'],
        }),
        getUnitLessonIdByUserProcess: builder.query<GetUnitLessonIdByUserProcessResponseType, GetUnitLessonIdByUserProcessPayload>({
            query: ({ userId, unitLessonId }) => `unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${unitLessonId}`,
            providesTags: ['UnitLesson'],
        }),
        getGrammarExercise: builder.query<GrammarExerciseResponseTypes, string | null | undefined>({
            query: (id) => `course/unitlesson/grammarexercise/${id}`,
            providesTags: ['Exercise'],
        }),
        getListenExercise: builder.query<ListenExerciseResponseTypes, string | null | undefined>({
            query: (id) => `course/unitlesson/listenexercise/${id}`,
            providesTags: ['Exercise'],
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
            invalidatesTags: ['UnitLesson', 'VideoLecture'],
        }),
        newUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, NewUnitLessonAndGrammarExerciseTypes>({
            query: (payload) => ({
                url: 'course/unitlesson/grammarexercise',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['UnitLesson', 'Exercise'],
        }),
        newUnitLessonAndVocaExercise: builder.mutation<MessageResponse, NewUnitLessonAndVocaExercisePayload>({
            query: ({ title, time, icon, lectureType, exerciseType, lesson, course, vocabularies, sentences, audio, audioFile }) => {
                const myForm = new FormData();
                myForm.append('title', title);
                myForm.append('time', time);
                myForm.append('icon', icon);
                myForm.append('lectureType', lectureType);
                myForm.append('exerciseType', exerciseType);
                myForm.append('lesson', lesson);
                myForm.append('course', course);
                myForm.append('vocabularies', JSON.stringify(vocabularies));
                myForm.append('sentences', JSON.stringify(sentences));
                myForm.append('audio', JSON.stringify(audio));
                audioFile.forEach((file: File) => myForm.append('audio', file));

                return {
                    url: 'course/unitlesson/vocaexercise',
                    method: 'POST',
                    body: myForm,
                    formData: true,
                };
            },
            invalidatesTags: ['UnitLesson', 'VocabularyLecture'],
        }),
        newUnitLessonAndListenExercise: builder.mutation<MessageResponse, NewUnitLessonAndListenExercisePayload>({
            query: ({ title, time, icon, lectureType, exerciseType, lesson, course, questionLabel, questions, transcript, audioFile }) => {
                const myForm = new FormData();
                myForm.append('title', title);
                myForm.append('time', time);
                myForm.append('icon', icon);
                myForm.append('lectureType', lectureType);
                myForm.append('exerciseType', exerciseType);
                myForm.append('lesson', lesson);
                myForm.append('course', course);
                myForm.append('questionLabel', questionLabel);
                myForm.append('questions', JSON.stringify(questions));
                myForm.append('transcript', transcript);
                myForm.append('audio', audioFile);

                return {
                    url: 'course/unitlesson/listenexercise',
                    method: 'POST',
                    body: myForm,
                    formData: true,
                };
            },
            invalidatesTags: ['UnitLesson', 'Exercise'],
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
            invalidatesTags: ['UnitLesson', 'VideoLecture'],
        }),

        updateUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, UpdateUnitLessonAndGrammarExercisePayloadTypes>({
            query: (payload) => ({
                url: `course/unitlesson/grammarexercise`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['UnitLesson', 'Exercise'],
        }),
        updateUnitLessonAndVocaExercise: builder.mutation<MessageResponse, UpdateUnitLessonAndVocaExercisePayloadTypes>({
            query: (payload) => ({
                url: 'course/unitlesson/vocaexercise',
                method: 'PATCH',
                body: payload,
            }),
            invalidatesTags: ['UnitLesson', 'VocabularyLecture'],
        }),
        updateUnitLessonAndListenExercise: builder.mutation<MessageResponse, UpdateUnitLessonAndListenExercisePayloadTypes>({
            query: (payload) => ({
                url: 'course/unitlesson/listenexercise',
                method: 'PATCH',
                body: payload,
            }),
            invalidatesTags: ['UnitLesson', 'Exercise'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                   DELETE                                   */
        /* -------------------------------------------------------------------------- */
        deleteUnitLessonAndVideoLectureContent: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/videolecture?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UnitLesson', 'VideoLecture'],
        }),
        deleteUnitLessonAndVocaExercise: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/vocaexercise?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UnitLesson', 'VocabularyLecture'],
        }),
        deleteUnitLessonAndListenExercise: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/listenexercise?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UnitLesson', 'Exercise'],
        }),
        deleteUnitLessonAndGrammarExercise: builder.mutation<MessageResponse, string>({
            query: (unitId) => ({
                url: `course/unitlesson/grammarexercise?unitId=${unitId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UnitLesson', 'Exercise'],
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
    useNewUnitLessonAndVocaExerciseMutation,
    useNewUnitLessonAndListenExerciseMutation,

    useUpdateUnitLessonAndVideoLectureMutation,
    useUpdateUnitLessonAndGrammarExerciseMutation,
    useUpdateUnitLessonAndVocaExerciseMutation,
    useUpdateUnitLessonAndListenExerciseMutation,

    useDeleteUnitLessonAndVideoLectureContentMutation,
    useDeleteUnitLessonAndGrammarExerciseMutation,
    useDeleteUnitLessonAndVocaExerciseMutation,
    useDeleteUnitLessonAndListenExerciseMutation,
} = courseApi;

// providesTags: ['UnitLesson']
// Được sử dụng trong các query endpoints.
// Nó chỉ ra rằng kết quả của query này cung cấp dữ liệu cho tag 'UnitLesson'.
// Nó "đánh dấu" cache với tag này, cho biết cache này chứa dữ liệu liên quan đến 'UnitLesson'.

// invalidatesTags: ['UnitLesson', 'Course', 'Lesson']:

// Thường được sử dụng trong các mutation endpoints.
// Nó chỉ ra rằng khi mutation này thực hiện thành công, nó sẽ làm mất hiệu lực (invalidate) cache của các query có các tag được liệt kê.
// Điều này có nghĩa là các query có providesTags tương ứng sẽ được coi là "cũ" và cần được fetch lại.
