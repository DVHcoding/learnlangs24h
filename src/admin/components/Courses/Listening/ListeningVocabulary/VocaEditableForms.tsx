// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import UnitForms from '../../UnitForms';
import { useGetUnitLessonByIdQuery, useGetVocaExerciseQuery, useUpdateUnitLessonAndVocaExerciseMutation } from '@store/api/courseApi';
import { AppDispatch, RootState } from '@store/store';
import { changeEditableForms } from '@store/reducer/adminUnitLessonReducer';
import VocaExerciseForms from './VocaExerciseForms';
import { Card, IAudio, setAudios, setSentences, setVocabularies } from '@store/reducer/vocaReducer';
import { hasEmptyArrays, hasEmptyFields } from '@utils/Helpers';
import { toastError } from '@components/Toast/Toasts';
import { useAsyncMutation } from '@hooks/useAsyncMutation';

const VocaEditableForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms } = useSelector((state: RootState) => state.adminUnitLesson);
    const { vocabularies, sentences, audio } = useSelector((state: RootState) => state.vocabularies);

    console.log(audio);
    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const { id: courseId, unitId } = useParams<string>();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: unitLessonData } = useGetUnitLessonByIdQuery(unitId, { skip: !unitId });
    const { data: vocaExerciseData } = useGetVocaExerciseQuery(unitId, { skip: !unitId });

    const [updateUnitLessonAndVocaExercise, isLoading] = useAsyncMutation(useUpdateUnitLessonAndVocaExerciseMutation);
    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleUpdateForm: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        if (!unitId) {
            return;
        }

        if (
            hasEmptyFields([unitForms.title, unitForms.time, unitForms.icon, unitForms.course, unitForms.lesson, unitForms.lectureType]) ||
            hasEmptyArrays([vocabularies, sentences, audio])
        ) {
            toastError('Please Enter All Fields');
            return;
        }

        try {
            await updateUnitLessonAndVocaExercise({
                _id: unitId,
                title: unitForms.title,
                time: unitForms.time,
                icon: unitForms.icon,
                course: unitForms.course,
                lesson: unitForms.lesson,
                lectureType: unitForms.lectureType,
                // Lọc ra (chỉ giữ lại thẻ có nội dung)
                vocabularies: vocabularies.filter((vocabulary: Card) => vocabulary.english && vocabulary.vietnamese),
                sentences: sentences.filter((sentence: Card) => sentence.english && sentence.vietnamese),
                audio: audio.filter((item: IAudio) => item.answer && item.otherAnswer),
            });
        } catch (error) {
            toastError('Có lỗi xảy ra!');
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    useEffect(() => {
        if (!unitId || !courseId || !vocaExerciseData?.success) {
            return;
        }

        dispatch(
            changeEditableForms({
                title: unitLessonData?.unitLesson.title,
                time: unitLessonData?.unitLesson.time,
                icon: unitLessonData?.unitLesson.icon,
                course: unitLessonData?.unitLesson.course,
                lesson: unitLessonData?.unitLesson.lesson,
                lectureType: unitLessonData?.unitLesson.lectureType,
            })
        );

        dispatch(setVocabularies(vocaExerciseData?.vocaExercise.vocabularies));
        dispatch(setSentences(vocaExerciseData?.vocaExercise.sentences));
        dispatch(setAudios(vocaExerciseData?.vocaExercise.quiz.audio));
    }, [dispatch, unitId, unitLessonData, vocaExerciseData]);

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Thông tin chung',
                        key: '1',
                        children: (
                            <form className="flex flex-col gap-4" onSubmit={handleUpdateForm}>
                                <div className="flex items-center gap-4">
                                    <button className={`${isLoading ? 'btn-disabled' : 'btn-primary'} max-w-max`} disabled={isLoading}>
                                        Cập nhật
                                    </button>
                                    {isLoading && <Loader content="Loading..." />}
                                </div>

                                <UnitForms />
                            </form>
                        ),
                    },
                    {
                        label: 'Mô tả thêm',
                        key: '2',
                        children: (
                            <div>
                                <VocaExerciseForms />
                            </div>
                        ),
                    },
                    {
                        label: 'Bình luận',
                        key: '3',
                        children: 'Tab 3',
                    },
                ]}
            />
        </div>
    );
};

export default VocaEditableForms;
