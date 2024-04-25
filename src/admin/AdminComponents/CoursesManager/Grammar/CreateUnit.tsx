// ##################################
// #       IMPORT Npm
// ##################################
import React, { useState, Fragment } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CreateIcon from '@mui/icons-material/Create';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

import { toastError } from '@components/Toast/Toasts';
import { Editor } from '@tinymce/tinymce-react';
import { Loader } from 'rsuite';

import { useDispatch, useSelector } from 'react-redux';

// ##################################
// #       IMPORT Components
// ##################################
import { RootState, AppDispatch } from '@store/store';
import {
    AllUnitLessonsResponseType,
    CourseType,
    LessonType,
    UnitLessonType,
} from 'types/api-types';
import { createNewUnitLesson, createNewContentUnitLesson } from '@store/reducer/courseReducer';
import { useGetAllCoursesQuery, useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';

// ##################################
interface QuestionType {
    id: number;
}

const CreateUnit: React.FC<{
    data: AllUnitLessonsResponseType | undefined;
    isLoading: boolean;
    reloadData: () => void;
}> = ({ data, isLoading, reloadData }) => {
    const { data: courses, isLoading: allCoursesLoading } = useGetAllCoursesQuery();

    const dispatch: AppDispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.newContentUnitLesson);
    const { loading: newUnitLessonLoading } = useSelector(
        (state: RootState) => state.newUnitLesson
    );

    // ##########################
    // #      STATE MANAGER     #
    // ##########################
    const [unitName, setUnitName] = useState<string>('');
    const [timeValue, setTimeValue] = useState<dayjs.Dayjs | null>(dayjs('2024-04-17T00:00'));
    const [icon, setIcon] = useState<string>('');
    const [lectureType, setLectureType] = useState<string>('');
    const [courseId, setCourseId] = useState<string>('');
    const [lessonId, setLessonId] = useState<string>('');

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [editorContent, setEditorContent] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [unitLessonValue, setUnitLessonValue] = useState<string>('');
    const [exerciseType, setExerciseType] = useState<string>('');

    const { data: lessons, isLoading: allLessonsLoading } = useGetAllLessonsByCourseIdQuery(
        courseId || null
    );

    // #############################
    // #      FUNCTION MANAGER     #
    // #############################

    const addQuestion: () => void = () => {
        const newItem: QuestionType = { id: Date.now() };
        setQuestions([...questions, newItem]);
    };

    const removeQuestion: (index: number) => void = (index) => {
        const updatedItems = [...questions];
        updatedItems.splice(index, 1);
        setQuestions(updatedItems);
    };

    const handleCreateNewUnitLessonContent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editorContent === '') {
            return toastError('Vui lòng thêm nội dung!');
        }

        try {
            await dispatch(
                createNewContentUnitLesson({
                    videoUrl,
                    description: editorContent,
                    unitLesson: unitLessonValue,
                })
            );

            setVideoUrl('');
            setEditorContent('');
        } catch (error) {
            return toastError(`${error}`);
        }
    };

    const handleCreateNewUnitLesson = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data) {
            try {
                const unitTime = dayjs(timeValue).format('HH:mm:ss');

                await dispatch(
                    createNewUnitLesson({
                        title: unitName,
                        time: unitTime,
                        icon,
                        lectureType,
                        lesson: lessonId,
                        course: courseId,
                    })
                );

                setUnitName('');
                setTimeValue(dayjs('2024-04-17T00:00'));

                reloadData();
            } catch (error) {
                return toastError(`${error}`);
            }
        }
    };

    let getLectureType = null;

    if (data) {
        if (unitLessonValue) {
            getLectureType = data.unitLessons.find(
                (unitLesson: UnitLessonType) => unitLesson._id === unitLessonValue
            )?.lectureType;
        }
    }

    // console.log(dayjs(timeValue).format('HH:mm:ss'));

    // // Định nghĩa hai giá trị thời gian
    // const time1 = dayjs('01:03:00', 'HH:mm:ss');
    // const time2 = dayjs('12:03:00', 'HH:mm:ss');

    // // Tính tổng thời gian
    // const sumTime = time1
    //     .add(time2.hour(), 'hour')
    //     .add(time2.minute(), 'minute')
    //     .add(time2.second(), 'second');

    // // In ra tổng thời gian
    // console.log(sumTime.format('HH:mm:ss'));

    return (
        <Fragment>
            {/* Create New Unit */}
            <form onSubmit={handleCreateNewUnitLesson}>
                <div className="flex items-center gap-4">
                    <button
                        disabled={newUnitLessonLoading}
                        type="submit"
                        className={`${newUnitLessonLoading ? 'btn-disabled' : 'btn-primary'}`}
                        aria-label="btn-submit-new-unitLesson"
                    >
                        New Unit
                    </button>
                    {newUnitLessonLoading && <Loader content="Loading..." />}
                </div>

                <ul className="mt-2 flex flex-wrap items-center gap-4">
                    <li className="flex-1 basis-52">
                        <TextField
                            fullWidth
                            id="unit-title"
                            label="Unit Name"
                            variant="outlined"
                            value={unitName}
                            required
                            onChange={(e) => setUnitName(e.target.value)}
                        />
                    </li>

                    <li className="mb-2 flex-1 basis-52">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimeField']}>
                                <TimeField
                                    fullWidth
                                    label="Unit Time"
                                    value={timeValue}
                                    format="HH:mm:ss"
                                    onChange={(value) => setTimeValue(value)}
                                    className="border-blue-200 bg-bgCustom text-textCustom"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </li>

                    <li className="flex-1 basis-52">
                        <FormControl fullWidth={true} required>
                            <InputLabel id="demo-simple-select-label">Icon</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Icon"
                                defaultValue=""
                                fullWidth
                                onChange={(e) => setIcon(e.target.value as string)}
                            >
                                <MenuItem value="videoLecture">
                                    <PlayCircleFilledIcon className="text-base text-orange-400" />
                                </MenuItem>
                                <MenuItem value="exercise">
                                    <CreateIcon className="text-base text-orange-400" />
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </li>

                    <li className="flex-1 basis-52">
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Lecture Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                defaultValue=""
                                id="demo-simple-select"
                                value={lectureType}
                                label="Lecture Type"
                                required
                                onChange={(e) => setLectureType(e.target.value)}
                            >
                                <MenuItem value={'videoLecture'}>Video Lecture</MenuItem>
                                <MenuItem value={'exercise'}>Exercise</MenuItem>
                            </Select>
                        </FormControl>
                    </li>

                    <li className="flex-1 basis-52">
                        <FormControl fullWidth required>
                            <InputLabel id="select-course">Course Id</InputLabel>
                            <Select
                                labelId="select-course-label"
                                defaultValue=""
                                id="select-course"
                                value={courseId}
                                label="Course Id"
                                required
                                onChange={(e) => setCourseId(e.target.value)}
                            >
                                {!allCoursesLoading && courses?.courses
                                    ? courses.courses.map((course: CourseType) => (
                                          <MenuItem value={course._id} key={course._id}>
                                              {course.name}
                                          </MenuItem>
                                      ))
                                    : ''}
                            </Select>
                        </FormControl>
                    </li>

                    {lessons?.success === true && !allLessonsLoading ? (
                        <li className="flex-1 basis-52">
                            <FormControl fullWidth required>
                                <InputLabel id="select-lesson">Lesson Id</InputLabel>
                                <Select
                                    labelId="select-lesson-label"
                                    defaultValue=""
                                    id="select-lesson"
                                    value={lessonId}
                                    label="Lesson Id"
                                    required
                                    onChange={(e) => setLessonId(e.target.value)}
                                >
                                    {lessons.lessons.map((lesson: LessonType) => (
                                        <MenuItem value={lesson._id} key={lesson._id}>
                                            {lesson.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
            </form>

            {/* Create New Content */}
            <form onSubmit={handleCreateNewUnitLessonContent} className="mt-8">
                <div className="flex items-center gap-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className={`${loading ? 'btn-disabled' : 'btn-primary'}`}
                        aria-label="btn-submit-new-unitLesson"
                    >
                        New Content
                    </button>
                    {loading && <Loader content="Loading..." />}
                </div>

                {/* <div className="tracking-wide text-textCustom"></div> */}
                <ul className="mt-2 flex flex-col gap-4">
                    <li className="">
                        {/* Lecture Type */}
                        <FormControl style={{ marginTop: '0.5rem' }} fullWidth required>
                            <InputLabel id="demo-simple-select-label">Unit Lesson</InputLabel>
                            <Select
                                defaultValue=""
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Unit Lesson"
                                onChange={(e) =>
                                    setUnitLessonValue((e.target.value as string) || '')
                                }
                            >
                                {!isLoading &&
                                    data?.unitLessons?.map((unitLesson: UnitLessonType) => (
                                        <MenuItem key={unitLesson._id} value={unitLesson._id}>
                                            {unitLesson.title}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </li>

                    <li className="flex flex-wrap items-center gap-4">
                        {getLectureType && getLectureType === 'exercise' ? (
                            <div className="flex items-center gap-2">
                                <FormControl
                                    style={{ width: '15rem', marginTop: '0.5rem' }}
                                    required
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        Exercise Type
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={exerciseType}
                                        label="Exercise Type"
                                        onChange={(e) => setExerciseType(e.target.value as string)}
                                    >
                                        <MenuItem value={'fillBlank'}>Fill Blank</MenuItem>
                                        <MenuItem value={'multipleChoice'}>
                                            Multiple Choice
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                {exerciseType === 'fillBlank' && (
                                    <AddCircleOutlineIcon
                                        fontSize="medium"
                                        className="cursor-pointer text-textCustom"
                                        onClick={addQuestion}
                                    />
                                )}
                            </div>
                        ) : (
                            ''
                        )}
                    </li>
                </ul>

                {/* Editor */}
                {getLectureType && getLectureType === 'videoLecture' ? (
                    <Fragment>
                        <TextField
                            id="video-url"
                            label="Video Url"
                            variant="outlined"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                            className="mt-4"
                            fullWidth
                        />

                        <div className="mt-4">
                            <Editor
                                apiKey={import.meta.env.VITE_TINY_API_KEY}
                                initialValue=""
                                onEditorChange={(value) => setEditorContent(value)}
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
                                    font_size_formats:
                                        '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                }}
                            />
                        </div>
                    </Fragment>
                ) : (
                    ''
                )}

                {/* Fill Blank Exercise */}
                <ul className="mt-4 flex flex-col gap-4 pb-4">
                    {questions.map((_item, index) => (
                        <li key={index} className="flex flex-wrap items-center gap-4">
                            <RemoveCircleOutlineIcon
                                fontSize="medium"
                                className="cursor-pointer text-textCustom"
                                onClick={() => removeQuestion(index)}
                            />
                            <div className="flex flex-wrap items-center gap-4">
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    label="Question"
                                    variant="outlined"
                                    style={{ width: '20rem' }}
                                />
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    label="Answers"
                                    variant="outlined"
                                    style={{ width: '20rem' }}
                                />
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    label="Others Answers"
                                    variant="outlined"
                                    style={{ width: '20rem' }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </form>
        </Fragment>
    );
};

export default CreateUnit;
