// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { Fragment, createContext, useState } from 'react';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
//@ts-ignore
import { LectureType } from '@types/types';
import UnitForms from './UnitForms';
import RenderLecturesForms from '@admin/components/Shared/RenderLecturesForms';
import { AppDispatch, RootState } from '@store/store';
import { toastError } from '@components/Toast/Toasts';
import { resetForm } from '@store/reducer/adminUnitLessonReducer';
import { useAsyncMutation } from '@hooks/useAsyncMutation';
import {
    useNewUnitLessonAndGrammarExerciseMutation,
    useNewUnitLessonAndVideoLectureContentMutation,
    useNewUnitLessonAndVocaExerciseMutation,
} from '@store/api/courseApi';
import { resetVocaForm } from '@store/reducer/vocaReducer';

export const AudioFileContext = createContext<any>(null);

const CreateUnit: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms, videoLecture, exerciseType, fillBlankExercise } = useSelector((state: RootState) => state.adminUnitLesson);
    const { vocabularies, sentences, audio } = useSelector((state: RootState) => state.vocabularies);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [fileInputs, setFileInputs] = useState<File[]>([]);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const [newUnitLessonAndVideoLectureContent, isLoading] = useAsyncMutation(useNewUnitLessonAndVideoLectureContentMutation);
    const [newUnitLessonAndGrammarExercise, newUnitLessonAndGrammarLoading] = useAsyncMutation(useNewUnitLessonAndGrammarExerciseMutation);
    const [newUnitLessonAndVocaExercise, newUnitLessonAndVocaExerciseLoading] = useAsyncMutation(useNewUnitLessonAndVocaExerciseMutation);

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
            case LectureType.vocaExercise:
                await newUnitLessonAndVocaExercise({
                    title: unitForms.title,
                    time: unitForms.time,
                    icon: unitForms.icon,
                    lectureType: unitForms.lectureType,
                    exerciseType,
                    lesson: unitForms.lesson,
                    course: unitForms.course,
                    vocabularies: vocabularies,
                    sentences: sentences,
                    audio: audio,
                    audioFile: fileInputs,
                });
                dispatch(resetForm());
                dispatch(resetVocaForm());

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

    const handleSetAudioFile = (file: File, index: number) => {
        setFileInputs((prev) => {
            const newFileInputs = [...prev];
            newFileInputs[index] = file;
            return newFileInputs;
        });
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <form className="flex flex-col gap-4 pb-20" onSubmit={handleCreateNewUnitLesson}>
                <div className="flex items-center gap-4">
                    <button
                        className={`${
                            isLoading || newUnitLessonAndGrammarLoading || newUnitLessonAndVocaExerciseLoading
                                ? 'btn-disabled'
                                : 'btn-primary'
                        } max-w-max`}
                        disabled={isLoading || newUnitLessonAndGrammarLoading || newUnitLessonAndVocaExerciseLoading}
                    >
                        Tạo Unit
                    </button>
                    {(isLoading || newUnitLessonAndGrammarLoading || newUnitLessonAndVocaExerciseLoading) && (
                        <Loader content="Loading..." />
                    )}
                </div>

                {/* UnitForms */}
                <UnitForms />

                {/* Render Lectures */}
                <AudioFileContext.Provider value={handleSetAudioFile}>
                    <RenderLecturesForms />
                </AudioFileContext.Provider>
            </form>
        </Fragment>
    );
};

export default CreateUnit;
