// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################
// #    IMPORT Components   #
// ##########################

interface APIResponse {
    success: boolean;
    message?: string;
    user: RegisterUserType;
}

interface LoginUserType {
    email: string;
    password: string;
}

interface RegisterUserType {
    username: string;
    email: string;
    password: string;
    photo: {
        public_id: string;
        url: string;
    };
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
        registerUser: builder.mutation<APIResponse, RegisterUserType>({
            query: (registerUserInfo) => ({
                url: 'register',
                method: 'POST',
                body: registerUserInfo,
            }),
            invalidatesTags: ['User'],
        }),

        // LoginUser
        loginUser: builder.mutation<APIResponse, LoginUserType>({
            query: (userInfo) => ({
                url: 'login',
                method: 'POST',
                body: userInfo,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
