// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from 'types/notification.types';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

interface NotificationState {
    notification: Notification[];
}

const initialState: NotificationState = {
    notification: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification[]>) => {
            state.notification = action.payload;
        },
    },
});

export const { addNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
