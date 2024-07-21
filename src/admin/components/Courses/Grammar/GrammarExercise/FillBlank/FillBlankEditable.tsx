// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment, useEffect } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetGrammarExerciseQuery, useUpdateUnitLessonAndGrammarExerciseMutation } from '@store/api/courseApi';
import { toastError } from '@components/Toast/Toasts';
import { AppDispatch, RootState } from '@store/store';
import { hasEmptyFields } from '@utils/Helpers';
//@ts-ignore
import { GrammarExerciseTypes } from '@types/types';
import FillBlankEditForms from './FillBlankEditForms';
import FillBlankEditQuestionForms from './FillBlankEditQuestionForms';
import { addQuestion, resetForm } from '@store/reducer/adminUnitLessonReducer';
import { useAsyncMutation } from '@hooks/useAsyncMutation';

// #############################################
const FillBlankEditable: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms, fillBlankExercise } = useSelector((state: RootState) => state.adminUnitLesson);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const { unitId } = useParams<string>();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    // RTK query data
    const { data: grammarExerciseData } = useGetGrammarExerciseQuery(unitId, { skip: !unitId });
    const [updateUnitLessonAndGrammarExercise, updateUnitLessonAndGrammarExerciseLoading] = useAsyncMutation(
        useUpdateUnitLessonAndGrammarExerciseMutation
    );

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

        if (hasEmptyFields([unitId, unitForms.title, unitForms.time, unitForms.lesson]) || fillBlankExercise.questions.length === 0) {
            toastError('Please Enter All Fields');
            return;
        }

        try {
            await updateUnitLessonAndGrammarExercise({
                _id: unitId,
                title: unitForms.title,
                time: unitForms.time,
                lesson: unitForms.lesson,
                questions: fillBlankExercise.questions,
            });

            dispatch(resetForm());
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
        if (grammarExerciseData?.success) {
            const initialQuestions = grammarExerciseData?.grammarExercise?.type.questions || [];
            initialQuestions.forEach((question) => {
                dispatch(addQuestion(question));
            });
        }
    }, [unitId, grammarExerciseData, dispatch]);

    return (
        <Fragment>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Thông tin chung',
                        key: '1',
                        children: (
                            <form className="flex flex-col gap-4" onSubmit={handleUpdateForm}>
                                {/* Button */}
                                <div className="flex items-center gap-4">
                                    <button
                                        className={`${
                                            updateUnitLessonAndGrammarExerciseLoading ? 'btn-disabled' : 'btn-primary'
                                        } max-w-max`}
                                        disabled={updateUnitLessonAndGrammarExerciseLoading}
                                    >
                                        Cập nhật
                                    </button>
                                    {updateUnitLessonAndGrammarExerciseLoading && <Loader content="Loading..." />}
                                </div>

                                <FillBlankEditForms />
                            </form>
                        ),
                    },
                    {
                        label: 'Câu hỏi',
                        key: '2',
                        children: <FillBlankEditQuestionForms unitId={unitId} grammarExerciseData={grammarExerciseData} />,
                    },
                    {
                        label: 'Bình luận',
                        key: '3',
                        children: 'Tab 3',
                    },
                ]}
            />
        </Fragment>
    );
};

export default FillBlankEditable;
