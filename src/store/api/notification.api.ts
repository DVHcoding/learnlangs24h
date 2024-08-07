// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { NotificationResponseTypes } from 'types/notification.types';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Notification'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        getAllNotification: builder.query<NotificationResponseTypes, string | undefined>({
            query: (userId) => `notification?userId=${userId}`,
            providesTags: ['Notification'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        markedNotification: builder.mutation<NotificationResponseTypes, string>({
            query: (id) => ({
                url: `notification/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const { useGetAllNotificationQuery, useMarkedNotificationMutation } = notificationApi;
