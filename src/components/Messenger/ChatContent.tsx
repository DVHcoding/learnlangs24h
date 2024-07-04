/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { Fragment, useEffect } from 'react';
import { Avatar, Spin, Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';

/* ########################################################################## */
/*                              IMPORT COMPONENTS                             */
/* ########################################################################## */
import TypingAnimation from '@assets/messenger/Typing.json';
import { APIResponse } from 'types/api-types';
import { LastMessageStatusType } from 'types/types';
import { Attachments, Member, Message } from 'types/chatApi-types';
import { useGetMessagesQuery } from '@store/api/chatApi';
import { fileFormat } from '@utils/fileFormat';
import RenderAttachment from '@components/Shared/RenderAttachment';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface ChatContentProps {
    userId: string | undefined;
    bottomRef: React.RefObject<HTMLUListElement>;
    userTyping: boolean;
    oldMessagesChunk: ReturnType<typeof useGetMessagesQuery>;
    allMessages: Message[];
    lastMessageId: string;
    lastMessage: LastMessageStatusType;
    userDetails: APIResponse | undefined;
    receiver: Member | undefined;
}

const ChatContent: React.FC<ChatContentProps> = ({
    userId,
    bottomRef,
    userTyping,
    oldMessagesChunk,
    allMessages,
    lastMessageId,
    lastMessage,
    userDetails,
    receiver,
}) => {
    const { uploadingLoader } = useSelector((state: RootState) => state.misc);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
    }, [uploadingLoader]);

    return (
        <Fragment>
            <ul
                className="scrollbar-mess mb-14 flex flex-col gap-2 overflow-auto pb-4 pt-2"
                ref={bottomRef}
                style={{ height: 'calc(100vh - 11.5rem)' }}
            >
                {/* Loading old message */}
                {(oldMessagesChunk.isLoading || oldMessagesChunk.isFetching) && <Spin indicator={<LoadingOutlined spin />} />}

                {/* All Messages */}
                {allMessages.map((message: Message) => (
                    <li className="mr-2 flex gap-2" key={message._id}>
                        {userDetails?.user._id !== message.sender._id && <Avatar src={receiver?.photo.url} className="min-w-8" />}

                        <div
                            className={`max-w-[33rem] ${
                                userDetails?.user._id === message.sender._id ? 'ml-auto' : ''
                            } flex flex-col items-end`}
                        >
                            {/* attachments */}
                            {message.attachments && (
                                <div
                                    className={`grid max-w-[20rem]  ${
                                        message.attachments.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                                    } gap-2`}
                                >
                                    {message.attachments.map((attachment: Attachments, index: number) => {
                                        const url = attachment.url;
                                        const file = fileFormat(url);

                                        return (
                                            <div key={index} className={`max-h-[15rem] overflow-hidden rounded-lg`}>
                                                {RenderAttachment(file, url)}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Message */}
                            {message.content.trim() !== '' && (
                                <p
                                    className={`max-w-[33rem] ${
                                        userDetails?.user._id === message.sender._id ? ' bg-blue-500 text-white' : ''
                                    } rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom`}
                                >
                                    {message.content}
                                </p>
                            )}

                            {/* Seen | unSeen */}
                            {message._id === lastMessageId && (
                                <p className="mr-1 mt-1 max-w-max text-xs leading-tight text-textCustom">
                                    {message.sender._id === userId && (lastMessage.seen ? 'Đã xem' : 'Đã gửi')}
                                </p>
                            )}
                        </div>
                    </li>
                ))}

                {/* Uploading loader files */}
                {uploadingLoader && <Skeleton.Image active={true} className="ml-auto p-2" />}

                {/* Typing bubble animation */}
                {userTyping && (
                    <div className="w-14">
                        <Lottie animationData={TypingAnimation} />
                    </div>
                )}
            </ul>
        </Fragment>
    );
};

export default ChatContent;
