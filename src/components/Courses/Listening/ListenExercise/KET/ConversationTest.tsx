// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import parse from 'html-react-parser';
import { Button, Radio, Space } from 'antd';
import { Fragment, useState } from 'react';
import { Collapse } from 'antd';
import Lottie from 'lottie-react';
import type { CollapseProps } from 'antd';
// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { ListenExerciseResponseTypes, Question } from 'types/api-types';
import { toastInfo } from '@components/Toast/Toasts';
import { removeNonLetters } from '@utils/Helpers';
import Congratulations from '@assets/animations/Congratulations.json';

interface ConversationTestProps {
    ListenExerciseData: ListenExerciseResponseTypes | undefined;
}

const ConversationTest: React.FC<ConversationTestProps> = ({ ListenExerciseData }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    // Record<Keys, Type>
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isChecked, setIsChecked] = useState<Record<string, boolean>>({});
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [displayTrans, setDisplayTrans] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    const { type: conversationTestContent } = ListenExerciseData?.listeningExercise || {};

    // transcription
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <h3 className="select-none font-sans text-base leading-tight text-textCustomName">Transcript</h3>,
            children: (
                <p
                    className="font-sans text-base font-normal leading-7 text-textCustom 
                    selection:bg-bgCustomProcess"
                >
                    {parse(conversationTestContent?.transcript || '')}
                </p>
            ),
        },
    ];
    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleRadioChange = (questionId: string, value: string): void => {
        setAnswers((preState) => ({ ...preState, [questionId]: value }));

        // Khi người dùng chuyển đổi option khác thì chỉ câu đó chuyển trạng thái isChecked === false
        setIsChecked((preState) => ({ ...preState, [questionId]: false }));
    };

    const handleCheck = (): void => {
        const validAllFields = isFormValid();

        if (!validAllFields) {
            toastInfo('Vui lòng chọn hết các câu!');
            return;
        }

        // Khi nhấn vào nút kiểm tra thì set tất cả là trạng thái checked
        const updateChecked: Record<string, boolean> = {};

        for (const question of conversationTestContent?.questions || []) {
            updateChecked[question._id] = true;
        }

        if (Object.keys(updateChecked).length > 0) {
            setIsChecked((prevState) => ({
                ...prevState,
                ...updateChecked,
            }));
        }

        const correctAllFields = isCorrectAnswer();

        if (correctAllFields) {
            setShowAnimation(true);
            setDisplayTrans(true);
        }
    };

    // Hàm kiểm tra xem tất cả các ô có được điền không
    const isFormValid = (): boolean => {
        if (!conversationTestContent?.questions) {
            return false;
        }

        return conversationTestContent?.questions?.every((question) => answers[question._id] && answers[question._id] !== '');
    };

    // Hàm kiểm tra xem answer của tất cả cả ô có chính xác không
    const isCorrectAnswer = (): boolean => {
        if (!conversationTestContent?.questions) {
            return false;
        }

        return conversationTestContent?.questions?.every((question) => {
            // Dữ liệu của người dùng nhập
            const answerValue = answers[question._id]?.toLowerCase().trim();
            // Dữ liệu từ api
            const answerData = question?.answer?.toLowerCase().trim();

            if (answerValue === undefined || answerData === undefined) {
                return false;
            }

            const cleanAnswerValue = removeNonLetters(answerValue);
            const cleanAnswerData = removeNonLetters(answerData);

            return cleanAnswerValue === cleanAnswerData;
        });
    };

    // Hàm xử lý khi animation hoàn tất
    const handleAnimationComplete = (): void => {
        setShowAnimation(false);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <ul className="flex flex-col gap-4 rounded-md bg-bgCustomCardItem p-4">
                {/* Title */}
                <li className="flex flex-wrap justify-between gap-2">
                    <div>
                        <h3 className="font-sans text-lg leading-tight text-textCustom">Listening Test</h3>
                        <p className="mt-2 font-sans text-base font-normal text-textCustom">{conversationTestContent?.title}</p>
                    </div>

                    <Button type="primary" onClick={handleCheck}>
                        Kiểm Tra
                    </Button>
                </li>

                {/* Audio */}
                <li>
                    <audio controls className="w-full" controlsList="nodownload noplaybackrate">
                        <source
                            src="https://res.cloudinary.com/dvwdfsdkp/video/upload/v1720942162/listening_attachments/jzzwamf9iq62whryccmp.mp3"
                            type="audio/mpeg"
                        />
                    </audio>
                </li>

                {/* Content */}
                <li className="grid grid-cols-2 gap-8 sm:grid-cols-1">
                    {conversationTestContent?.questions?.map((question: Question) => (
                        <div key={question._id}>
                            <h3 className="font-sans font-medium leading-tight text-textCustomName">{question.questionTitle}</h3>

                            <Radio.Group
                                className="mt-2"
                                onChange={(e) => handleRadioChange(question._id, e.target.value)}
                                value={answers?.[question._id] || undefined}
                            >
                                <Space direction="vertical">
                                    {question?.options?.map((option, index) => {
                                        // Kiểm tra đáp án chính xác
                                        const isCorrect =
                                            removeNonLetters((option as string).toLowerCase()) ===
                                            removeNonLetters(question.answer.toLowerCase());
                                        // Xác định lớp CSS cho Radio button
                                        const radioClass =
                                            answers[question._id] === option
                                                ? isCorrect
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                : 'text-textCustom';

                                        return (
                                            <Radio
                                                value={option}
                                                className={`text-base ${isChecked[question._id] ? radioClass : ''}`}
                                                key={index}
                                            >
                                                {option as string}
                                            </Radio>
                                        );
                                    })}
                                </Space>
                            </Radio.Group>
                        </div>
                    ))}

                    {/* 
                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            Why is Mark not going to buy a new car right now?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    Because their family car is very old
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    Because their family car is very new
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    Because he wants to save money
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            What is Mark going to buy for his son, Richy?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    A new bike
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    A new car
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    New furniture for his room
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            What is Mark going to do for his daughter?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    Buy a new bike
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    Plan a family vacation
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    Buy new furniture for her room
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div> */}
                </li>
            </ul>

            {displayTrans && (
                <ul className="mt-4 rounded-md bg-bgCustomCardItem p-4">
                    <div>
                        <Collapse items={items} defaultActiveKey={['1']} />
                    </div>
                </ul>
            )}

            {/* Congratulations animation*/}
            {showAnimation && (
                <div className="fixed left-1/2 top-1/2 z-10 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform">
                    <Lottie
                        animationData={Congratulations}
                        loop={false}
                        onComplete={handleAnimationComplete} // Khi animation hoàn tất, gọi handleAnimationComplete
                    />
                </div>
            )}
        </Fragment>
    );
};

export default ConversationTest;
