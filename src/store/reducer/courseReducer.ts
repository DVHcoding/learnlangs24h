// ##########################
// #      IMPORT NPM        #
// ##########################
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastSuccess, toastError } from '@components/Toast/Toasts';
import { MessageResponse, NewCoursePayloadType, NewCourseStateType } from 'types/api-types';

const initialState: NewCourseStateType = {
    loading: false,
    error: null,
    data: null,
};

// Create async thunk for creating a new course
export const createNewCourse = createAsyncThunk(
    'course/createNewCourse',
    async (payload: NewCoursePayloadType, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const response = await axios.post<MessageResponse>(
                '/api/v1/new-course',
                payload,
                config
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Create course slice
export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ##############################
            // #     CREATE NEW COURSE      #
            // ##############################
            .addCase(createNewCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewCourse.fulfilled, (state, action: PayloadAction<MessageResponse>) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Tạo thành công!');
            })
            .addCase(createNewCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
        // ##############################
    },
});

// Export the course reducer
export const courseReducer = courseSlice.reducer;
