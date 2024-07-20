import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { courseApi } from '@store/api/courseApi';
import { RootState } from '@store/store'; // Đảm bảo import RootState từ file store của bạn

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(
        courseApi.endpoints.newUnitLessonAndVideoLectureContent.matchFulfilled
        // Thêm các mutation khác nếu cần
    ),
    // effect: (action, listenerApi)
    effect: (_, listenerApi) => {
        // Lấy toàn bộ state hiện tại
        const state = listenerApi.getState() as RootState;

        try {
            // Lấy dữ liệu persist:root hiện tại từ localStorage
            const persistRootString = localStorage.getItem('persist:root');
            if (!persistRootString) return;

            const persistRoot = JSON.parse(persistRootString) as Record<string, string>;

            // Cập nhật phần courseApi trong persist:root
            persistRoot[courseApi.reducerPath] = JSON.stringify(state[courseApi.reducerPath]);

            // Lưu lại persist:root đã cập nhật vào localStorage
            localStorage.setItem('persist:root', JSON.stringify(persistRoot));
        } catch (error) {
            console.error('Failed to update persist:root in localStorage', error);
        }
    },
});

export { listenerMiddleware };
