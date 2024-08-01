// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { GetStudyTimeStatsResponse, UpdateStudyTimeResponse } from 'types/studyTime.types';

export const studyTimeApi = createApi({
    reducerPath: 'studyTimeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Stats'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        getStudyTimeStats: builder.query<GetStudyTimeStatsResponse, string | undefined>({
            query: (userId) => `studytime/${userId}`,
            providesTags: ['Stats'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        updateStudyTime: builder.mutation<UpdateStudyTimeResponse, { userId: string; duration: number }>({
            query: ({ userId, duration }) => ({
                url: 'studytime',
                method: 'PATCH',
                body: { userId, duration },
            }),
            invalidatesTags: ['Stats'],
        }),
    }),
});

export const { useGetStudyTimeStatsQuery, useUpdateStudyTimeMutation } = studyTimeApi;
