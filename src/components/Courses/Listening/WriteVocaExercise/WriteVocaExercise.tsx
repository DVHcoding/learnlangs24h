// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment, useEffect, useRef, useState } from 'react';
import { Breadcrumb, Modal, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Undo2, Settings } from 'lucide-react';
import { Progress } from 'antd';
import { IoMdVolumeHigh } from 'react-icons/io';
import { useSpeechSynthesis } from 'react-speech-kit';
import Rating from '@mui/material/Rating';
import type { ProgressProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import removeVietnameseTones from '@utils/regexVietnamese';
import VocaExerciseData from '@components/Courses/Listening/VocaExerciseJson.json';
import { toastInfo } from '@components/Toast/Toasts';

export interface VocaExerciseResponseType {
    success: string;
    vocabularies: Sentence[];
    sentences: Sentence[];
    quiz: Quiz[];
}

export interface Quiz {
    _id: string;
    audio: Audio[];
}

export interface Audio {
    public_id: string;
    url: string;
    content: string[];
    short_content: string[];
}

export interface Sentence {
    _id: string;
    english: string;
    vietnamese: string;
}

interface GameStateType {
    answer: string;
    correctWord: CorrectWordType[];
    wordToShow: Sentence[];
    activeCard: number;
    remainWord: Sentence[];
    inCorrectWord: IncorrectWordType[];
    isWaiting: boolean;
}

interface IncorrectWordType {
    _id: string;
    english: string;
    vietnamese: string;
    count: number;
}

type CorrectWordType = Omit<IncorrectWordType, 'count'>;

type VocabularyStarsType = CorrectWordType;

interface SettingTypes {
    learnAll: boolean;
    learnStar: boolean;
    displayFirstEnglish: boolean;
    textToSpeech: boolean;
    hideWord: boolean;
}

const WriteVocaExercise = () => {
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { vocabularies }: { vocabularies: Sentence[] } = VocaExerciseData;

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const navigate = useNavigate();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const [gameState, setGameState] = useState<GameStateType>(initialGameState);
    const [rating, setRating] = useState<{ [key: string]: number }>({});
    const [vocabularyStars, setVocabularyStars] = useState<VocabularyStarsType[]>([]);
    const [activeSpeak, setActiveSpeak] = useState<string | null>(null);
    const [settings, setSettings] = useState<SettingTypes>({
        learnAll: true,
        learnStar: false,
        displayFirstEnglish: true,
        hideWord: false,
        textToSpeech: false,
    });

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

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
    const { speak, speaking } = useSpeechSynthesis();

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
                            title: <Link to={`/listening/`}>Listening</Link>,
                        },
                        {
                            title: 'write',
                        },
                    ]}
                />
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* Box */}
                <div className="w-full">
                    {/* Navigate & Progress & Setting iCion */}
                    <div className="flex items-center justify-between gap-4">
                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={() => navigate(-1)}
                        >
                            <Undo2 size={20} className="text-textCustom" />
                        </div>

                        <Progress
                            percent={Math.round(
                                // Nếu đang học chế độ học tất cả thì lấy vocabularies. Nếu đang học chế độ sao thì lấy vocabularyStars
                                // Tính phần trăm hoàn thành bằng cách lấy tổng số từ đúng chia cho tống số lượng từ * 100
                                (gameState.correctWord.length / (settings.learnAll ? vocabularies.length : vocabularyStars.length)) * 100
                            )}
                            strokeColor={twoColors}
                        />

                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={showModal}
                        >
                            <Settings size={20} className="text-textCustom" />
                        </div>
                    </div>

                    {/* Cards */}
                    {gameState.wordToShow.map((vocabulary, index) => {
                        const isCardActive = index === gameState.activeCard;
                        const isWaiting = gameState.isWaiting;

                        return (
                            <div key={vocabulary._id} className={`rounded-md p-2 shadow-md ${isCardActive ? '' : 'hidden'}`}>
                                <div className="border-b-2 border-b-bdCustom py-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className={`font-segoe text-2xl text-textCustom ${settings.hideWord ? 'opacity-0' : ''}`}>
                                            {settings.displayFirstEnglish ? vocabulary?.english : vocabulary.vietnamese}
                                        </h2>

                                        <a
                                            className="min-w-max cursor-pointer text-textCustom"
                                            onClick={() =>
                                                handleSubmit(vocabulary?._id, vocabulary?.english, vocabulary?.vietnamese, index)
                                            }
                                        >
                                            Không biết
                                        </a>
                                    </div>
                                    {isWaiting ? (
                                        <Fragment>
                                            <p className="mt-2 text-base font-semibold text-green-500">Đáp án đúng</p>
                                            <p className="font-segoe text-base text-textCustom">
                                                {settings.displayFirstEnglish ? vocabulary?.vietnamese : vocabulary.english}
                                            </p>
                                        </Fragment>
                                    ) : null}
                                </div>

                                <form>
                                    <textarea
                                        className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                        bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                        value={gameState.answer}
                                        onChange={handleChange}
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, vocabulary._id, vocabulary?.english, vocabulary?.vietnamese, index)
                                        }
                                        rows={1}
                                        ref={index === gameState.activeCard ? textAreaRef : null}
                                        spellCheck={false}
                                    />
                                </form>

                                {isWaiting ? (
                                    <h4 className="font-semibold text-red-500">Nhập lại đáp án đúng!</h4>
                                ) : (
                                    <h4 className=" text-gray-500 ">Nhập bằng tiếng việt</h4>
                                )}
                            </div>
                        );
                    })}

                    {/* Completed */}
                    {gameState.wordToShow.length <= 0 && (
                        <div
                            className="scrollbar-mess overflow-auto rounded-md bg-bgCustomCard py-4"
                            style={{ height: 'calc(100% - 2.3rem)' }}
                        >
                            <div className="mx-auto max-w-max">
                                <Progress
                                    type="dashboard"
                                    steps={8}
                                    percent={Math.round(
                                        ((vocabularies.length - gameState.inCorrectWord.length) / vocabularies.length) * 100
                                    )}
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={15}
                                    size={150}
                                />

                                <h2 className="text-center font-segoe text-textCustom">Tỉ lệ chính xác</h2>

                                <button
                                    className="mx-auto rounded-sm bg-blue-400 px-8 py-2 
                                    text-base text-white transition-all hover:scale-105"
                                    onClick={handleStartAgain}
                                >
                                    Bắt đầu lại
                                </button>
                            </div>

                            <button className="btn-success mx-auto mt-4" onClick={cancelAllStars}>
                                Hủy tất cả dấu ⭐
                            </button>

                            <ul className="mt-4 flex flex-col items-center gap-4 px-2">
                                {gameState.inCorrectWord.map((vocabulary) => (
                                    <li className="w-1/2" key={vocabulary._id}>
                                        <h3 className="font-bold text-red-400">Sai {vocabulary.count} lần!</h3>

                                        <div className="w-full rounded-md bg-bgCustomCardItem p-2 shadow-md">
                                            <div className="flex items-center justify-between">
                                                <h3
                                                    className={`text-textCustom ${activeSpeak === vocabulary._id ? 'text-yellow-500' : ''}`}
                                                >
                                                    {vocabulary.english}
                                                </h3>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleSpeakText(vocabulary.english, vocabulary._id)}
                                                        disabled={speaking}
                                                    >
                                                        <IoMdVolumeHigh
                                                            size={20}
                                                            className={`cursor-pointer text-textCustom ${
                                                                activeSpeak === vocabulary._id ? 'text-yellow-500' : ''
                                                            }`}
                                                        />
                                                    </button>

                                                    <Rating
                                                        name={`incorrect-rating-${vocabulary._id}`}
                                                        value={rating[vocabulary._id] || 0}
                                                        max={1}
                                                        onChange={(_, newValue) => handleRatingChange(vocabulary, newValue)}
                                                        className="mb-[2px]"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-textCustom">{vocabulary.vietnamese}</h3>
                                        </div>
                                    </li>
                                ))}

                                <li className="w-1/2 sm:w-full">
                                    <h3 className="font-bold text-green-400">Chưa sai câu nào!</h3>

                                    <div className="flex flex-col items-center gap-4">
                                        {gameState.correctWord.map((word: CorrectWordType) =>
                                            gameState.inCorrectWord.length === 0 ||
                                            !gameState.inCorrectWord.some((incorrect: IncorrectWordType) => incorrect._id === word._id) ? (
                                                <div key={word._id} className="w-full rounded-md bg-bgCustomCardItem p-2 shadow-md">
                                                    <div className="flex items-center justify-between">
                                                        <h3
                                                            className={`text-textCustom ${
                                                                activeSpeak === word._id ? 'text-yellow-500' : ''
                                                            }`}
                                                        >
                                                            {word.english}
                                                        </h3>

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleSpeakText(word.english, word._id)}
                                                                disabled={speaking}
                                                            >
                                                                <IoMdVolumeHigh
                                                                    size={20}
                                                                    className={`cursor-pointer text-textCustom ${
                                                                        activeSpeak === word._id ? 'text-yellow-500' : ''
                                                                    }`}
                                                                />
                                                            </button>

                                                            <Rating
                                                                name={`correct-rating-${word._id}`}
                                                                max={1}
                                                                value={rating[word._id] || 0}
                                                                onChange={(_, newValue) => handleRatingChange(word, newValue)}
                                                                className="mb-[2px]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-textCustom">{word.vietnamese}</h3>
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <Modal title="Settings" open={isModalOpen} onOk={handleChangeSettings} onCancel={handleCancelSettings}>
                    <div className="grid grid-cols-2 gap-1">
                        <button
                            className={`rounded-md p-2 ${settings.learnAll ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setSettings((preState) => ({ ...preState, learnAll: true, learnStar: false }))}
                        >
                            Học tất cả
                        </button>

                        <button
                            className={`rounded-md p-2 ${settings.learnStar ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setSettings((preState) => ({ ...preState, learnStar: true, learnAll: false }))}
                        >
                            Học các thuật ngữ có dấu sao
                        </button>
                    </div>

                    <ul className="mt-2">
                        <li className="flex items-center justify-between">
                            <h3>Hiển thị tiếng anh đầu tiên</h3>
                            <Switch
                                size="small"
                                checked={settings.displayFirstEnglish}
                                onChange={(checked) => setSettings((preState) => ({ ...preState, displayFirstEnglish: checked }))}
                            />
                        </li>

                        <li className="flex items-center justify-between">
                            <h3>Đọc nội dung</h3>
                            <Switch
                                size="small"
                                checked={settings.textToSpeech}
                                onChange={(checked) => setSettings((preState) => ({ ...preState, textToSpeech: checked }))}
                            />
                        </li>

                        <li className="flex items-center justify-between">
                            <h3>Ẩn nội dung (Nên bật đọc nội dung để nghe và điền từ)</h3>
                            <Switch
                                size="small"
                                checked={settings.hideWord}
                                onChange={(checked) => setSettings((preState) => ({ ...preState, hideWord: checked }))}
                            />
                        </li>
                    </ul>
                </Modal>
            </div>
        </div>
    );
};

export default WriteVocaExercise;
