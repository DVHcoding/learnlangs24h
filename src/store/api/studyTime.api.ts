// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import {
    GetStudyTimeByMonthResponse,
    GetStudyTimeCalendarResponse,
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
        getStudyTimeCalendar: builder.query<GetStudyTimeCalendarResponse, { userId: string | null | undefined; year: number }>({
            query: ({ userId, year }) => `studytime/calendar/stats?userId=${userId}&year=${year}`,
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

export const {
    useGetStudyTimeStatsQuery,
    useGetTopUserByStudyTimeQuery,
    useGetStudyTimeByMonthQuery,
    useGetStudyTimeCalendarQuery,
    useUpdateStudyTimeMutation,
} = studyTimeApi;
