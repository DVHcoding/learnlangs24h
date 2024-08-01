// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { Stats } from 'types/studyTime.types';

interface StudyTimeState {
    stats: Stats;
}

const initialState: StudyTimeState = {
    stats: {
        daily: 0,
        monthly: 0,
        yearly: 0,
    },
};

const studyTimeSlice = createSlice({
    name: 'studyTime',
    initialState,
    reducers: {
        addStats: (state, action: PayloadAction<Stats>) => {
            state.stats = action.payload;
        },
    },
});

export const { addStats } = studyTimeSlice.actions;
export const studyTimeReducer = studyTimeSlice.reducer;
