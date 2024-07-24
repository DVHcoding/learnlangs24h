// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { addOption, addQuestion, removeOption, removeQuestion, setAnswer } from '@store/reducer/listenReducer';
import { AppDispatch, RootState } from '@store/store';
import { Button, Input, Modal, Radio } from 'antd';
import { Trash2 } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const ConversationForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { questions } = useSelector((state: RootState) => state.listenExercise);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newQuestionTitle, setNewQuestionTitle] = useState<string>('');
    const [newOptionText, setNewOptionText] = useState<Record<number, string>>('');

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(addQuestion(newQuestionTitle));
        setNewQuestionTitle('');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAddOption = (questionIndex: number) => {
        if (newOptionText[questionIndex]) {
            dispatch(addOption({ questionIndex, optionText: newOptionText[questionIndex] }));
            setNewOptionText((preState) => ({ ...preState, [questionIndex]: '' }));
        }
    };

    const handleRemoveQuestion = (questionIndex: number) => {
        dispatch(removeQuestion(questionIndex));
    };

    const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
        dispatch(removeOption({ questionIndex, optionIndex }));
    };

    const handleRadioChange = (questionIndex: number, value: string) => {
        dispatch(setAnswer({ questionIndex, answer: value }));
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    console.log(questions);
    return (
        <Fragment>
            <Button type="dashed" onClick={showModal}>
                Thêm câu hỏi
            </Button>

            <Modal title="Thêm câu hỏi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input
                    type="text"
                    className="mt-4 p-2 font-be"
                    placeholder="Nhập câu hỏi..."
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                />
            </Modal>

            <input
                type="text"
                className="mt-4 block w-full rounded-md border border-bdCustom bg-bgCustom p-2
                font-be text-textCustom"
                placeholder="Nhập tiêu đề..."
            />

            <input type="file" className="mt-2" />

            <ul className="mt-4 flex flex-col gap-5">
                {questions.map((question, questionIndex) => (
                    <li className="rounded-md bg-bgCustomCardItem p-4" key={questionIndex}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h3 className="leading-tight text-textCustom">Câu {questionIndex + 1}:</h3>
                                <p className="text-base text-textCustom">{question.questionTitle}</p>
                            </div>

                            <Trash2
                                size={18}
                                className="cursor-pointer text-textCustom transition-all hover:text-red-400"
                                onClick={() => handleRemoveQuestion(questionIndex)}
                            />
                        </div>

                        <Radio.Group
                            className="mt-2"
                            onChange={(e) => handleRadioChange(questionIndex, e.target.value)}
                            value={question.answer}
                        >
                            <ul className="flex flex-col gap-2">
                                {question.options.map((option: string, optionIndex: number) => (
                                    <li key={optionIndex}>
                                        <Radio value={option} className="min-w-[18rem] font-be text-textCustom">
                                            {option}
                                        </Radio>
                                        <Button danger type="dashed" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>
                                            Xoa
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <div className="mt-4 flex items-center gap-4">
                            <input
                                className="w-[20rem] rounded-md border border-bdCustom bg-bgCustom p-[0.3rem]
                                font-be text-textCustom"
                                placeholder="Nhập giá trị..."
                                value={newOptionText[questionIndex]}
                                onChange={(e) => setNewOptionText((preState) => ({ ...preState, [questionIndex]: e.target.value }))}
                            />

                            <Button type="primary" onClick={() => handleAddOption(questionIndex)}>
                                Them
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export default ConversationForms;
