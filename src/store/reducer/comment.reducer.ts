// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from 'types/comment.types';

interface CommentState {
    comments: CommentType[];
}

const initialState: CommentState = {
    comments: [],
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComments: (state, action: PayloadAction<CommentType[]>) => {
            state.comments = action.payload;
        },
    },
});

export const { addComments } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
