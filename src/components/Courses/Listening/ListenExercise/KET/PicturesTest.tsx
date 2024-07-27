// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import parse from 'html-react-parser';
import { Button, Radio, Space } from 'antd';
import { Fragment, useMemo, useState } from 'react';
import { Collapse } from 'antd';
import Lottie from 'lottie-react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import type { CollapseProps } from 'antd';
// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { ListenExerciseResponseTypes, Option, UnitLessonStatus } from 'types/api-types';
import { toastInfo } from '@components/Toast/Toasts';
import { removeNonLetters } from '@utils/Helpers';
import Congratulations from '@assets/animations/Congratulations.json';
import {
    useGetAllLessonsByCourseIdQuery,
    useGetAllUnitLessonsByCourseIdQuery,
    useGetUnitLessonByIdQuery,
    useGetUserProcessStatusesQuery,
    useLazyGetUnitLessonIdByUserProcessQuery,
} from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';
import { unlockUnitLesson } from '@utils/unlockUnitLesson';
import { AppDispatch } from '@store/store';

interface ConversationTestProps {
    ListenExerciseData: ListenExerciseResponseTypes | undefined;
}
const PicturesTest: React.FC<ConversationTestProps> = ({ ListenExerciseData }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // ?id=.....
    const { id: courseId } = useParams<string>();

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
    const { data: userDetailsData } = useUserDetailsQuery();
    const userId = useMemo(() => userDetailsData?.user?._id, [userDetailsData?.user]);

    const { data: lessons } = useGetAllLessonsByCourseIdQuery(courseId, { skip: !courseId });
    const { data: unitLesson } = useGetUnitLessonByIdQuery(id, { skip: !id });
    const { data: unitLessons } = useGetAllUnitLessonsByCourseIdQuery(courseId, {
        skip: !courseId,
    });
    const { data: userProcessStatusData, refetch: userProcessRefetch } = useGetUserProcessStatusesQuery(userId, { skip: !userId });
    const [unitLessonByUserProcess] = useLazyGetUnitLessonIdByUserProcessQuery();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    const { type: pictureTestContent } = ListenExerciseData?.listeningExercise || {};

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
                    {parse(pictureTestContent?.transcript || '')}
                </p>
            ),
        },
    ];

    const isCompleted = useMemo(() => {
        if (userProcessStatusData?.success) {
            const currentUnitLesson = userProcessStatusData?.unitLessonStatus?.find(
                (status: UnitLessonStatus) => status?.unitLessonId?._id === id
            );
            return currentUnitLesson?.status === 'completed';
        }
        return false;
    }, [userProcessStatusData, id]);
    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleRadioChange = (questionId: string, value: string): void => {
        setAnswers((preState) => ({ ...preState, [questionId]: value }));

        // Khi người dùng chuyển đổi option khác thì chỉ câu đó chuyển trạng thái isChecked === false
        setIsChecked((preState) => ({ ...preState, [questionId]: false }));
    };

    const handleCheck = async () => {
        const validAllFields = isFormValid();

        if (!validAllFields) {
            toastInfo('Vui lòng chọn hết các câu!');
            return;
        }

        // Khi nhấn vào nút kiểm tra thì set tất cả là trạng thái checked
        const updateChecked: Record<string, boolean> = {};

        for (const question of pictureTestContent?.questions || []) {
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

            if (!isCompleted) {
                await unlockUnitLesson({
                    id,
                    userId,
                    unitLesson,
                    allUnitLessonData: unitLessons,
                    lessons,
                    dispatch,
                    userProcessRefetch,
                    unitLessonByUserProcess,
                });
            }
        }
    };

    // Hàm kiểm tra xem tất cả các ô có được điền không
    const isFormValid = (): boolean => {
        if (!pictureTestContent?.questions) {
            return false;
        }

        return pictureTestContent?.questions?.every((question) => answers[question._id] && answers[question._id] !== '');
    };

    // Hàm kiểm tra xem answer của tất cả cả ô có chính xác không
    const isCorrectAnswer = (): boolean => {
        if (!pictureTestContent?.questions) {
            return false;
        }

        return pictureTestContent?.questions?.every((question) => {
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
                <li className="flex justify-between gap-2 sm:flex-wrap">
                    <div>
                        <h3 className="font-sans text-lg leading-tight text-textCustom">Listening Test</h3>
                        <p className="mt-2 font-sans text-base font-normal text-textCustom">{pictureTestContent?.title}</p>
                    </div>

                    <Button type="primary" onClick={handleCheck}>
                        Kiểm Tra
                    </Button>
                </li>

                {/* Audio */}
                <li>
                    <audio controls className="w-full" controlsList="nodownload noplaybackrate">
                        <source src={pictureTestContent?.audio.url} type="audio/mpeg" />
                    </audio>
                </li>

                {/* Content */}
                <li className="flex flex-col gap-8">
                    {pictureTestContent?.questions.map((pictureTest) => (
                        <div key={pictureTest._id}>
                            <h3 className="font-sans font-medium leading-tight text-textCustomName">{pictureTest.questionTitle}</h3>

                            <Radio.Group
                                className="mt-2"
                                onChange={(e) => handleRadioChange(pictureTest._id, e.target.value)}
                                value={answers?.[pictureTest._id] || undefined}
                            >
                                <Space direction="horizontal">
                                    {(pictureTest.options as Option[]).map((option: Option, optionIndex: number) => {
                                        // Kiểm tra đáp án chính xác
                                        const isCorrect =
                                            removeNonLetters((option.text as string).toLowerCase()) ===
                                            removeNonLetters(pictureTest.answer.toLowerCase());
                                        // Xác định lớp CSS cho Radio button
                                        const radioClass =
                                            answers[pictureTest._id] === option.text
                                                ? isCorrect
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                : 'text-textCustom';

                                        // Xác định lớp CSS cho Image pictures
                                        const imageClass =
                                            answers[pictureTest._id] === option.text
                                                ? isCorrect
                                                    ? 'border-2 border-green-400'
                                                    : 'border-2 border-red-400'
                                                : '';
                                        return (
                                            <div key={optionIndex}>
                                                <div
                                                    className={`max-w-[12rem]  ${
                                                        isChecked[pictureTest._id] ? imageClass : 'text-textCustom'
                                                    }`}
                                                >
                                                    <img src={option?.image?.url} alt="image" />
                                                </div>

                                                <Radio
                                                    value={option.text}
                                                    className={`text-base ${isChecked[pictureTest._id] ? radioClass : 'text-textCustom'}`}
                                                    key={optionIndex}
                                                >
                                                    {option.text}
                                                </Radio>
                                            </div>
                                        );
                                    })}
                                </Space>
                            </Radio.Group>
                        </div>
                    ))}
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

export default PicturesTest;
