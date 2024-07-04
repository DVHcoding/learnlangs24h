// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React from 'react';
import { IoMdSend, IoMdClose } from 'react-icons/io';
import { GoFileMedia } from 'react-icons/go';
import { MdOutlineAddReaction } from 'react-icons/md';
import { Tooltip } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import RenderFile from '@components/Shared/RenderFile';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface ChatBarProps {
    fileInputKey: number;
    files: File[];
    message: string;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
    emojiShow: boolean;
    submitHandler: (e?: React.FormEvent<HTMLFormElement>) => void;
    setFileInputKey: React.Dispatch<React.SetStateAction<number>>;
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (fileIndex: number) => void;
    messageOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    setEmojiShow: React.Dispatch<React.SetStateAction<boolean>>;
    addEmoji: (emojiData: any) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({
    fileInputKey,
    files,
    message,
    textAreaRef,
    emojiShow,
    submitHandler,
    setFileInputKey,
    handleFileInputChange,
    handleRemoveFile,
    messageOnChange,
    handleKeyDown,
    setEmojiShow,
    addEmoji,
}) => {
    const { uploadingLoader } = useSelector((state: RootState) => state.misc);

    return (
        <form onSubmit={submitHandler} className="sticky bottom-0 flex items-center gap-2 bg-bgCustom px-2 pb-1">
            {/* File Media */}
            <Tooltip title="Đính kèm file">
                <label htmlFor="file-upload" className="cursor-pointer select-none">
                    <GoFileMedia size={20} color="#3798f2" onClick={() => setFileInputKey((prevKey) => prevKey + 1)} />
                </label>

                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    disabled={uploadingLoader}
                    key={fileInputKey}
                    onChange={handleFileInputChange}
                    multiple
                    accept="image/*, video/*, audio/*"
                />
            </Tooltip>

            <div className="flex w-full items-end rounded-lg bg-bgHoverGrayDark">
                <div className="relative h-full w-full">
                    <ul className={`items-center gap-2 p-2 ${files.length > 0 ? 'flex' : 'hidden'}`}>
                        {files.map((file, index) => (
                            <li className="relative h-12 w-12 select-none rounded-md" key={index}>
                                <div
                                    className="absolute right-[-0.5rem] top-[-0.5rem] z-10 flex h-5 w-5 
                                    cursor-pointer items-center justify-center rounded-full bg-bgCustom 
                                    text-textCustom hover:bg-bgHoverGrayDark"
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    <IoMdClose size={13} />
                                </div>

                                {RenderFile(file, URL.createObjectURL(file))}
                            </li>
                        ))}
                    </ul>

                    <textarea
                        className={`w-full select-none resize-none place-content-center 
                        bg-transparent px-2 text-textCustom outline-none`}
                        onFocus={() => setEmojiShow(false)}
                        value={message}
                        onChange={messageOnChange}
                        onKeyDown={handleKeyDown}
                        ref={textAreaRef}
                        placeholder="Aa"
                    />
                </div>

                <MdOutlineAddReaction
                    className="mb-2 mr-1 cursor-pointer"
                    size={18}
                    color="#3798f2"
                    onClick={() => setEmojiShow(!emojiShow)}
                />

                {emojiShow && (
                    <div className="absolute bottom-14 right-0 select-none">
                        <Picker data={data} onEmojiSelect={addEmoji} previewPosition="none" emojiButtonSize={30} />
                    </div>
                )}
            </div>

            <button type="submit">
                <IoMdSend size={25} color="#3798f2" />
            </button>
        </form>
    );
};

export default ChatBar;
