// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button, Input, Modal, Radio } from 'antd';
import { Trash2 } from 'lucide-react';
import { Fragment, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import {
    addPictureOption,
    addPictureQuestion,
    addTitle,
    addTranscript,
    removePictureOption,
    removePictureQuestion,
    setPictureAnswer,
    updatePictureOption,
} from '@store/reducer/listenReducer';
import { AppDispatch, RootState } from '@store/store';
import { AudioFileContext } from '@admin/components/Courses/CreateUnit';
import { toastError } from '@components/Toast/Toasts';
import { setUploadingLoader } from '@store/reducer/miscReducer';
import DotLoader from '@pages/Loader/DotLoader';

const PictureTestForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const context = useContext(AudioFileContext);
    const { title, transcript, questionsPictures } = useSelector((state: RootState) => state.listenExercise);
    const { uploadingLoader } = useSelector((state: RootState) => state.misc);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newQuestionTitle, setNewQuestionTitle] = useState<string>('');
    const [newOptionText, setNewOptionText] = useState<Record<number, { image: { public_id: string; url: string }; text: string }>>({});

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleOk = (): void => {
        dispatch(addPictureQuestion(newQuestionTitle));
        setNewQuestionTitle('');
        setIsModalOpen(false);
    };

    const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            context?.handleSetConversationFile(file);
        }
    };

    const handleOptionFilesChange = async (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, optionIndex: number) => {
        if (!e.target.files) {
            return;
        }

        const file = e.target.files[0];

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: false,
        };

        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_NAME);
        formData.append('folder', 'pictures_test');
        formData.append('quality', 'auto:low');

        try {
            dispatch(setUploadingLoader(true));
            const cloudinaryResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
                formData,
                config
            );
            dispatch(setUploadingLoader(false));

            const { public_id, url }: { public_id: string; url: string } = cloudinaryResponse.data;

            dispatch(
                updatePictureOption({
                    questionIndex,
                    optionIndex,
                    image: { public_id, url },
                })
            );
        } catch (error) {
            toastError(`Có lỗi xảy ra!: ${error}`);
        }
    };

    const handleChangeOptionText = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
        setNewOptionText((preState) => ({
            ...preState,
            [questionIndex]: { image: { public_id: '', url: '' }, text: e.target.value },
        }));
    };

    const handleAddOption = (questionIndex: number): void => {
        dispatch(addPictureOption({ questionIndex, pictureOption: newOptionText[questionIndex] }));
        setNewOptionText((preState) => ({
            ...preState,
            [questionIndex]: { ...preState[questionIndex], image: { public_id: '', url: '' }, text: '' },
        }));
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <Button type="dashed" onClick={() => setIsModalOpen(true)}>
                Thêm câu hỏi
            </Button>

            <Modal title="Thêm câu hỏi" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Input
                    type="text"
                    className="mt-4 p-2 font-be"
                    placeholder="Nhập câu hỏi..."
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    required
                />
            </Modal>

            <input type="file" className="mt-4 block" onChange={handleAudioFileChange} />

            <input
                value={title || ''}
                type="text"
                className="mt-4 block w-full rounded-md border border-bdCustom bg-bgCustom p-2
                font-be text-textCustom"
                placeholder="Nhập tiêu đề..."
                onChange={(e) => dispatch(addTitle(e.target.value))}
                required
            />

            <textarea
                className="mt-4 h-[200px] w-full resize-none border border-bdCustom bg-bgCustom
                p-2 text-justify leading-7 text-textCustom outline-none"
                value={transcript.replace(/<br\s*\/?>/g, '\n') || ''}
                rows={1}
                spellCheck={false}
                placeholder="Nhập Transcript..."
                onChange={(e) => {
                    // Replace newline characters with <br> tags
                    const transcript = e.target.value.replace(/\n/g, '<br/>');
                    dispatch(addTranscript(transcript));
                }}
                required
            />

            <ul className="mt-4 flex flex-col gap-5">
                {questionsPictures.map((question, questionIndex) => (
                    <li className="rounded-md bg-bgCustomCardItem p-4" key={questionIndex}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h3 className="leading-tight text-textCustom">Câu {questionIndex + 1}:</h3>
                                <p className="text-base text-textCustom">{question.questionTitle}</p>
                            </div>

                            <Trash2
                                size={18}
                                className="cursor-pointer text-textCustom transition-all hover:text-red-400"
                                onClick={() => dispatch(removePictureQuestion(questionIndex))}
                            />
                        </div>

                        <Radio.Group
                            className="mt-2 w-full"
                            onChange={(e) => dispatch(setPictureAnswer({ questionIndex, answer: e.target.value }))}
                            value={question.answer}
                        >
                            <ul className="flex w-full gap-2 overflow-auto">
                                {question.options.map((option, optionIndex: number) => (
                                    <li key={optionIndex} className="flex max-w-[12rem] flex-col gap-2">
                                        <div>
                                            {/* Upload */}
                                            <div
                                                className={`${
                                                    questionsPictures?.[questionIndex]?.options[optionIndex]?.image?.url ? 'hidden' : ''
                                                }`}
                                            >
                                                <label
                                                    htmlFor={`file-upload-${questionIndex}-${optionIndex}`}
                                                    className="cursor-pointer select-none"
                                                >
                                                    <div
                                                        className="relative h-[8rem] w-[12rem] rounded-lg border-2 
                                                        border-dashed bg-bgCustomCard"
                                                    >
                                                        {uploadingLoader && (
                                                            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                                                                <DotLoader />
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>

                                                <input
                                                    id={`file-upload-${questionIndex}-${optionIndex}`}
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*, video/*, audio/*"
                                                    onChange={(e) => handleOptionFilesChange(e, questionIndex, optionIndex)}
                                                />
                                            </div>

                                            {/* Image previews */}
                                            <div
                                                className={`${
                                                    questionsPictures?.[questionIndex]?.options[optionIndex]?.image?.url ? '' : 'hidden'
                                                } h-[8rem] w-[12rem]`}
                                            >
                                                <img
                                                    src={questionsPictures?.[questionIndex]?.options[optionIndex]?.image?.url}
                                                    alt="image"
                                                    className="h-full w-full object-cover"
                                                    style={{ transform: 'translate3d(0, 0, 1px)' }}
                                                />
                                            </div>

                                            <Radio value={option.text} className="mt-2 min-w-[18rem] font-be text-textCustom">
                                                {option.text}
                                            </Radio>
                                        </div>

                                        <Button
                                            danger
                                            type="dashed"
                                            onClick={() => dispatch(removePictureOption({ questionIndex, optionIndex }))}
                                        >
                                            Xoa
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </Radio.Group>

                        <div className="mt-4 flex items-center gap-4">
                            <Input
                                className="w-[20rem] rounded-md border border-bdCustom bg-bgCustom p-[0.3rem]
                                font-be text-textCustom"
                                placeholder="Nhập giá trị..."
                                value={newOptionText[questionIndex]?.text}
                                onChange={(e) => handleChangeOptionText(e, questionIndex)}
                            />

                            <Button type="primary" onClick={() => handleAddOption(questionIndex)}>
                                Them
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export default PictureTestForms;
