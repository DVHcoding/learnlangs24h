// ##########################
// #      IMPORT NPM        #
// ##########################

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastError } from '@components/Toast/Toasts';
import { deleteUnitLessonAndVideoLectureContent, deleteUnitLessonAndFillBlankExercise } from '@store/reducer/courseReducer';
import { AppDispatch } from '@store/store';

const handleDeleteUnitLesson: (lectureType: string, unitId: string, refetch: () => void, dispatch: AppDispatch) => void = async (
    lectureType,
    unitId,
    refetch,
    dispatch
) => {
    try {
        // Nếu không có lectureType hoặc rỗng thì thông báo lỗi
        if (!lectureType || lectureType === '') {
            toastError('Có lỗi xảy ra!');
        }

        // Nếu lectureType === 'videoLecture' thì call api deleteUnitLessonAndVideoLectureContent
        if (lectureType === 'videoLecture') {
            await dispatch(deleteUnitLessonAndVideoLectureContent(unitId));
            refetch();
        }

        // Nếu lectureType === 'exercise' thì call api deleteUnitLessonAndFillBLankExercise
        if (lectureType === 'exercise') {
            await dispatch(deleteUnitLessonAndFillBlankExercise(unitId));
            refetch();
        }
    } catch (error) {
        toastError('Có lỗi xảy ra!');
    }
};

export default handleDeleteUnitLesson;
