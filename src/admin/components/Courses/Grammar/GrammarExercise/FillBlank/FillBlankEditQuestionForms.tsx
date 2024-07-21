// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button } from 'antd';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { addQuestion, deleteQuestion, updateQuestion } from '@store/reducer/adminUnitLessonReducer';
import { AppDispatch } from '@store/store';
import { GrammarExerciseResponseTypes, QuestionType } from 'types/api-types';

interface FillBlankEditQuestionFormsProps {
    unitId: string | undefined;
    grammarExerciseData: GrammarExerciseResponseTypes | undefined;
}

const FillBlankEditQuestionForms: React.FC<FillBlankEditQuestionFormsProps> = ({ unitId, grammarExerciseData }) => {
    const dispatch: AppDispatch = useDispatch();
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    const handleAddQuestion = () => {
        const newItem: QuestionType = { sentence: '', correctAnswer: [''], otherAnswer: [''] };
        setQuestions([...questions, newItem]);
        dispatch(addQuestion(newItem));
    };

    const handleDeleteQuestion = (questionIndex: number) => {
        setQuestions(questions.filter((_question, index) => index !== questionIndex));
        dispatch(deleteQuestion(questionIndex));
    };

    const handleUpdateQuestion = (index: number, updatedQuestion: QuestionType) => {
        const updatedQuestions = questions.map((questionItem, questionIndex) => (questionIndex === index ? updatedQuestion : questionItem));
        setQuestions(updatedQuestions);
        dispatch(updateQuestion({ index, question: updatedQuestion }));
    };

    useEffect(() => {
        if (grammarExerciseData?.success) {
            const initialQuestions = grammarExerciseData?.grammarExercise?.type.questions || [];
            setQuestions(initialQuestions);
        }
    }, [unitId, grammarExerciseData, dispatch]);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Button type="primary" onClick={handleAddQuestion}>
                    Thêm câu hỏi
                </Button>
            </div>

            <ul className="flex flex-wrap items-center gap-2">
                {questions.map((question: QuestionType, index: number) => (
                    <li className="relative grow border-2 border-dotted p-4" key={index}>
                        <X
                            className="absolute right-1 top-1 cursor-pointer text-red-500"
                            size={19}
                            onClick={() => handleDeleteQuestion(index)}
                        />

                        <div>
                            <div>
                                <span className="select-none font-body font-bold text-textCustom">Câu hỏi (*)</span>
                                <input
                                    value={question.sentence}
                                    onChange={(e) => {
                                        const updatedQuestion = { ...question, sentence: e.target.value };
                                        handleUpdateQuestion(index, updatedQuestion);
                                    }}
                                    type="text"
                                    className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 bg-bgCustom
                                  p-1 text-textCustom focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <span className="select-none font-body font-bold text-textCustom">Đáp án (*)</span>
                                <input
                                    value={question.correctAnswer.join(', ')}
                                    onChange={(e) => {
                                        const answerArray = e.target.value.split(',').map((answer) => answer.trim());
                                        const updatedQuestion = { ...question, correctAnswer: answerArray };
                                        handleUpdateQuestion(index, updatedQuestion);
                                    }}
                                    type="text"
                                    className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 bg-bgCustom
                                  p-1 text-textCustom focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <span className="select-none font-body font-bold text-textCustom">Đáp án khác (*)</span>
                                <input
                                    value={question.otherAnswer.join(', ')}
                                    onChange={(e) => {
                                        const answerArray = e.target.value.split(',').map((answer) => answer.trim());
                                        const updatedQuestion = { ...question, otherAnswer: answerArray };
                                        handleUpdateQuestion(index, updatedQuestion);
                                    }}
                                    type="text"
                                    className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300
                                  bg-bgCustom p-1 text-textCustom focus:border-blue-400"
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FillBlankEditQuestionForms;
