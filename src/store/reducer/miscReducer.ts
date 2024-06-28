/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { createSlice } from '@reduxjs/toolkit';

/* ########################################################################## */
/*                              IMPORT COMPONENTS                             */
/* ########################################################################## */

const initialState = {
    notificationCount: 0,
};

export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        increaseNotification: (state) => {
            state.notificationCount += 1;
        },
        decreaseNotification: (state, action) => {
            state.notificationCount -= action.payload;
        },
        resetNotification: (state) => {
            state.notificationCount = 0;
        },
    },
});

export const { increaseNotification, decreaseNotification, resetNotification } = miscSlice.actions;
export const miscReducer = miscSlice.reducer;
