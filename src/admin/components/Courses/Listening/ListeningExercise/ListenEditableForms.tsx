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
import { useGetListenExerciseQuery, useGetUnitLessonByIdQuery, useUpdateUnitLessonAndListenExerciseMutation } from '@store/api/courseApi';
import { AppDispatch, RootState } from '@store/store';
import { changeEditableForms } from '@store/reducer/adminUnitLessonReducer';
import { hasEmptyFields } from '@utils/Helpers';
import { toastError } from '@components/Toast/Toasts';
import { useAsyncMutation } from '@hooks/useAsyncMutation';
import ConversationForms from './Conversation/ConversationForms';
//@ts-ignore
import { ListenExerciseTypes } from '@types/types';
import { addTitle, addTranscript, setQuestions } from '@store/reducer/listenReducer';

const ListenEditableForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms } = useSelector((state: RootState) => state.adminUnitLesson);
    const { title: questionLabel, questions, transcript } = useSelector((state: RootState) => state.listenExercise);

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
    const { data: listenExerciseData } = useGetListenExerciseQuery(unitId, { skip: !unitId });

    const [updateUnitLessonAndListenExercise, isLoading] = useAsyncMutation(useUpdateUnitLessonAndListenExerciseMutation);
    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    console.log(listenExerciseData);
    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleUpdateForm: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        if (!unitId) {
            return;
        }

        if (
            hasEmptyFields([
                unitForms.title,
                unitForms.time,
                unitForms.icon,
                unitForms.course,
                unitForms.lesson,
                unitForms.lectureType,
                questionLabel,
                transcript,
            ]) ||
            hasEmptyFields([questions])
        ) {
            toastError('Please Enter All Fields');
            return;
        }

        try {
            await updateUnitLessonAndListenExercise({
                _id: unitId,
                title: unitForms.title,
                time: unitForms.time,
                icon: unitForms.icon,
                course: unitForms.course,
                lesson: unitForms.lesson,
                lectureType: unitForms.lectureType,
                questionLabel,
                questions,
                transcript,
            });
        } catch (error) {
            toastError(`Có lỗi xảy ra!: ${error}`);
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    useEffect(() => {
        if (!unitId || !courseId || !listenExerciseData?.success) {
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

        dispatch(addTitle(listenExerciseData.listeningExercise.type.title));
        dispatch(addTranscript(listenExerciseData.listeningExercise.type.transcript));
        dispatch(setQuestions(listenExerciseData.listeningExercise.type.questions));
    }, [dispatch, unitId, unitLessonData, listenExerciseData]);

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
                                {(() => {
                                    switch (listenExerciseData?.listeningExercise.exerciseType) {
                                        case ListenExerciseTypes.Conversation:
                                            return <ConversationForms />;
                                        default:
                                            return null;
                                    }
                                })()}
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

export default ListenEditableForms;
