// ##################################
// #       IMPORT Npm
// ##################################
import React, { useState, Fragment } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { X } from 'lucide-react';

// ##################################
// #       IMPORT Components
// ##################################
import { RootState, AppDispatch } from '@store/store';
import { AllUnitLessonsResponseType, CourseType, LessonType, QuestionType } from 'types/api-types';
import { createNewUnitLessonAndVideoLectureContent } from '@store/reducer/courseReducer';
import { useGetAllCoursesQuery, useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';
import { toastError } from '@components/Toast/Toasts';

// ##################################
const CreateUnit: React.FC<{
    data: AllUnitLessonsResponseType | undefined;
    isLoading: boolean;
    reloadData: () => void;
}> = ({ data, reloadData }) => {
    const { data: courses, isLoading: allCoursesLoading } = useGetAllCoursesQuery();

    const dispatch: AppDispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.newUnitLessonAndVideoLectureContent);

    // ##########################
    // #      STATE MANAGER     #
    // ##########################
    const [unitName, setUnitName] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [lectureType, setLectureType] = useState<string>('');
    const [courseId, setCourseId] = useState<string>('');
    const [lessonId, setLessonId] = useState<string>('');

    const [editorContent, setEditorContent] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [totalTime, setTotalTime] = useState<string>('');

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [exerciseType, setExerciseType] = useState<string>('');

    const { data: lessons, isLoading: allLessonsLoading } = useGetAllLessonsByCourseIdQuery(courseId || null);

    // #############################
    // #      FUNCTION MANAGER     #
    // #############################

    // Hàm tạo bài học mới và nội dung
    const handleCreateNewUnitLesson = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (lectureType === '') {
            toastError('Các trường không được bỏ trống!');
        }

        if (lectureType === 'videoLecture') {
            if (
                unitName === '' ||
                timeValue === '' ||
                icon === '' ||
                lessonId === '' ||
                courseId === '' ||
                videoUrl === '' ||
                totalTime === '' ||
                editorContent === ''
            ) {
                toastError('Các trường không được bỏ trống!');
            }

            if (data) {
                try {
                    await dispatch(
                        createNewUnitLessonAndVideoLectureContent({
                            title: unitName,
                            time: timeValue,
                            icon,
                            lectureType,
                            lesson: lessonId,
                            course: courseId,
                            videoUrl,
                            description: editorContent,
                            totalTime,
                        })
                    );
                    setUnitName('');
                    setTimeValue('');
                    setIcon('');
                    setLessonId('');
                    setCourseId('');

                    setVideoUrl('');
                    setEditorContent('');
                    setTotalTime('');

                    // Reload lại bảng dữ liệu
                    reloadData();
                } catch (error) {
                    return toastError(`${error}`);
                }
            }
        }

        if (lectureType === 'exercise') {
        }
    };

    // # Hàm Thêm câu hỏi
    const handleAddQuestion: () => void = () => {
        const newItem: QuestionType = { sentence: '', correctAnswer: [''], otherAnswer: [''] };
        setQuestions([...questions, newItem]);
    };

    // # Hàm xóa câu hỏi
    const handleDeleteQuestion = (questionIndex: number) => {
        const updatedQuestions = questions.filter((_question, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    return (
        <Fragment>
            <form className="flex flex-col gap-4 pb-4" onSubmit={handleCreateNewUnitLesson}>
                <div className="flex items-center gap-4">
                    <button className={`${loading ? 'btn-disabled' : 'btn-primary'} max-w-max`} disabled={loading}>
                        Tạo Unit
                    </button>
                    {loading && <Loader content="Loading..." />}
                </div>

                {/* unitName */}
                <div>
                    <span className="font-body font-bold text-textCustom">Tên (*)</span>
                    <input
                        value={unitName}
                        required
                        onChange={(e) => setUnitName(e.target.value)}
                        type="text"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-1
                        text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                {/* unitTime */}
                <div>
                    <span className="font-body font-bold text-textCustom">Thời gian (*)</span>
                    <input
                        required
                        value={timeValue}
                        onChange={(e) => setTimeValue(e.target.value)}
                        type="text"
                        placeholder="00:00:00"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-1
                        text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                {/* unitIcon */}
                <div>
                    <span className="font-body font-bold text-textCustom">Icon (*)</span>
                    <select
                        required
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        id="small"
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-sm text-textCustom 
                        focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    >
                        <option className="hidden">--- Chọn icon ---</option>
                        <option value="videoLecture">Video Icon</option>
                        <option value="exercise">Exercise Icon</option>
                    </select>
                </div>

                {/* LectureType */}
                <div>
                    <span className="font-body font-bold text-textCustom">Loại bài học (*)</span>
                    <select
                        required
                        value={lectureType}
                        onChange={(e) => setLectureType(e.target.value)}
                        id="small"
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 
                        focus:ring-blue-500 sm:w-full"
                    >
                        <option className="hidden">--- Chọn loại bài học ---</option>
                        <option value="videoLecture">Video</option>
                        <option value="exercise">Exercise</option>
                    </select>
                </div>

                {/* CourseId */}
                <div>
                    <span className="font-body font-bold text-textCustom">Khóa học (*)</span>
                    <select
                        required
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        id="small"
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-sm text-textCustom
                       focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    >
                        <option className="hidden">--- Chọn khóa học ---</option>
                        {!allCoursesLoading &&
                            courses?.courses &&
                            courses.courses.map((course: CourseType) => (
                                <option value={course._id} key={course._id}>
                                    {course.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* LessonId */}
                <div>
                    <span className="font-body font-bold text-textCustom">Chương (*)</span>
                    <select
                        required
                        value={lessonId}
                        onChange={(e) => setLessonId(e.target.value)}
                        id="small"
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-sm text-textCustom
                       focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    >
                        <option className="hidden">--- Chọn chương học ---</option>
                        {!allLessonsLoading &&
                            lessons?.lessons &&
                            lessons.lessons.map((lesson: LessonType) => (
                                <option value={lesson._id} key={lesson._id}>
                                    {lesson.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* VideoLecture Content */}
                {lectureType === 'videoLecture' && (
                    <Fragment>
                        {/* Video URL */}
                        <div>
                            <span className="font-body font-bold text-textCustom">Video URL (*)</span>
                            <input
                                required
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                type="text"
                                placeholder="https://youtube.com/"
                                className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-1
                                text-textCustom focus:border-blue-400 sm:w-full"
                            />
                        </div>

                        {/* Video total time */}
                        <div>
                            <span className="font-body font-bold text-textCustom">Tổng thời gian video (*)</span>
                            <input
                                required
                                value={totalTime}
                                onChange={(e) => setTotalTime(e.target.value)}
                                type="text"
                                placeholder="00:00:00"
                                className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-1
                                text-textCustom focus:border-blue-400 sm:w-full"
                            />
                        </div>

                        {/* Descriptions */}
                        <div className="">
                            <span className="font-body font-bold text-textCustom">Mô tả (*)</span>

                            <div className="mt-2">
                                <Editor
                                    apiKey={import.meta.env.VITE_TINY_API_KEY}
                                    initialValue=""
                                    onEditorChange={(value) => setEditorContent(value)}
                                    value={editorContent}
                                    init={{
                                        height: 500,
                                        menubar: true,
                                        plugins: [
                                            'advlist',
                                            'autolink',
                                            'lists',
                                            'link',
                                            'image',
                                            'charmap',
                                            'preview',
                                            'anchor',
                                            'searchreplace',
                                            'visualblocks',
                                            'code',
                                            'fullscreen',
                                            'insertdatetime',
                                            'media',
                                            'table',
                                            'code',
                                            'help',
                                            'wordcount',
                                            'blockquote',
                                            'fontsize',
                                            'lineheight',
                                        ],

                                        toolbar:
                                            'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter' +
                                            'alignright alignjustify | bullist numlist outdent indent blockquote | ' +
                                            'removeformat | fontsize | lineheight | help |',
                                        content_style:
                                            'body { font-family:QuickSand,Arial,sans-serif; font-size:14px; font-weight: 500; line-height: 1.5;}',
                                        font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                    }}
                                />
                            </div>
                        </div>
                    </Fragment>
                )}

                {/* Exercise type */}
                {lectureType === 'exercise' && (
                    <div>
                        <span className="font-body font-bold text-textCustom">Loại bài thực hành (*)</span>
                        <select
                            required
                            value={exerciseType}
                            onChange={(e) => setExerciseType(e.target.value)}
                            id="small"
                            className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-sm text-textCustom
                          focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                        >
                            <option className="hidden">--- Chọn loại bài ---</option>
                            <option value="FillBlankExercise">Điền vào chỗ trống</option>
                            <option value="MultipleOptions">Chọn đáp án đúng</option>
                        </select>
                    </div>
                )}

                {/* FillBlankExercise */}
                {lectureType === 'exercise' && exerciseType === 'FillBlankExercise' && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <Button type="primary" onClick={handleAddQuestion}>
                                Thêm câu hỏi
                            </Button>
                        </div>

                        <ul className="flex flex-wrap items-center gap-2">
                            {questions.map((_question: QuestionType, index: number) => (
                                <li className="relative grow border-2 border-dotted p-4" key={index}>
                                    <X
                                        className="absolute right-1 top-1 cursor-pointer text-red-500"
                                        size={19}
                                        onClick={() => handleDeleteQuestion(index)}
                                    />

                                    <div>
                                        {/* Question sentence */}
                                        <div>
                                            <span className="select-none font-body font-bold text-textCustom">Câu hỏi (*)</span>
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
                                                type="text"
                                                className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 bg-bgCustom
                                                p-1 text-textCustom focus:border-blue-400"
                                            />
                                        </div>

                                        {/* Answers */}
                                        <div>
                                            <span className="select-none font-body font-bold text-textCustom">Đáp án (*)</span>
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
                                                type="text"
                                                className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 bg-bgCustom
                                                p-1 text-textCustom focus:border-blue-400"
                                            />
                                        </div>

                                        {/* Other Answers */}
                                        <div>
                                            <span className="select-none font-body font-bold text-textCustom">Đáp án khác (*)</span>
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
                                                type="text"
                                                className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300
                                                bg-bgCustom p-1 text-textCustom focus:border-blue-400"
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </Fragment>
    );
};

export default CreateUnit;
