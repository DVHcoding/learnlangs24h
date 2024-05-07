// ##########################
// #      IMPORT NPM        #
// ##########################
import { Fragment, useEffect, useState } from 'react';
import { Tabs, Button } from 'antd';
import { X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// ##########################
// #    IMPORT Components   #
// ##########################
import { LessonType, QuestionType } from 'types/api-types';
import { useGetAllLessonsByCourseIdQuery, useGetFillBlankExerciseQuery, useGetUnitLessonByIdQuery } from '@store/api/courseApi';

// #############################################
const ExerciseLecture: React.FC = () => {
    const { id: courseId, unitId } = useParams<string>();

    // RTK query data
    const { data: fillBlankExercise, isLoading: getFillBlankExerciseLoading } = useGetFillBlankExerciseQuery(unitId || 'undefined');
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(unitId || 'undefined');
    const { data: lessons, isLoading: getAllLessonsByCourseIdLoading } = useGetAllLessonsByCourseIdQuery(courseId || 'undefined');

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [title, setTitle] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>();
    const [chapter, setChapter] = useState<string>('');

    const [questions, setQuestions] = useState<QuestionType[]>([]);

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */
    const handleAddQuestion: () => void = () => {
        const newItem: QuestionType = { _id: `${Date.now()}`, sentence: '', correctAnswer: [''], otherAnswer: [''] };
        setQuestions([...questions, newItem]);
    };

    const handleDeleteQuestion = (questionId: string) => {
        const updatedQuestions = questions.filter((question) => question._id !== questionId);
        setQuestions(updatedQuestions);
    };

    useEffect(() => {
        if (unitId) {
            if (unitLesson?.unitLesson) {
                setTitle(unitLesson.unitLesson.title);
                setTime(unitLesson.unitLesson.time);
                setDate(dayjs(unitLesson.unitLesson.createAt).format('YYYY-MM-DD HH:mm:ss'));
                setChapter(unitLesson.unitLesson.lesson);
            }

            if (fillBlankExercise?.success) {
                setQuestions(fillBlankExercise?.fillBlankExercise.questions);
            }
        }
    }, [unitId, unitLesson, fillBlankExercise]);

    console.log(questions);

    return (
        <Fragment>
            {!getFillBlankExerciseLoading &&
                !getUnitLessonByIdLoading &&
                !getAllLessonsByCourseIdLoading &&
                fillBlankExercise?.success &&
                unitLesson?.success &&
                lessons?.success && (
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                label: 'Thông tin chung',
                                key: '1',
                                children: (
                                    <form className="flex flex-col gap-4">
                                        <button className="btn-primary max-w-max">Cập nhật</button>
                                        <div>
                                            <span className="font-body font-bold">Tên (*)</span>
                                            <input
                                                onChange={(e) => setTitle(e.target.value)}
                                                value={title}
                                                type="text"
                                                className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                sm:w-full"
                                            />
                                        </div>

                                        <div>
                                            <span className="font-body font-bold">Thời gian (*)</span>
                                            <input
                                                onChange={(e) => setTime(e.target.value)}
                                                value={time}
                                                type="text"
                                                className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                sm:w-full"
                                            />
                                        </div>

                                        <div>
                                            <span className="font-body font-bold">Ngày tạo (*)</span>
                                            <input
                                                onChange={(e) => setDate(e.target.value)}
                                                value={date}
                                                type="datetime-local"
                                                className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                sm:w-full"
                                            />
                                        </div>

                                        <div>
                                            <span className="font-body font-bold">Chương học (*)</span>
                                            <select
                                                id="small"
                                                className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                                value={chapter} // select trùng với value option nào thì cái đó tự select
                                                onChange={(e) => setChapter(e.target.value)}
                                            >
                                                <option disabled>--- Chọn chương ---</option>
                                                {lessons.lessons.map((lesson: LessonType) => (
                                                    <option value={lesson._id} key={lesson._id}>
                                                        {lesson.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <span className="font-body font-bold">Loại bài học (*)</span>
                                            <select
                                                id="small"
                                                className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                                p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                                defaultValue={'exercise'}
                                            >
                                                <option value="exercise">Thực hành</option>
                                            </select>
                                        </div>

                                        <div>
                                            <span className="font-body font-bold">Loại bài tập (*)</span>
                                            <select
                                                id="small"
                                                className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                                p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                                defaultValue={'fillBlankExercise'}
                                            >
                                                <option value="fillBlankExercise">Điền vào chỗ trống</option>
                                            </select>
                                        </div>
                                    </form>
                                ),
                            },
                            {
                                label: 'Câu hỏi',
                                key: '2',
                                children: (
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
                                                        onClick={() => handleDeleteQuestion(question._id)}
                                                    />

                                                    <div>
                                                        <div>
                                                            <span className="select-none font-body font-bold">Câu hỏi (*)</span>
                                                            <input
                                                                onChange={(e) => {
                                                                    // Tạo một bản sao của mảng questions với các thay đổi cần thiết
                                                                    const updatedQuestions = questions.map(
                                                                        (questionItem: QuestionType, questionIndex: number) => {
                                                                            // Kiểm tra nếu index của câu hỏi hiện tại trong mảng trùng với index
                                                                            // của câu hỏi mà người dùng đang chỉnh sửa
                                                                            if (questionIndex === index) {
                                                                                // Trả về một bản sao của câu hỏi hiện tại với thuộc tính sentence được
                                                                                // cập nhật với giá trị mới từ trường input
                                                                                return { ...questionItem, sentence: e.target.value };
                                                                            }
                                                                            // Trả về câu hỏi không được chỉnh sửa
                                                                            return questionItem;
                                                                        }
                                                                    );
                                                                    // Cập nhật mảng questions với các thay đổi mới
                                                                    setQuestions(updatedQuestions);
                                                                }}
                                                                value={question?.sentence || ''}
                                                                type="text"
                                                                className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 p-1
                                                              focus:border-blue-400"
                                                            />
                                                        </div>

                                                        <div>
                                                            <span className="select-none font-body font-bold">Đáp án (*)</span>
                                                            <input
                                                                onChange={(e) => {
                                                                    const updateAnswers = questions.map(
                                                                        (questionItem: QuestionType, questionIndex: number) => {
                                                                            if (questionIndex === index) {
                                                                                // Chia chuỗi thành một mảng các từ bằng dấu phẩy
                                                                                const answerArray = e.target.value
                                                                                    .split(',')
                                                                                    .map((answer) => answer.trim());

                                                                                return { ...questionItem, correctAnswer: answerArray };
                                                                            }
                                                                            return questionItem;
                                                                        }
                                                                    );
                                                                    // Cập nhật mảng questions với các thay đổi mới
                                                                    setQuestions(updateAnswers);
                                                                }}
                                                                value={question.correctAnswer.join(', ') || []}
                                                                type="text"
                                                                className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 p-1
                                                              focus:border-blue-400"
                                                            />
                                                        </div>

                                                        <div>
                                                            <span className="select-none font-body font-bold">Đáp án khác (*)</span>
                                                            <input
                                                                onChange={(e) => {
                                                                    const updateAnswers = questions.map(
                                                                        (questionItem: QuestionType, questionIndex: number) => {
                                                                            if (questionIndex === index) {
                                                                                // Chia chuỗi thành một mảng các từ bằng dấu phẩy
                                                                                const answerArray = e.target.value
                                                                                    .split(',')
                                                                                    .map((answer) => answer.trim());

                                                                                return { ...questionItem, otherAnswer: answerArray };
                                                                            }
                                                                            return questionItem;
                                                                        }
                                                                    );
                                                                    // Cập nhật mảng questions với các thay đổi mới
                                                                    setQuestions(updateAnswers);
                                                                }}
                                                                value={question.otherAnswer.join(', ') || []}
                                                                type="text"
                                                                className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300
                                                                p-1 focus:border-blue-400"
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ),
                            },
                            {
                                label: 'Bình luận',
                                key: '3',
                                children: 'Tab 3',
                            },
                        ]}
                    />
                )}
        </Fragment>
    );
};

export default ExerciseLecture;
