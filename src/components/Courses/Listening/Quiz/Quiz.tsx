// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useState } from 'react';
import { ChevronsLeft, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { Alert, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const HelpComments = loadable(() => import('@components/Shared/HelpComments'));
const LessonCard = loadable(() => import('@components/Courses/LessonCard/LessonCard'));

import { useGetUserProcessStatusesQuery } from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';
import AudioWaveform from './AudioWaveform';
import VocaExerciseData from '@components/Courses/Listening/VocaExerciseJson.json';
import Congratulations from '@assets/animations/Congratulations.json';
import { removeNonLetters } from '@utils/Helpers';

interface AudioType {
    _id: string;
    public_id: string;
    url: string;
    answer: string;
    otherAnswer: string;
}

// #########################################################################
const Quiz: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const navigate = useNavigate();

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState<boolean>(false);
    const { quiz } = VocaExerciseData;
    const [answers, setAnswers] = useState<{ [key: string]: { value: string; border: string } }>({});
    const [showAnimation, setShowAnimation] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetailsData } = useUserDetailsQuery();

    const userId = userDetailsData?.user?._id ?? 'undefined';
    const { data: userProcessStatusData } = useGetUserProcessStatusesQuery(userId, { skip: !userId });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleToggleLesson = (): void => {
        setOpen(!open);
    };

    const handleSubmit = (): void => {
        const validAllFields = isFormValid();
        const correctAllFields = isCorrectAnswer();

        // Khởi tạo đối tượng để lưu trữ các bản cập nhật cho trạng thái `answers`.
        const updates: Record<string, { value: string; border: string }> = {};

        // Duyệt qua mảng `quiz.audio` và chỉ thêm các cập nhật cần thiết vào đối tượng `updates`.
        for (const audio of quiz.audio) {
            // Dữ liệu của người dùng nhập
            const answerValue = answers[audio._id]?.value.toLowerCase().trim();
            // Dữ liệu từ api
            const answerData = audio.answer.toLowerCase().trim();
            const otherAnswerData = audio.otherAnswer.toLowerCase().trim();

            if (!answerValue) {
                updates[audio._id] = { value: '', border: 'border-red-400 border-2 text-red-600' };
            } else if (
                removeNonLetters(answerValue) === removeNonLetters(answerData) ||
                removeNonLetters(answerValue) === removeNonLetters(otherAnswerData)
            ) {
                updates[audio._id] = { value: audio.answer, border: 'border-green-400 border-2 text-green-600' };
            } else {
                updates[audio._id] = { value: answerValue, border: 'border-red-400 border-2 text-red-600' };
            }
        }

        /**
         * const updates = {
         *   '1': { value: 'Hello', border: 'border-green-400 border text-green-600' },
         *   '2': { value: 'World', border: 'border-red-400 border text-red-600' }
         * };
         *   console.log(Object.keys(updates))
         *   ['1', '2']
         */

        // Chỉ cập nhật trạng thái `answers` nếu có ít nhất một bản cập nhật cần thiết.
        if (Object.keys(updates).length > 0) {
            setAnswers((prevState) => ({
                ...prevState,
                ...updates,
            }));
        }

        if (validAllFields && correctAllFields) {
            setShowAnimation(true);
        }
    };

    // Hàm kiểm tra xem tất cả các ô có được điền không
    const isFormValid = (): boolean => {
        return quiz.audio.every((audio: AudioType) => answers[audio._id] && answers[audio._id].value.trim() !== '');
    };

    // Hàm kiểm tra xem answer của tất cả cả ô có chính xác không
    const isCorrectAnswer = (): boolean => {
        return quiz.audio.every((audio: AudioType) => {
            // Dữ liệu của người dùng nhập
            const answerValue = answers[audio._id]?.value?.toLowerCase().trim();
            // Dữ liệu từ api
            const answerData = audio?.answer?.toLowerCase().trim();
            const otherAnswerData = audio.otherAnswer.toLowerCase().trim();

            if (answerValue === undefined || answerData === undefined || otherAnswerData === undefined) {
                return false; // or handle it as per your requirement
            }

            const cleanAnswerValue = removeNonLetters(answerValue);
            const cleanAnswerData = removeNonLetters(answerData);
            const cleanOtherAnswerData = removeNonLetters(otherAnswerData);

            return cleanAnswerValue === cleanAnswerData || cleanAnswerValue === cleanOtherAnswerData;
        });
    };

    // Hàm xử lý khi animation hoàn tất
    const handleAnimationComplete = () => {
        setShowAnimation(false);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="overflow-hidden pl-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumb */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to={`/listening/`}>Listening</Link>,
                        },
                        {
                            title: 'quiz',
                        },
                    ]}
                />

                <button aria-label="expandButton" onClick={handleToggleLesson} className="rounded-md bg-bgHoverGrayDark p-[4px] lg:hidden">
                    <ChevronsLeft
                        className={`text-textCustom ${open ? 'rotate-[-180deg]' : 'rotate-0'} 
                        transition-all duration-300`}
                        size={20}
                    />
                </button>
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* answer */}
                <div
                    className="scrollbar-mess relative h-full w-full overflow-auto 
                    rounded-tl-lg bg-bgCustomCard"
                >
                    <Alert
                        message="Cố gắng nghe thật kĩ và điền tiếng anh vào nhé!. Nếu bạn không nghe được có thể vào phần hỏi đáp để nhờ sự trợ giúp!"
                        banner
                        className="bg-bgCustomProcess text-textCustom"
                    />

                    <div className="sticky top-0 z-10 mt-2 flex items-center justify-between px-2">
                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={() => navigate(-1)}
                        >
                            <Undo2 size={20} className="text-textCustom" />
                        </div>

                        <Button type="primary" onClick={handleSubmit}>
                            Nộp bài
                        </Button>
                    </div>

                    {/* AudioWaveform */}
                    <ul className="mt-4 ">
                        {quiz.audio.map((item) => (
                            <li key={item._id}>
                                <AudioWaveform audio={item} answers={answers} setAnswers={setAnswers} />
                            </li>
                        ))}
                    </ul>

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

                    {/* Hỏi đáp */}
                    <HelpComments userDetailsData={userDetailsData} />
                </div>

                {/* Sidebar */}
                <div
                    className={`h-full min-w-[17rem] border-b border-l border-t border-bdCustom lg:static ${
                        open
                            ? 'sm:w-[50%] sm:translate-x-0 md:w-[35%] md:translate-x-0 phone:w-[80%]'
                            : 'sm:w-0 sm:translate-x-[100%] md:w-0 md:translate-x-[100%]'
                    } 
                    scrollbar z-10 overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0  
                    sm:top-24 sm:rounded-md md:fixed md:right-0 md:top-24 lg:block lg:max-w-full lg:translate-x-0`}
                >
                    <div className="scrollbar h-full w-full overflow-auto ">
                        <LessonCard handleToggleLesson={handleToggleLesson} userProcessStatusData={userProcessStatusData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
