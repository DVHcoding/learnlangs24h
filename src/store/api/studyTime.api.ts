// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { GetStudyTimeStatsResponse } from 'types/studyTime.types';

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
    }),
});

export const { useGetStudyTimeStatsQuery } = studyTimeApi;
