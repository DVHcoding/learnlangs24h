// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { Fragment } from 'react';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
//@ts-ignore
import { LectureType } from '@types/types';
import UnitForms from './UnitForms';
import RenderLectures from '@admin/components/Shared/RenderLectures';
import { AppDispatch, RootState } from '@store/store';
import { toastError } from '@components/Toast/Toasts';
import { resetForm } from '@store/reducer/adminUnitLessonReducer';
import { useAsyncMutation } from '@hooks/useAsyncMutation';
import { useNewUnitLessonAndGrammarExerciseMutation, useNewUnitLessonAndVideoLectureContentMutation } from '@store/api/courseApi';

const CreateUnit: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms, videoLecture, exerciseType, fillBlankExercise } = useSelector((state: RootState) => state.adminUnitLesson);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const [newUnitLessonAndVideoLectureContent, isLoading] = useAsyncMutation(useNewUnitLessonAndVideoLectureContentMutation);
    const [newUnitLessonAndGrammarExercise, newUnitLessonAndGrammarLoading] = useAsyncMutation(useNewUnitLessonAndGrammarExerciseMutation);

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */

    const handleCreateNewUnitLesson = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (unitForms.lectureType === '') {
            toastError('Các trường không được bỏ trống!');
            return;
        }

        const commonFields = [unitForms.title, unitForms.time, unitForms.icon, unitForms.lesson, unitForms.course]; // Các trường chung cho mọi loại bài giảng

        switch (unitForms.lectureType) {
            case LectureType.videoLecture:
                const videoFields = [videoLecture.videoUrl, videoLecture.totalTime, videoLecture.description]; // Các trường riêng cho bài giảng video
                if (hasEmptyFields([...commonFields, ...videoFields])) {
                    // Kiểm tra nếu có bất kỳ trường nào trống
                    // Hiển thị thông báo lỗi nếu trống
                    toastError('Các trường không được bỏ trống!');
                    return;
                }

                await newUnitLessonAndVideoLectureContent({
                    title: unitForms.title,
                    time: unitForms.time,
                    icon: unitForms.icon,
                    lectureType: unitForms.lectureType,
                    lesson: unitForms.lesson,
                    course: unitForms.course,
                    videoUrl: videoLecture.videoUrl,
                    description: videoLecture.description,
                    totalTime: videoLecture.totalTime,
                });

                dispatch(resetForm());

                break;
            case LectureType.grammarExercise:
                // Kiểm tra nếu có bất kỳ trường nào trống hoặc không có câu hỏi
                if (hasEmptyFields([...commonFields, exerciseType]) || fillBlankExercise.questions.length === 0) {
                    // Hiển thị thông báo lỗi nếu trống
                    return toastError('Các trường không được bỏ trống!');
                }

                await newUnitLessonAndGrammarExercise({
                    title: unitForms.title,
                    time: unitForms.time,
                    icon: unitForms.icon,
                    lectureType: unitForms.lectureType,
                    exerciseType,
                    lesson: unitForms.lesson,
                    course: unitForms.course,
                    questions: fillBlankExercise.questions,
                });

                dispatch(resetForm());
                break;
            default:
                break;
        }
    };

    // Hàm kiểm tra các trường trống
    const hasEmptyFields = (fields: string[]) => {
        // Trả về true nếu có bất kỳ trường nào trống
        return fields.some((field) => field === '');
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <form className="flex flex-col gap-4 pb-4" onSubmit={handleCreateNewUnitLesson}>
                <div className="flex items-center gap-4">
                    <button
                        className={`${isLoading || newUnitLessonAndGrammarLoading ? 'btn-disabled' : 'btn-primary'} max-w-max`}
                        disabled={isLoading || newUnitLessonAndGrammarLoading}
                    >
                        Tạo Unit
                    </button>
                    {(isLoading || newUnitLessonAndGrammarLoading) && <Loader content="Loading..." />}
                </div>

                {/* UnitForms */}
                <UnitForms />

                {/* Render Lectures */}
                <RenderLectures />
            </form>
        </Fragment>
    );
};

export default CreateUnit;
