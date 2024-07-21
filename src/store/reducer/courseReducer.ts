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
    NewCoursePayloadType,
    NewCourseStateType,
    NewLessonPayloadType,
    NewUnitLessonAndFillBlankExercisePayloadType,
    NewUnitLessonAndVideoLectureContentPayloadType,
    NewUserProcessStatusPayloadType,
    UpdateLessonPayloadType,
} from 'types/api-types';

const initialState: NewCourseStateType = {
    loading: false,
    error: null,
    data: null,
};

// ##################################
// #      CREATE ASYNC THUNK        #
// ##################################
// Hàm asyncThunk tạo khóa học mới
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

// Hàm asyncThunk tạo lesson mới
export const createNewLesson = createAsyncThunk('course/createNewLesson', async (payload: NewLessonPayloadType, thunkAPI) => {
    try {
        const response = await axios.post<MessageResponse>('/api/v1/new-lesson', payload);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Hàm asyncThunk tạo unitLesson and videoLectureContent
export const createNewUnitLessonAndVideoLectureContent = createAsyncThunk(
    'course/createNewUnitLessonAndVideoLectureContent',
    async (payload: NewUnitLessonAndVideoLectureContentPayloadType, thunkAPI) => {
        try {
            const response = await axios.post<MessageResponse>('/api/v1/newUnitLessonAndVideoLectureContent', payload);

            if (!response.data.success) {
                return thunkAPI.rejectWithValue(response.data.message);
            } else {
                return response.data;
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Hàm asyncThunk tạo unitLesson and fillBlankExercise
export const createNewUnitLessonAndFillBlankExercise = createAsyncThunk(
    'course/createNewUnitLessonAndFillBlankExercise',
    async (payload: NewUnitLessonAndFillBlankExercisePayloadType, thunkAPI) => {
        try {
            const response = await axios.post<MessageResponse>('/api/v1/newUnitLessonAndFillBlankExercise', payload);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Hàm asyncThunk tạo user process status
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

// Update async thunk for updating a user process status
export const updateUserProcessStatus = createAsyncThunk(
    'course/updateUserProcessStatus',
    async (payload: NewUserProcessStatusPayloadType, thunkAPI) => {
        try {
            const response = await axios.put<MessageResponse>('/api/v1/updateUserProcessStatus', payload);
            if (!response.data.success) {
                return thunkAPI.rejectWithValue(response.data.message);
            } else {
                return response.data;
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Update async thunk for updating a lesson
export const updateLesson = createAsyncThunk('course/updateLesson', async (payload: UpdateLessonPayloadType, thunkAPI) => {
    try {
        const response = await axios.put<MessageResponse>('/api/v1/updateLesson', payload);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Hàm asyncThunk xóa lesson và unitLesson
export const deleteLessonAndUnitLesson = createAsyncThunk('course/deleteLessonAndUnitLesson', async (lessonId: string, thunkAPI) => {
    try {
        const response = await axios.delete<MessageResponse>(`/api/v1/deleteLessonAndUnitLesson?lessonId=${lessonId}`);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/* -------------------------------------------------------------------------- */
/*                                CREATE SLICE                                */
/* -------------------------------------------------------------------------- */
// Slice tạo course mới
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

// Slice tạo lesson mới
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

// Slice tạo unitLesson and VideoLectureContent mới
export const newUnitLessonAndVideoLectureContentSlice = createSlice({
    name: 'newUnitLessonAndVideoLectureContent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewUnitLessonAndVideoLectureContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewUnitLessonAndVideoLectureContent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // Đảm bảo message là một thuộc tính của data nếu có
                const successMessage = action.payload?.message || 'Tạo thành công!';
                toastSuccess(successMessage);
            })
            .addCase(createNewUnitLessonAndVideoLectureContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError(action.payload ? action.payload.toString() : 'Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Slice tạo unitLesson and VideoLectureContent mới
export const newUnitLessonAndFillBlankExerciseSlice = createSlice({
    name: 'newUnitLessonAndFillBlankExercise',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewUnitLessonAndFillBlankExercise.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewUnitLessonAndFillBlankExercise.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Tạo thành công!');
            })
            .addCase(createNewUnitLessonAndFillBlankExercise.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Slice tạo User Process Status mới
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

/* -------------------------------------------------------------------------- */
/*                                UPDATE SLICE                                */
/* -------------------------------------------------------------------------- */

// Update UserProcessStatusSlice
export const updateUserProcessStatusSlice = createSlice({
    name: 'updateUserProcessStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProcessStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProcessStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Bài mới đã được mở khóa!');
            })
            .addCase(updateUserProcessStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Update Lesson Slice
export const updateLessonSlice = createSlice({
    name: 'updateLesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Cập nhật thành công!');
            })
            .addCase(updateLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

/* -------------------------------------------------------------------------- */
/*                                DELETE SLICE                                */
/* -------------------------------------------------------------------------- */

// Delete LessonAndUnitLesson Slice
export const deleteLessonAndUnitLessonSlice = createSlice({
    name: 'deleteLessonAndUnitLesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteLessonAndUnitLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLessonAndUnitLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toastSuccess('Xóa thành công!');
            })
            .addCase(deleteLessonAndUnitLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : 'Unknown error';
                toastError('Có lỗi xảy ra. Vui lòng thử lại!');
            });
    },
});

// Export the course reducer
export const newCourseReducer = newCourseSlice.reducer;
export const newLessonReducer = newLessonSlice.reducer;
export const newUnitLessonAndVideoLectureContentReducer = newUnitLessonAndVideoLectureContentSlice.reducer;
export const newUnitLessonAndFillBlankExerciseReducer = newUnitLessonAndFillBlankExerciseSlice.reducer;
export const newUserProcessStatusReducer = newUserProcessStatusSlice.reducer;

export const updateUserProcessStatusReducer = updateUserProcessStatusSlice.reducer;
export const updateLessonReducer = updateLessonSlice.reducer;

export const deleteLessonAndUnitLessonReducer = deleteLessonAndUnitLessonSlice.reducer;
