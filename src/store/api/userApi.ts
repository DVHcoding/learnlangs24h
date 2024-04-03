// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################
// #    IMPORT Components   #
// ##########################

interface APIResponse {
    success: boolean;
    user: {
        username: string;
        email: string;
        createAt: string;
        _id: string;
    };
    message?: string;
    error?: string;
}

interface UserType {
    email: string;
    password: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<APIResponse | any, UserType>({
            query: (userInfo) => ({
                url: 'login',
                method: 'POST',
                body: userInfo,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useLoginUserMutation } = userApi;
