// ##########################
// #      IMPORT NPM        #
// ##########################
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastSuccess, toastError } from '@components/Toast/Toasts';
import {
    MessageResponse,
    NewContentUnitLessonPayloadType,
    NewCoursePayloadType,
    NewCourseStateType,
    NewLessonPayloadType,
    NewUnitLessonPayloadType,
    NewUserProcessStatusPayloadType,
} from 'types/api-types';

const initialState: NewCourseStateType = {
    loading: false,
    error: null,
    data: null,
};

// ##################################
// #      CREATE ASYNC THUNK        #
// ##################################
// Create async thunk for creating a new course
export const createNewCourse = createAsyncThunk('course/createNewCourse', async (payload: NewCoursePayloadType, thunkAPI) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axios.post<MessageResponse>('/api/v1/new-course', payload, config);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Create async thunk for creating a new lesson
export const createNewLesson = createAsyncThunk('course/createNewLesson', async (payload: NewLessonPayloadType, thunkAPI) => {
    try {
        const response = await axios.post<MessageResponse>('/api/v1/new-lesson', payload);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Create async thunk for creating a new unit lesson
export const createNewUnitLesson = createAsyncThunk('course/createNewUnitLesson', async (payload: NewUnitLessonPayloadType, thunkAPI) => {
    try {
        const response = await axios.post<MessageResponse>('/api/v1/new-unitLesson', payload);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Create async thunk for creating a new content unit lesson
export const createNewContentUnitLesson = createAsyncThunk(
    'course/createNewContentUnitLesson',
    async (payload: NewContentUnitLessonPayloadType, thunkAPI) => {
        try {
            const response = await axios.post<MessageResponse>('/api/v1/new-content-unitLesson', payload);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Create async thunk for creating a new user process status
export const createNewUserProcessStatus = createAsyncThunk(
    'course/createNewUserProcessStatus',
    async (payload: NewUserProcessStatusPayloadType, thunkAPI) => {
        try {
            const response = await axios.post<MessageResponse>('/api/v1/newUserProcessStatus', payload);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// ##########################
// #         SLICE          #
// ##########################
// Create new course slice
export const newCourseSlice = createSlice({
    name: 'newCourse',
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

// Create new lesson slice
export const newLessonSlice = createSlice({
    name: 'newLesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Tạo thành công!');
            })
            .addCase(createNewLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Create new unit lesson slice
export const newUnitLessonSlice = createSlice({
    name: 'newUnitLesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewUnitLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewUnitLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Tạo thành công!');
            })
            .addCase(createNewUnitLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Create new content unit lesson slice
export const newContentUnitLessonSlice = createSlice({
    name: 'newContentUnitLesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewContentUnitLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewContentUnitLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Tạo thành công!');
            })
            .addCase(createNewContentUnitLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Create new User Process Status slice
export const newUserProcessStatusSlice = createSlice({
    name: 'newUserProcessStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewUserProcessStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewUserProcessStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createNewUserProcessStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Export the course reducer
export const newCourseReducer = newCourseSlice.reducer;
export const newLessonReducer = newLessonSlice.reducer;
export const newUnitLessonReducer = newUnitLessonSlice.reducer;
export const newContentUnitLessonReducer = newContentUnitLessonSlice.reducer;
export const newUserProcessStatusReducer = newUserProcessStatusSlice.reducer;
