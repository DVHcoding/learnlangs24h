// ##########################
// #      IMPORT NPM        #
// ##########################
import { AllCoursesResponseType } from 'types/api-types';

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
    tagTypes: ['Course'],
    endpoints: (builder) => ({
        // getAllCourses
        getAllCourses: builder.query<AllCoursesResponseType, void>({
            query: () => 'courses',
            providesTags: ['Course'],
        }),
    }),
});

export const { useGetAllCoursesQuery } = courseApi;
