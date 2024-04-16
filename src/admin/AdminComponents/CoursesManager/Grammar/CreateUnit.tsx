// ##################################
// #       IMPORT Npm
// ##################################
import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Input } from 'rsuite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { Editor } from '@tinymce/tinymce-react';

// ##################################
// #       IMPORT Components
// ##################################
interface QuestionType {
    id: number;
}

// ##################################
const CreateUnit: React.FC = () => {
    const editorRef = useRef<any>(null);

    // ##########################
    // #      STATE MANAGER     #
    // ##########################
    const [lectureType, setLectureType] = useState<string>('');
    const [exerciseType, setExerciseType] = useState<string>('');
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [lessonTitle, setLessonTitle] = useState<string>('');

    const [timeValue, setTimeValue] = useState<dayjs.Dayjs | null>(dayjs('2022-04-17T15:30'));

    const handleTimeChange = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setTimeValue(newValue);
        }
    };

    const addQuestion = () => {
        const newItem: QuestionType = { id: Date.now() };
        setQuestions([...questions, newItem]);
    };

    const removeQuestion = (index: number) => {
        const updatedItems = [...questions];
        updatedItems.splice(index, 1);
        setQuestions(updatedItems);
    };

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleChangeLectureType = (event: SelectChangeEvent) => {
        setLectureType(event.target.value as string);
    };

    const handleChangeLessonTitle = (event: SelectChangeEvent) => {
        setLessonTitle(event.target.value as string);
    };

    const handleChangeQuestionType = (event: SelectChangeEvent) => {
        setExerciseType(event.target.value as string);
    };

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
        <div>
            <ul className="mt-2 flex flex-col gap-4">
                <li className="">
                    <FormControl fullWidth>
                        <InputLabel id="select-lesson-title">Lesson Title</InputLabel>
                        <Select
                            labelId="select lesson title"
                            id="select-lesson-title"
                            label="Lesson Title"
                            onChange={handleChangeLessonTitle}
                            value={lessonTitle}
                        >
                            <MenuItem value={'Thì hiện tại đơn'}>Thì hiện tại đơn</MenuItem>
                            <MenuItem value={'Cau dieu kien'}>Cau dieu kien</MenuItem>
                        </Select>
                    </FormControl>
                </li>

                <li className="">
                    <label
                        aria-label="Unit Name"
                        className=" text-base font-semibold text-textCustom"
                    >
                        Unit Name
                    </label>
                    <Input
                        size="lg"
                        placeholder="Unit Name"
                        className="mt-2 border-bdCustom bg-bgCustom"
                    />
                </li>

                <li className="flex flex-wrap items-center gap-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimeField']}>
                            <TimeField
                                label="Unit Time"
                                defaultValue={dayjs('2022-04-17T15:30')}
                                value={timeValue}
                                format="HH:mm:ss"
                                onChange={handleTimeChange}
                                className="border-blue-200 bg-bgCustom text-textCustom"
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <FormControl style={{ width: '15rem', marginTop: '0.5rem' }}>
                        <InputLabel id="demo-simple-select-label">Lecture Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lectureType}
                            label="Lecture Type"
                            onChange={handleChangeLectureType}
                        >
                            <MenuItem value={'videoLecture'}>Video Lecture</MenuItem>
                            <MenuItem value={'exercise'}>Exercise</MenuItem>
                        </Select>
                    </FormControl>

                    {lectureType === 'exercise' && (
                        <div className="flex items-center gap-2">
                            <FormControl style={{ width: '15rem', marginTop: '0.5rem' }}>
                                <InputLabel id="demo-simple-select-label">Exercise Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={exerciseType}
                                    label="Exercise Type"
                                    onChange={handleChangeQuestionType}
                                >
                                    <MenuItem value={'fillBlank'}>Fill Blank</MenuItem>
                                    <MenuItem value={'multipleChoice'}>Multiple Choice</MenuItem>
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
                    )}
                </li>
            </ul>

            {/* Editor */}
            {lectureType === 'videoLecture' && (
                <div className="mt-4">
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_API_KEY}
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        initialValue=""
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
                            ],

                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style:
                                'body { font-family:QuickSand,Arial,sans-serif; font-size:14px; font-weight: 500; }',
                        }}
                    />

                    <button onClick={log}>Log editor content</button>
                </div>
            )}

            {/* Fill Blank Exercise */}
            <ul className="mt-4 flex flex-col gap-4">
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
        </div>
    );
};

export default CreateUnit;
