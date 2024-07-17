// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useEffect, useMemo, useRef, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { toastInfo } from '@components/Toast/Toasts';
import removeVietnameseTones from '@utils/regexVietnamese';
import { useUnitLessonProcess } from '@hooks/useUnitLessonProcess';
import { useUserDetailsQuery } from '@store/api/userApi';
import { useGetAllUnitLessonsByCourseIdQuery, useGetUserProcessStatusesQuery, useGetVocaExerciseQuery } from '@store/api/courseApi';
import { useAutoResizeTextArea } from '@hooks/useAutoResizeTextarea';
import { Sentence } from 'types/api-types';
import { GameStateType, SettingTypes, VocabularyStarsType } from './WriteVocaExercise.types';
import SettingsModel from './SettingsModel';
import TopbarProgress from './TopbarProgress';

const WriteVocaExercise: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    const { id: courseId } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    let id = searchParams.get('id');
    const { data: vocaExerciseData } = useGetVocaExerciseQuery(id, { skip: !id });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    const { vocabularies = [] } = vocaExerciseData?.vocaExercise || {};

    const lastWordIndex: number = vocabularies.length - 1;
    const initialGameState = {
        answer: '',
        correctWord: [],
        wordToShow: lastWordIndex >= 10 ? vocabularies.slice(0, 10) : vocabularies,
        activeCard: 0,
        remainWord: lastWordIndex >= 10 ? vocabularies.slice(10, vocabularies.length) : [],
        inCorrectWord: [],
        isWaiting: false,
    };

    const initialSettings = {
        learnAll: true,
        learnStar: false,
        displayFirstEnglish: true,
        hideWord: false,
        textToSpeech: false,
    };

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [gameState, setGameState] = useState<GameStateType>(initialGameState);
    const [rating, setRating] = useState<{ [key: string]: number }>({});
    const [vocabularyStars, setVocabularyStars] = useState<VocabularyStarsType[]>([]);
    const [activeSpeak, setActiveSpeak] = useState<string | null>(null);
    const [settings, setSettings] = useState<SettingTypes>(initialSettings);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetailsData } = useUserDetailsQuery();
    const userId = useMemo(() => userDetailsData?.user?._id, [userDetailsData?.user]);

    const { refetch: userProcessRefetch } = useGetUserProcessStatusesQuery(userId, { skip: !userId });
    const { data: allUnitLessonData } = useGetAllUnitLessonsByCourseIdQuery(courseId, { skip: !courseId });

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGameState((prevState) => ({
            ...prevState,
            answer: e.target.value,
        }));
    };

    const handleSubmit = (_id: string, english: string, vietnamese: string, indexAnswer: number) => {
        const englishRemoveTone = removeVietnameseTones(english.toLowerCase());
        const vietnameseRemoveTone = removeVietnameseTones(vietnamese.toLowerCase());
        const answerRemoveTone = removeVietnameseTones(gameState.answer.toLowerCase());
        // random ra vị trí index của mảng wordToShow. Giả sử mảng có chiều dài là 10
        // Tức là chạy từ (0 - 9). Hàm Math sẽ random từ 0 -> nhỏ hơn 10 (Tức chiều dài của mảng)
        const randomDisplayIndex = Math.floor(Math.random() * gameState.wordToShow.length);

        const handleCorrectWord = (): void => {
            textAreaRef.current?.focus();

            setGameState((prevState) => {
                const newWordToShow = [...prevState.wordToShow];
                const newRemainWord = [...prevState.remainWord];
                const newCorrectWord = [...prevState.correctWord, { _id, english, vietnamese }];

                if (!prevState.isWaiting) {
                    // Từ nào đúng rồi thì cắt ra bỏ vào newCorrectWord
                    newWordToShow.splice(indexAnswer, 1);

                    // Nếu remainWord không rỗng, lấy một từ ngẫu nhiên từ remainWord và thêm vào wordToShow
                    if (newRemainWord.length > 0) {
                        // random ra vị trí index của mảng dự trữ
                        const randomRemainIndex = Math.floor(Math.random() * newRemainWord.length);

                        // random ra word từ vị trí index lấy ở trên
                        const randomRemainWord = newRemainWord[randomRemainIndex];
                        // Chèn từ mới từ kho dự trữ vào
                        newWordToShow.splice(randomDisplayIndex, 0, randomRemainWord);
                        // Từ ở kho dự chữ được chén vào trong mảng hiển thị rồi thì cần loại bỏ ra
                        // khỏi mảng dự trữ
                        newRemainWord.splice(randomRemainIndex, 1);
                    }

                    return {
                        ...prevState,
                        correctWord: newCorrectWord,
                        wordToShow: shuffleArray(newWordToShow),
                        remainWord: newRemainWord,
                        answer: '',
                        isWaiting: false,
                    };
                } else {
                    // Lấy word không chính xác ra bỏ vào biến này split sẽ cắt ra thành 1 mảng
                    // chỉ có 1 phần tử nên ta có thể [0] để lấy ra từ đó luôn
                    // Ví dụ (["example"]) thì [0] sẽ ra từ "example"
                    const incorrectWord = newWordToShow.splice(indexAnswer, 1)[0];
                    // random ra vị trí mới trong khoảng từ 0 đến độ dài của mảng display
                    const randomIndex = Math.floor(Math.random() * newWordToShow.length);
                    // Nối word không chính xác vào mảng hiển thị nhưng với vị trí khác (random)
                    newWordToShow.splice(randomIndex, 0, incorrectWord);
                    return {
                        ...prevState,
                        wordToShow: shuffleArray(newWordToShow),
                        answer: '',
                        isWaiting: false,
                    };
                }
            });
        };

        const handleIncorrectWord = (): void => {
            setGameState((prevState) => {
                const updatedInCorrectWord = [...prevState.inCorrectWord];
                /**
                 * Dùng findIndex để tìm vị trí của từ trong updatedInCorrectWord dựa
                 * trên _id của từ từ prevState.wordToShow[indexAnswer].
                 *
                 * Nếu wordIndex bằng -1, tức là từ chưa tồn tại trong danh sách updatedInCorrectWord,
                 * ta thêm từ mới vào danh sách với _id, word, và count bằng 1.
                 *
                 * Nếu wordIndex khác -1, tức là từ đã tồn tại trong danh sách, ta tăng
                 * giá trị count lên 1 cho từ tại vị trí wordIndex.
                 */
                const wordIndex = updatedInCorrectWord.findIndex((word) => word._id === prevState.wordToShow[indexAnswer]._id);

                if (wordIndex === -1) {
                    updatedInCorrectWord.push({
                        _id: prevState.wordToShow[indexAnswer]._id,
                        english: prevState.wordToShow[indexAnswer].english,
                        vietnamese: prevState.wordToShow[indexAnswer].vietnamese,
                        count: 1,
                    });
                } else {
                    // Nếu trường hợp isWaiting === false (Tức là lần đầu sai thì mới)
                    // được tăng lên 1

                    // Còn nếu trường hợp người dùng nhập sai rồi và nhập lại vẫn cố tình sai
                    // thì sẽ không tăng
                    if (!prevState.isWaiting) {
                        updatedInCorrectWord[wordIndex].count += 1;
                    }
                }

                return {
                    ...prevState,
                    inCorrectWord: updatedInCorrectWord,
                    answer: '',
                    isWaiting: true,
                };
            });
        };

        // Nếu settings là hiển thị tiếng anh đầu tiên thì kiểm tra xem chữ nhập vào có bằng với kết quả tiếng việt ko
        // Nếu settings là hiển thị tiếng việt đầu tiên thì kiểm tra xem chữ nhập vào có bằng với kết quả tiếng anh ko
        const correctVietnameseAnswer: boolean = vietnameseRemoveTone.trim() === answerRemoveTone.trim();
        const correctEnglishAnswer: boolean = englishRemoveTone.trim() === answerRemoveTone.trim();
        if (settings.displayFirstEnglish ? correctVietnameseAnswer : correctEnglishAnswer) {
            handleCorrectWord();
        } else {
            handleIncorrectWord();
        }

        // Khi sử dụng setTimeout để gọi focus vào textarea, bạn thực sự đang khai thác
        // một tính năng của JavaScript và React để đảm bảo rằng việc focus vào phần tử
        // diễn ra sau khi một số công việc khác, như việc cập nhật state và render, đã hoàn tất.
        // Dưới đây là một cái nhìn sâu hơn về lý do tại sao setTimeout có thể cần thiết và các giải pháp thay thế.
        setTimeout(() => {
            textAreaRef.current?.focus();
        }, 0);
    };

    // Hàm random vị trí các từ trong mảng
    const shuffleArray = (sentences: Sentence[]): Sentence[] => {
        // Bắt đầu từ phần tử cuối cùng và lặp ngược lại
        for (let currentIndex = sentences.length - 1; currentIndex > 0; currentIndex--) {
            // Chọn một chỉ số ngẫu nhiên từ 0 đến currentIndex
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

            // Hoán đổi phần tử ở currentIndex với phần tử ở randomIndex
            [sentences[currentIndex], sentences[randomIndex]] = [sentences[randomIndex], sentences[currentIndex]];
        }
        return sentences;
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>,
        _id: string,
        english: string,
        vietnamese: string,
        indexAnswer: number
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            handleSubmit(_id, english, vietnamese, indexAnswer);
        }
    };

    const handleResetGameState = (): void => {
        setGameState(initialGameState);
    };

    const handleSpeakText = (value: string, _id: string): void => {
        setActiveSpeak(_id);

        speak({
            text: value,
        });
    };

    const handleRatingChange = (vocabulary: VocabularyStarsType, newValue: number | null) => {
        if (newValue === 1) {
            // Chỉ thêm vào vocabularyStars khi giá trị là 1
            setVocabularyStars((prev) => [
                ...prev,
                { _id: vocabulary._id, english: vocabulary.english, vietnamese: vocabulary.vietnamese },
            ]);
        } else {
            // Loại bỏ khỏi vocabularyStars khi giá trị không phải là 1
            setVocabularyStars((prev) => prev.filter((item) => item._id !== vocabulary._id));
        }
        setRating((prev) => ({ ...prev, [vocabulary._id]: newValue || 0 }));
    };

    const cancelAllStars = () => {
        setRating({});
        setVocabularyStars([]);
    };

    const handleChangeSettings = (): void => {
        if (vocabularyStars.length <= 0 && settings.learnStar) {
            toastInfo('Bạn chưa lưu thuật ngữ nào!');
            return;
        }

        const numberOfWordsToShow = 10; // Số lượng từ cần hiển thị

        // Khởi tạo biến chứa danh sách từ vựng và từ còn lại
        let wordsToShow: Sentence[] = [];
        let remainWords: Sentence[] = [];

        // Xác định chế độ học tất cả từ vựng và số lượng từ hiện có
        switch (true) {
            case settings.learnAll && lastWordIndex >= numberOfWordsToShow:
                // Nếu chế độ học tất cả từ vựng và số lượng từ >= 10
                wordsToShow = vocabularies.slice(0, numberOfWordsToShow);
                remainWords = vocabularies.slice(numberOfWordsToShow);
                break;
            case settings.learnAll:
                // Nếu chế độ học tất cả từ vựng nhưng số lượng từ < 10
                wordsToShow = vocabularies;
                remainWords = [];
                break;
            case !settings.learnAll && lastWordIndex >= numberOfWordsToShow:
                // Nếu không phải chế độ học tất cả từ vựng và số lượng từ >= 10
                wordsToShow = vocabularyStars.slice(0, numberOfWordsToShow);
                remainWords = vocabularyStars.slice(numberOfWordsToShow);
                break;
            default:
                // Nếu không phải chế độ học tất cả từ vựng và số lượng từ < 10
                wordsToShow = vocabularyStars;
                remainWords = [];
                break;
        }

        setGameState({
            answer: '',
            correctWord: [],
            wordToShow: wordsToShow,
            activeCard: 0,
            remainWord: remainWords,
            inCorrectWord: [],
            isWaiting: false,
        });
        setIsModalOpen(false);
    };

    const handleCancelSettings = (): void => {
        setSettings((preState) => ({
            ...preState,
            learnAll: true,
            learnStar: false,
        }));

        setGameState(initialGameState);
        setIsModalOpen(false);
    };

    const handleStartAgain = (): void => {
        if (settings.learnAll || vocabularyStars.length === 0) {
            handleResetGameState();
            handleCancelSettings();
        } else {
            handleChangeSettings();
        }
    };

    // Hàm xử lý âm thanh khi bật setting text to speech
    const textToSpeech = (): void => {
        if (settings.textToSpeech) {
            speak({ text: gameState?.wordToShow?.[0]?.english });
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */
    const { speak, speaking }: { speak: ({ text }: { text: string }) => void; speaking: boolean } = useSpeechSynthesis();
    useUnitLessonProcess({ userId, id, allUnitLessonData, userProcessRefetch });
    useAutoResizeTextArea(textAreaRef, gameState.answer);

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (!speaking) {
            setActiveSpeak(null);
        }
    }, [speaking]);

    useEffect(() => {
        textToSpeech();
    }, [gameState.wordToShow, settings.textToSpeech]);

    return (
        <div className="overflow-hidden px-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumb */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to={`/listening/${courseId}`}>Listening</Link>,
                        },
                        {
                            title: 'Write',
                        },
                        {
                            title: 'Vocabulary',
                        },
                    ]}
                />
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* Box */}
                <TopbarProgress
                    id={id}
                    courseId={courseId}
                    gameState={gameState}
                    activeSpeak={activeSpeak}
                    rating={rating}
                    settings={settings}
                    speaking={speaking}
                    textAreaRef={textAreaRef}
                    vocabularies={vocabularies}
                    vocabularyStars={vocabularyStars}
                    cancelAllStars={cancelAllStars}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    handleRatingChange={handleRatingChange}
                    handleSpeakText={handleSpeakText}
                    handleStartAgain={handleStartAgain}
                    handleSubmit={handleSubmit}
                    showModal={showModal}
                    textToSpeech={textToSpeech}
                />

                {/* Settings */}
                <SettingsModel
                    isModalOpen={isModalOpen}
                    settings={settings}
                    setSettings={setSettings}
                    handleChangeSettings={handleChangeSettings}
                    handleCancelSettings={handleCancelSettings}
                />
            </div>
        </div>
    );
};

export default WriteVocaExercise;
