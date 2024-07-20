import { toastError, toastInfo } from '@components/Toast/Toasts';
import { createNewUserProcessStatus, updateUserProcessStatus } from '@store/reducer/courseReducer';
import { AppDispatch } from '@store/store';
import { AllLessonsResponseType, AllUnitLessonsResponseType, LessonType, UnitLessonResponseType, UnitLessonType } from 'types/api-types';

interface UnlockUnitLessonProps {
    id: string | null;
    userId: string | undefined;
    unitLesson: UnitLessonResponseType | undefined;
    allUnitLessonData: AllUnitLessonsResponseType | undefined;
    lessons: AllLessonsResponseType | undefined;
    dispatch: AppDispatch;
    userProcessRefetch: () => void;
    unitLessonByUserProcess: any;
}

const unlockUnitLesson = async ({
    id,
    userId,
    unitLesson,
    allUnitLessonData,
    lessons,
    dispatch,
    userProcessRefetch,
    unitLessonByUserProcess,
}: UnlockUnitLessonProps) => {
    if (!userId || !id) {
        return;
    }

    // # Lấy vị trí của unitLesson hiện tại (bại đang học hiện tại)
    const currentUnitLessonIndex = allUnitLessonData?.unitLessons.findIndex((unitLesson: UnitLessonType) => {
        return unitLesson._id === id;
    });

    // id của unitLesson hiện tại
    const currentUnitLessonId = allUnitLessonData?.unitLessons[currentUnitLessonIndex as number]?._id as string;

    // # Lấy id của unitLesson tiếp theo (bài học tiếp theo) dựa vào vị trí của bài học trước + 1
    let nextUnitLessonId = allUnitLessonData?.unitLessons[(currentUnitLessonIndex as number) + 1]?._id;

    try {
        // # Nếu không phải bài cuối thì mở khóa bài tiếp theo
        if (nextUnitLessonId) {
            await dispatch(updateUserProcessStatus({ userId, unitLessonId: id }));
            userProcessRefetch();
            // kiểm tra xem bài tiếp theo đã completed hay unlock chưa
            const { data } = await unitLessonByUserProcess({ userId, unitLessonId: nextUnitLessonId });

            if (data?.success === false) {
                await dispatch(createNewUserProcessStatus({ userId, unitLessonId: nextUnitLessonId }));
                await dispatch(updateUserProcessStatus({ userId, unitLessonId: currentUnitLessonId }));
                userProcessRefetch();
            }
        } else {
            // # Nếu là bài cuối cùng
            // # Lấy vị trí của lesson dựa vào unitLesson bài hiện tại . id của lesson
            const currentLessonIndex = lessons?.lessons.findIndex((lesson: LessonType) => {
                return lesson._id === unitLesson?.unitLesson?.lesson;
            });

            // # Lấy ra id của lesson tiếp theo dựa vào vị trí của lesson trước + 1
            const nextLessonId = lessons?.lessons[(currentLessonIndex as number) + 1]?._id;

            // # Nếu là lesson cuối cùng thi thông báo đã là bài cuối cùng
            if (!nextLessonId) {
                toastInfo('Bạn đã học đến bài cuối cùng!');
                await dispatch(updateUserProcessStatus({ userId, unitLessonId: id }));
                userProcessRefetch();
                return;
            }

            // # Lấy ra tất cả unitLesson của bài tiếp theo dựa vào id lesson mới
            const allUnitLessonWithNextLessonId = allUnitLessonData?.unitLessons.filter((unitLesson: UnitLessonType) => {
                return unitLesson.lesson === nextLessonId;
            });

            // # Gán cho nextUnitLessonId là id của unitLesson vị trí thứ 0 với lesson Id mới
            nextUnitLessonId = allUnitLessonWithNextLessonId?.[0]?._id;

            if (!nextUnitLessonId) {
                toastInfo('Bạn đã học đến bài cuối cùng!');
                await dispatch(updateUserProcessStatus({ userId, unitLessonId: id }));
                userProcessRefetch();
                return;
            }

            if (nextUnitLessonId) {
                await dispatch(updateUserProcessStatus({ userId, unitLessonId: id }));
                userProcessRefetch();
                // kiểm tra xem bài tiếp theo đã completed hay unlock chưa
                const { data } = await unitLessonByUserProcess({ userId, unitLessonId: nextUnitLessonId });

                if (data?.success === false) {
                    await dispatch(createNewUserProcessStatus({ userId, unitLessonId: nextUnitLessonId }));
                    await dispatch(updateUserProcessStatus({ userId, unitLessonId: currentUnitLessonId }));
                    userProcessRefetch();
                }
            }
        }
    } catch (error) {
        toastError('Có lỗi xảy ra!');
    }
};

export { unlockUnitLesson };
