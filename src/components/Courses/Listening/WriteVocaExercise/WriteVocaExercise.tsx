// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useRef, useState } from 'react';
import { Breadcrumb, Modal, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Undo2, Settings } from 'lucide-react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import removeVietnameseTones from '@utils/regexVietnamese';
import VocaExerciseData from '@components/Courses/Listening/VocaExerciseJson.json';

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
    correctWord: string[];
    wordToShow: Sentence[];
    activeCard: number;
    remainWord: Sentence[];
    inCorrectWord: IncorrectWordType[];
    isWaiting: boolean;
}

interface IncorrectWordType {
    _id: string;
    word: string;
    count: number;
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
    const [gameState, setGameState] = useState<GameStateType>({
        answer: '',
        correctWord: [],
        wordToShow: lastWordIndex >= 10 ? vocabularies.slice(0, 10) : vocabularies.slice(0, lastWordIndex),
        activeCard: 0,
        remainWord: lastWordIndex >= 10 ? vocabularies.slice(10, vocabularies.length) : [],
        inCorrectWord: [],
        isWaiting: false,
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

    const handleSubmit = (_id: string, vietnamese: string, indexAnswer: number) => {
        const vietnameseRemoveTone = removeVietnameseTones(vietnamese.toLowerCase());
        const answerRemoveTone = removeVietnameseTones(gameState.answer.toLowerCase());
        // random ra vị trí index của mảng wordToShow. Giả sử mảng có chiều dài là 10
        // Tức là chạy từ (0 - 9). Hàm Math sẽ random từ 0 -> nhỏ hơn 10 (Tức chiều dài của mảng)
        const randomDisplayIndex = Math.floor(Math.random() * gameState.wordToShow.length);

        const handleCorrectWord = (): void => {
            setGameState((prevState) => {
                const newWordToShow = [...prevState.wordToShow];
                const newRemainWord = [...prevState.remainWord];
                const newCorrectWord = [...prevState.correctWord, vietnameseRemoveTone];

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
                        word: prevState.wordToShow[indexAnswer].english,
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

        if (vietnameseRemoveTone === answerRemoveTone) {
            handleCorrectWord();
        } else {
            handleIncorrectWord();
        }
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, _id: string, vietnamese: string, indexAnswer: number) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            handleSubmit(_id, vietnamese, indexAnswer);
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

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
                    <div className="flex items-center justify-between gap-4">
                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={() => navigate(-1)}
                        >
                            <Undo2 size={20} className="text-textCustom" />
                        </div>

                        <Progress
                            percent={Math.round((gameState.correctWord.length / vocabularies.length) * 100)}
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

                    {gameState.wordToShow.map((vocabulary, index) => {
                        const isCardActive = index === gameState.activeCard;
                        const isWaiting = gameState.isWaiting;
                        const hasCorrectAnswer = !isWaiting && vocabulary?.vietnamese === gameState.answer;

                        return (
                            <div key={vocabulary._id} className={`rounded-md p-2 shadow-md ${isCardActive ? '' : 'hidden'}`}>
                                <div className="border-b-2 border-b-bdCustom py-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-segoe text-2xl">{vocabulary?.english}</h2>
                                        <a
                                            className="min-w-max cursor-pointer"
                                            onClick={() => handleSubmit(vocabulary?._id, vocabulary?.vietnamese, index)}
                                        >
                                            Không biết
                                        </a>
                                    </div>
                                    {isWaiting ? (
                                        <>
                                            <p className="mt-2 text-base font-semibold text-green-500">Đáp án đúng</p>
                                            <p className="font-segoe text-base">{vocabulary?.vietnamese}</p>
                                        </>
                                    ) : null}
                                </div>

                                <form>
                                    <textarea
                                        className={`mt-10 w-full resize-none border-b-4 border-b-green-200 bg-transparent p-1 text-justify text-lg outline-none ${
                                            hasCorrectAnswer ? 'border-b-4 border-green-500' : ''
                                        }`}
                                        value={gameState.answer}
                                        onChange={handleChange}
                                        onKeyDown={(e) => handleKeyDown(e, vocabulary._id, vocabulary?.vietnamese, index)}
                                        rows={1}
                                        ref={textAreaRef}
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

                    {gameState.wordToShow.length <= 0 && <p>Ban da hoan thanh</p>}
                </div>

                <Modal title="Settings" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="btn-disabled">Hoc het</button>
                        <button className="btn-primary">Học các thuật ngữ có dấu sao</button>
                    </div>

                    <ul className="mt-2">
                        <li className="flex items-center justify-between">
                            <h3>Hiển thị tiếng anh đầu tiên</h3>
                            <Switch size="small" defaultChecked />
                        </li>

                        <li className="flex items-center justify-between">
                            <h3>Đọc nội dung</h3>
                            <Switch size="small" />
                        </li>

                        <li className="flex items-center justify-between">
                            <h3>Ẩn nội dung (Nên bật đọc nội dung để nghe và điền từ)</h3>
                            <Switch size="small" />
                        </li>
                    </ul>
                </Modal>
            </div>
        </div>
    );
};

export default WriteVocaExercise;
