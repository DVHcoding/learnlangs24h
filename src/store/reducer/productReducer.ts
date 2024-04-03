// ##########################
// #      IMPORT NPM        #
// ##########################
import { createSlice } from '@reduxjs/toolkit';

// ##########################
// #    IMPORT Components   #
// ##########################

type initialStateType = {
    value: number;
};

const initialState: initialStateType = {
    value: 0,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;
export const productReducer = productSlice.reducer;
