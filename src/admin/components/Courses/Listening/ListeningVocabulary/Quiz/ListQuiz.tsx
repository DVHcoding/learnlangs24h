// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Trash2 } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { addAudio, IAudio, removeAudio, updateAudio } from '@store/reducer/vocaReducer';
import { AppDispatch, RootState } from '@store/store';

const ListQuiz: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { audio: audioList } = useSelector((state: RootState) => state.vocabularies);

    const [fileInputs, setFileInputs] = useState<File[]>([]);

    const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileInputs((prev) => {
                const newFileInputs = [...prev];
                newFileInputs[index] = file;
                return newFileInputs;
            });
            dispatch(
                updateAudio({ index, fileName: file.name, answer: audioList[index].answer, otherAnswer: audioList[index].otherAnswer })
            );
        }
    };

    const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            updateAudio({
                index,
                fileName: audioList[index].fileName,
                answer: event.target.value,
                otherAnswer: audioList[index].otherAnswer,
            })
        );
    };

    const handleOtherAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            updateAudio({ index, fileName: audioList[index].fileName, answer: audioList[index].answer, otherAnswer: event.target.value })
        );
    };

    const handleAddAudio = () => {
        dispatch(addAudio({ fileName: '', answer: '', otherAnswer: '' }));
    };

    const handleRemoveAudio = (index: number) => {
        dispatch(removeAudio(index));
    };

    console.log(fileInputs);

    return (
        <Fragment>
            <ul className="flex flex-col gap-5">
                {audioList.map((audio: IAudio, index: number) => (
                    <li key={index} className="rounded-md bg-bgCustomCardItem p-4">
                        <div className="flex items-center justify-between border-b-2">
                            <h3 className="font-sans text-textCustom">{index + 1}</h3>

                            <Trash2
                                size={18}
                                className="cursor-pointer text-textCustom transition-all hover:text-yellow-400"
                                onClick={() => handleRemoveAudio(index)}
                            />
                        </div>

                        <div className="mt-2">
                            <input type="file" required onChange={(event) => handleFileChange(index, event)} />

                            <div className="flex items-center justify-between gap-10">
                                <div className="w-full">
                                    <textarea
                                        className="mt-10 w-full resize-none border-b-4 border-b-green-200 bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                        rows={1}
                                        spellCheck={false}
                                        value={audio.answer}
                                        onChange={(event) => handleAnswerChange(index, event)}
                                    />
                                    <p className="font-sans uppercase text-textCustomGray">Đáp án</p>
                                </div>

                                {/* Right */}
                                <div className="w-full">
                                    <textarea
                                        className="mt-10 w-full resize-none border-b-4 border-b-green-200 bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                        rows={1}
                                        spellCheck={false}
                                        value={audio.otherAnswer}
                                        onChange={(event) => handleOtherAnswerChange(index, event)}
                                    />
                                    <p className="font-sans uppercase text-textCustomGray">Đáp án khác</p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Thêm the */}
            <div className="mt-4 rounded-md bg-bgCustomCardItem p-4">
                <div
                    className="group mx-auto max-w-max cursor-pointer border-b-4 border-b-green-200 transition-all hover:border-b-yellow-400"
                    onClick={handleAddAudio}
                >
                    <h3 className="font-sans uppercase text-textCustom transition-all group-hover:text-yellow-400">+ Thêm thẻ</h3>
                </div>
            </div>
        </Fragment>
    );
};

export default ListQuiz;
