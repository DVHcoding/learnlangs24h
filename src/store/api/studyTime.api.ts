// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import {
    GetStudyTimeByMonthResponse,
    GetStudyTimeStatsResponse,
    GetTopUserByStudyTimeResponse,
    UpdateStudyTimeResponse,
} from 'types/studyTime.types';

export const studyTimeApi = createApi({
    reducerPath: 'studyTimeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Stats', 'TopUser'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        getStudyTimeStats: builder.query<GetStudyTimeStatsResponse, string | undefined>({
            query: (userId) => `studytime/${userId}`,
            providesTags: ['Stats'],
        }),
        getStudyTimeByMonth: builder.query<GetStudyTimeByMonthResponse, { userId: string | null | undefined; month: number; year: number }>(
            {
                query: ({ userId, month, year }) => `studytime/month/time?userId=${userId}&month=${month}&year=${year}`,
                providesTags: ['Stats'],
            }
        ),
        getTopUserByStudyTime: builder.query<GetTopUserByStudyTimeResponse, { month: number; year: number }>({
            query: ({ month, year }) => `studytime/month/top?&month=${month}&year=${year}`,
            providesTags: ['TopUser'],
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

export const { useGetStudyTimeStatsQuery, useGetTopUserByStudyTimeQuery, useGetStudyTimeByMonthQuery, useUpdateStudyTimeMutation } =
    studyTimeApi;
