/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { createSlice } from '@reduxjs/toolkit';

/* ########################################################################## */
/*                              IMPORT COMPONENTS                             */
/* ########################################################################## */

const initialState = {
    notificationCount: parseInt(localStorage.getItem('notificationCount') || '0', 10) || 0,
    uploadingLoader: false,
};

export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        increaseNotification: (state) => {
            state.notificationCount += 1;
            localStorage.setItem('notificationCount', state.notificationCount.toString());
        },
        decreaseNotification: (state) => {
            state.notificationCount -= 1;
            if (state.notificationCount < 0) {
                state.notificationCount = 0;
            }
            localStorage.setItem('notificationCount', state.notificationCount.toString());
        },
        resetNotification: (state) => {
            state.notificationCount = 0;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
    },
});

export const { increaseNotification, decreaseNotification, resetNotification, setUploadingLoader } = miscSlice.actions;
export const miscReducer = miscSlice.reducer;
