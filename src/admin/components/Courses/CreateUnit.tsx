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
    useNewUnitLessonAndListenExerciseMutation,
    useNewUnitLessonAndVideoLectureContentMutation,
    useNewUnitLessonAndVocaExerciseMutation,
} from '@store/api/courseApi';
import { resetVocaForm } from '@store/reducer/vocaReducer';
import { hasEmptyArrays, hasEmptyFields, hasLoadingApis } from '@utils/Helpers';

interface AudioFileContextType {
    handleSetAudioFile: (file: File, index: number) => void;
    handleSetConversationFile: (file: File) => void;
}
export const AudioFileContext = createContext<AudioFileContextType | null>(null);

const CreateUnit: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms, videoLecture, exerciseType, fillBlankExercise } = useSelector((state: RootState) => state.adminUnitLesson);
    const { vocabularies, sentences, audio } = useSelector((state: RootState) => state.vocabularies);
    const { questions, title: questionLabel, transcript } = useSelector((state: RootState) => state.listenExercise);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [fileInputs, setFileInputs] = useState<File[]>([]);
    const [conversationFile, setConversationFile] = useState<File>();

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const [newUnitLessonAndVideoLectureContent, isLoading] = useAsyncMutation(useNewUnitLessonAndVideoLectureContentMutation);
    const [newUnitLessonAndGrammarExercise, newUnitLessonAndGrammarLoading] = useAsyncMutation(useNewUnitLessonAndGrammarExerciseMutation);
    const [newUnitLessonAndVocaExercise, newUnitLessonAndVocaExerciseLoading] = useAsyncMutation(useNewUnitLessonAndVocaExerciseMutation);
    const [newUnitLessonAndListenExercise, newUnitLessonAndListenExerciseLoading] = useAsyncMutation(
        useNewUnitLessonAndListenExerciseMutation
    );

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const contextValue = {
        handleSetAudioFile: (file: File, index: number) => {
            setFileInputs((prev) => {
                const newFileInputs = [...prev];
                newFileInputs[index] = file;
                return newFileInputs;
            });
        },
        handleSetConversationFile: (file: File) => {
            setConversationFile(file);
        },
    };

    const isLoadingApis = hasLoadingApis([
        isLoading,
        newUnitLessonAndGrammarLoading,
        newUnitLessonAndVocaExerciseLoading,
        newUnitLessonAndListenExerciseLoading,
    ]);

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
                if (hasEmptyFields([...commonFields, exerciseType]) || hasEmptyArrays([fillBlankExercise])) {
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
                if (hasEmptyFields([...commonFields]) || hasEmptyArrays([vocabularies, sentences, audio]) || !fileInputs) {
                    // Hiển thị thông báo lỗi nếu trống
                    return toastError('Các trường không được bỏ trống!');
                }

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

            case LectureType.listenExercise:
                const commonListenFields = [questionLabel, transcript];

                if (hasEmptyFields([...commonFields, ...commonListenFields]) || hasEmptyArrays([questions]) || !conversationFile) {
                    // Hiển thị thông báo lỗi nếu trống
                    return toastError('Các trường không được bỏ trống!');
                }

                await newUnitLessonAndListenExercise({
                    title: unitForms.title,
                    time: unitForms.time,
                    icon: unitForms.icon,
                    lectureType: unitForms.lectureType,
                    exerciseType,
                    lesson: unitForms.lesson,
                    course: unitForms.course,
                    questionLabel,
                    questions,
                    transcript,
                    audioFile: conversationFile,
                });
                dispatch(resetForm());
                dispatch(resetVocaForm());

                break;
            default:
                break;
        }
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
                    <button className={`${isLoadingApis ? 'btn-disabled' : 'btn-primary'} max-w-max`} disabled={isLoadingApis}>
                        Tạo Unit
                    </button>
                    {isLoadingApis && <Loader content="Loading..." />}
                </div>

                {/* UnitForms */}
                <UnitForms />

                {/* Render Lectures */}
                <AudioFileContext.Provider value={contextValue}>
                    <RenderLecturesForms />
                </AudioFileContext.Provider>
            </form>
        </Fragment>
    );
};

export default CreateUnit;
