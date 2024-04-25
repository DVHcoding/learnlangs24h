import React, { Fragment, useState } from 'react';
// ##################################
// #       IMPORT Components
// ##################################
import PracticeQuestion from './PracticeQuestion.json';
import Grammar from './Grammar.json';
import { BlankQuestionType, LessonItemsType, LessonsType, Question } from 'types/types';

// ##################################
// #       IMPORT Npm
// ##################################
import { useSearchParams } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ############################################
const BlankQuestionCard: React.FC = () => {
    const navigate = useNavigate();
    // Lấy giá trị `id` bài đang học từ URL bằng cách sử dụng hook `useSearchParams`
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    // Tìm kiếm `lectureId` từ dữ liệu `PracticeQuestion.blankQuestions` dựa trên `id` từ URL
    const lectureId = PracticeQuestion.blankQuestions.find((lectureItem: BlankQuestionType) => {
        return lectureItem.lessonId === id;
    });

    // Khởi tạo state `answers` dùng để lưu trữ câu trả lời từ người dùng
    const [answers, setAnswers] = useState([]);
    // Khởi tạo state `results` và `allCorrect` để theo dõi kết quả kiểm tra và trạng thái
    // tất cả câu trả lời đúng hay không
    const [results, setResults] = useState<boolean>(false);
    const [allCorrect, setAllCorrect] = useState<boolean>(false);

    // Hàm này được gọi khi người dùng nhập câu trả lời, nó cập nhật giá trị của `answers`
    const getValueAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        questionIndex: number
    ) => {
        const inputValue = e.target.value.trim(); // Remove leading and trailing spaces

        if (inputValue !== '') {
            const newAnswers = [...answers];
            newAnswers[questionIndex] = newAnswers[questionIndex] || [''];
            (newAnswers[questionIndex] as string[])[index] = inputValue;
            setAnswers(newAnswers);
        }
    };

    // ############################################
    // Hàm kiểm tra kết quả của các câu trả lời
    const handleChecking = () => {
        setResults(true);

        // Kiểm tra xem tất cả các giá trị của ô input có chính xác không
        // Trường hợp otherAnswer vẫn được chấp nhận và tất cả giá trị sẽ
        // được chuyển về chữ thường.
        const correct = lectureId?.questions.every(
            (question: Question, questionIndex: number) =>
                question.correctAnswers.some(
                    (correctAnswer: string) =>
                        correctAnswer.toLowerCase() ===
                        (answers[questionIndex] as string)?.[0].toLowerCase()
                ) ||
                question.otherAnswers?.some(
                    (otherAnswer) =>
                        otherAnswer.toLowerCase() ===
                        (answers[questionIndex] as string)?.[0].toLowerCase()
                )
        );

        if (correct) {
            setAllCorrect(correct); // Set state accordingly
        }
    };

    // Hàm này chuyển hướng đến bài học tiếp theo dựa trên `id` của bài học hiện tại
    const nextLessonItem = () => {
        let indexLessonItem: number = 0;
        let getNextIdLesson: string;

        // Tìm index của bài đang học tương ứng với id lấy trên Url
        const indexLesson = Grammar.lessons.findIndex((lesson: LessonsType) => {
            return lesson.lessonItems.some((lessonItem: LessonItemsType) => {
                return lessonItem.id === id;
            });
        });

        // Tìm index của lessonItem tương ứng với indexLesson ở trên và gán cho biến indexLessonItem
        Grammar.lessons[indexLesson].lessonItems.forEach(
            (lesson: LessonItemsType, index: number) => {
                if (lesson.id === id) {
                    indexLessonItem = index;
                }
            }
        );

        // Lấy chiều dài của lessonItems
        const getLengthLessonItem = Grammar.lessons[indexLesson].lessonItems.length;

        // Nếu là bài học cuối của lessonItems thì chuyến của lesson Parent Tiếp theo.
        // Nếu Lesson Parent cuối thì dừng lại ở bài lessonItems đó
        if (indexLessonItem === getLengthLessonItem - 1) {
            if (Grammar.lessons[indexLesson + 1]?.lessonItems[0].id === undefined) {
                getNextIdLesson = Grammar.lessons[indexLesson]?.lessonItems[indexLessonItem]?.id;
            } else {
                getNextIdLesson = Grammar.lessons[indexLesson + 1]?.lessonItems[0].id;
            }
        } else {
            getNextIdLesson = Grammar.lessons[indexLesson].lessonItems[indexLessonItem + 1]?.id;
        }

        navigate(`/grammar?id=${getNextIdLesson}`);
    };

    // ############################################
    return (
        <div className="p-4 phone:mb-4 phone:p-0">
            <h2 className="font-title text-xl font-bold text-textCustom">Thực hành thì Hiện đơn</h2>
            <p className="text-base text-textCustom">Cap nhat Thang 3 nam 2024</p>

            <p className="font-body text-base font-semibold text-red-400 phone:text-sm pm:text-sm">
                Hãy sử dụng lại kiến thức đã học ở bài trước để giải các câu dưới đây nhé!
            </p>

            <ul className="mt-2">
                {lectureId?.questions.map((question: Question, questionIndex: number) => (
                    <div className="mb-2 flex flex-wrap justify-start gap-2" key={questionIndex}>
                        {question.sentence.split('______').map((part: string, index: number) => (
                            <Fragment key={index}>
                                <p className="font-body text-base font-medium text-textCustom">
                                    {part}
                                </p>
                                {index !== question.sentence.split('______').length - 1 && (
                                    <Fragment>
                                        <input
                                            className={`w-32 rounded border border-slate-400 bg-bgCustom pl-1 font-body font-bold text-textCustom focus:border-blue-400`}
                                            type="text"
                                            onChange={(e) =>
                                                getValueAnswer(e, index, questionIndex)
                                            }
                                        />

                                        {results ? (
                                            question.correctAnswers[index]?.toLowerCase() ===
                                                (answers[questionIndex] as string)?.[
                                                    index
                                                ]?.toLowerCase() ||
                                            question.otherAnswers?.[index]?.toLowerCase() ===
                                                (answers[questionIndex] as string)?.[
                                                    index
                                                ]?.toLowerCase() ? (
                                                <Check className="text-green-500" size={18} />
                                            ) : (
                                                <X className="text-red-500" size={18} />
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </Fragment>
                                )}
                            </Fragment>
                        ))}
                    </div>
                ))}
            </ul>

            <div className="mt-4 flex items-center justify-center gap-2">
                <button onClick={handleChecking} className="btn-primary font-body font-medium">
                    Kiểm tra
                </button>

                <button
                    onClick={() => nextLessonItem()}
                    className={`${
                        allCorrect ? 'btn-success' : 'btn-disabled'
                    } font-body font-medium`}
                    disabled={allCorrect ? false : true}
                >
                    Bài tiếp theo
                </button>
            </div>
        </div>
    );
};

export default BlankQuestionCard;
