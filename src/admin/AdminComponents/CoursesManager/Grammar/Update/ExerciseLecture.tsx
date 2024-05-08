// ##########################
// #      IMPORT NPM        #
// ##########################
import { Fragment, useEffect, useState } from 'react';
import { Tabs, Button } from 'antd';
import { X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';

// ##########################
// #    IMPORT Components   #
// ##########################
import { LessonType, QuestionType } from 'types/api-types';
import { useGetAllLessonsByCourseIdQuery, useGetFillBlankExerciseQuery, useGetUnitLessonByIdQuery } from '@store/api/courseApi';
import { toastError } from '@components/Toast/Toasts';
import { AppDispatch, RootState } from '@store/store';
import { updateUnitLessonAndFillBlankExercise } from '@store/reducer/courseReducer';

// #############################################
const ExerciseLecture: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading: updateUnitLessonAndFillBlankExerciseLoading } = useSelector(
        (state: RootState) => state.updateUnitLessonAndFillBlankExercise
    );

    const { id: courseId, unitId } = useParams<string>();

    // RTK query data
    const { data: fillBlankExercise, isLoading: getFillBlankExerciseLoading } = useGetFillBlankExerciseQuery(unitId || 'undefined');
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(unitId || 'undefined');
    const { data: lessons, isLoading: getAllLessonsByCourseIdLoading } = useGetAllLessonsByCourseIdQuery(courseId || 'undefined');

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [title, setTitle] = useState<string>('');
    const [unitTime, setUnitTime] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [date, setDate] = useState<string>();

    const [questions, setQuestions] = useState<QuestionType[]>([]);

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */
    const handleUpdateForm: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        if (!unitId || title === '' || unitTime === '' || chapter === '' || !questions || questions.length === 0) {
            toastError('Please Enter All Fields');
        }

        try {
            await dispatch(updateUnitLessonAndFillBlankExercise({ _id: unitId!, title, time: unitTime, lesson: chapter, questions }));
            window.location.reload();
        } catch (error) {
            toastError('Có lỗi xảy ra!');
        }
    };

    console.log(questions);

    const handleAddQuestion: () => void = () => {
        const newItem: QuestionType = { sentence: '', correctAnswer: [''], otherAnswer: [''] };
        setQuestions([...questions, newItem]);
    };

    const handleDeleteQuestion = (questionIndex: number) => {
        const updatedQuestions = questions.filter((_question, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    useEffect(() => {
        if (unitId) {
            if (unitLesson?.unitLesson) {
                setTitle(unitLesson.unitLesson.title);
                setUnitTime(unitLesson.unitLesson.time);
                setDate(dayjs(unitLesson.unitLesson.createAt).format('YYYY-MM-DD HH:mm:ss'));
                setChapter(unitLesson.unitLesson.lesson);
            }

            if (fillBlankExercise?.success) {
                setQuestions(fillBlankExercise?.fillBlankExercise.questions);
            }
        }
    }, [unitId, unitLesson, fillBlankExercise]);

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
                                    <form className="flex flex-col gap-4" onSubmit={handleUpdateForm}>
                                        <div className="flex items-center gap-4">
                                            <button
                                                className={`${
                                                    updateUnitLessonAndFillBlankExerciseLoading ? 'btn-disabled' : 'btn-primary'
                                                } max-w-max`}
                                                disabled={updateUnitLessonAndFillBlankExerciseLoading}
                                            >
                                                Cập nhật
                                            </button>
                                            {updateUnitLessonAndFillBlankExerciseLoading && <Loader content="Loading..." />}
                                        </div>

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
                                                onChange={(e) => setUnitTime(e.target.value)}
                                                value={unitTime}
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
                                                        onClick={() => handleDeleteQuestion(index)}
                                                    />

                                                    <div>
                                                        {/* Question sentence */}
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

                                                        {/* Answers */}
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

                                                        {/* Other Answers */}
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
