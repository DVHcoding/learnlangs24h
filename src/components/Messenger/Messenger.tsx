/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { GoFileMedia } from 'react-icons/go';
import { FaArrowsLeftRight } from 'react-icons/fa6';
import { MdOutlineAddReaction } from 'react-icons/md';
// import { IoMdClose } from 'react-icons/io';
import { Tooltip } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteScrollTop } from '6pp';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useDispatch } from 'react-redux';

/* ########################################################################## */
/*                              IMPORT COMPONENTS                             */
/* ########################################################################## */
import userDebounce from '@hooks/userDebounce';
import { UserDetailsType } from 'types/api-types';
import { useLazySearchUserQuery, useUserDetailsQuery } from '@store/api/userApi';
import { toastError } from '@components/Toast/Toasts';
import {
    useGetChatByIdMutation,
    useGetChatDetailsQuery,
    useGetMessagesQuery,
    useGetMyChatsQuery,
    useGetUserStatusQuery,
} from '@store/api/chatApi';
import useErrors from '@hooks/useErrors';
import { ADD_USER, NEW_MESSAGE, OFFLINE_USERS, SEEN_MESSAGE, START_TYPING, STOP_TYPING } from '@constants/events';
import { useSocket } from '@utils/socket';
import useSocketEvents from '@hooks/useSocketEvents';
import { AddMemberSocketResponse, Message } from 'types/chatApi-types';
import NoMessageLight from '@assets/messenger/NoMessageLight.png';
import newMessageSound from '@assets/messenger/SoundNewMessage.mp3';
import { LastMessageStatusType, MessageSocketResponse, NewMessageSocketResponse, SeenMessageSocketResponse } from 'types/types';
import { AppDispatch } from '@store/store';
import { decreaseNotification } from '@store/reducer/miscReducer';
import TypingSound from '@assets/messenger/typingSound.mp3';
import ChatSideBar from '@components/Messenger/ChatSideBar';
import SearchBar from '@components/Messenger/SearchBar';
import ChatHeader from '@components/Messenger/ChatHeader';
import ChatContent from '@components/Messenger/ChatContent';

////////////////////////////////////////////////////////////////////////////////////
const Messenger: React.FC = () => {
    const socket = useSocket();
    const dispatch: AppDispatch = useDispatch();
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    const bottomRef = useRef<HTMLUListElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const navigate = useNavigate();
    const { chatId } = useParams<string>();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [friends, setFriends] = useState<UserDetailsType[]>([]);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<MessageSocketResponse[]>([]);
    const [lastMessage, setLastMessage] = useState<LastMessageStatusType>({ sender: '', seen: false });
    const [page, setPage] = useState<number>(1);

    const [emojiShow, setEmojiShow] = useState<boolean>(false);
    const [onlineUsers, setOnlineUsers] = useState<AddMemberSocketResponse[]>([]);
    const [offlineUsers, setOfflineUsers] = useState<AddMemberSocketResponse[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [IamTyping, setIamTyping] = useState<boolean>(false);
    const [userTyping, setUserTyping] = useState<boolean>(false);

    const [fileInputKey, setFileInputKey] = useState(0);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const oldMessagesChunk = useGetMessagesQuery({ chatId, page: page }, { skip: !chatId });

    const { data: userDetails, refetch: userDetailsRefetch } = useUserDetailsQuery();

    const {
        data: myChats,
        isError: myChatsIsError,
        error: myChatsError,
        isLoading: myChatsLoading,
        refetch: myChatsRefetch,
    } = useGetMyChatsQuery();

    const chatDetails = useGetChatDetailsQuery({ chatId }, { skip: !chatId });
    const [searchUser] = useLazySearchUserQuery();
    const [getChatById] = useGetChatByIdMutation();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const userId = useMemo(() => userDetails?.user?._id, [userDetails?.user]);
    const members = useMemo(() => chatDetails.data?.chat?.members.map((member) => member._id), [chatDetails.data]);
    const receiver = useMemo(() => chatDetails.data?.chat?.members.find((member) => member._id !== userId), [chatDetails.data, userId]);

    ////////////////////////////////////////////////////////////////////////////////
    const { data: userStatus } = useGetUserStatusQuery({ userId: receiver?._id }, { skip: !receiver?._id });

    ////////////////////////////////////////////////////////////////////////////////
    const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
        bottomRef,
        oldMessagesChunk.data?.totalPages as number,
        1,
        setPage,
        oldMessagesChunk.data?.messages as Message[]
    );
    ////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////
    // Tìm tất cả những người nhận tin nhắn đang online
    const online = useMemo(() => {
        return onlineUsers.find((onlineUser) => onlineUser.userId === receiver?._id);
    }, [userId, chatDetails.data, onlineUsers]);

    // Lấy tất cả tin nhắn từ database + với tin nhắn socket
    const allMessages = useMemo(() => {
        return [...(oldMessages as Message[]), ...(messages as Message[])];
    }, [oldMessages, messages]);

    // Lấy thời gian online lần cuối
    const lastOnlineTime = useMemo(() => {
        return offlineUsers.find((offlineUser) => offlineUser.userId === receiver?._id)?.lastOnline || userStatus?.userStatus?.lastOnline;
    }, [receiver, offlineUsers, userStatus]);

    // Lấy ra id của tin nhắn cuối cùng
    const lastMessageId = useMemo(() => {
        return allMessages[allMessages.length - 1]?._id;
    }, [allMessages]);

    const lastSenderId = useMemo(() => {
        return allMessages[allMessages.length - 1]?.sender?._id;
    }, [allMessages]);

    ////////////////////////////////////////////////////////////////////////////////

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleRedirectChatId = async (userId: string) => {
        try {
            const response = await getChatById({ _id: userId, name: 'New chat', members: [userId] });

            if ('error' in response) {
                toastError(`${response.error}`);
                return;
            }

            const { success, chatId } = response.data;

            if (success) {
                navigate(`/messages/${chatId}`);
            } else {
                toastError('Something went wrong!');
            }
        } catch (error) {
            toastError('An unexpected error occurred.');
        } finally {
            handleCloseSearch();
        }
    };

    const handleCloseSearch: () => void = () => {
        setSearchVisible(false);
        setSearchInputValue('');
    };

    const submitHandler: (e?: React.FormEvent<HTMLFormElement>) => void = (e) => {
        if (e) e.preventDefault();
        if (!message.trim()) return;

        socket.emit(NEW_MESSAGE, { senderId: userId, chatId, members, message });
        setMessage('');
        setLastMessage({ sender: '', seen: false });
    };

    const addEmoji = (emojiData: any) => {
        const unicodeStrings = emojiData.unified.split('_');
        const codePoints = unicodeStrings.map((el: string) => parseInt(el, 16));
        const emoji = String.fromCodePoint(...codePoints);
        setMessage(message + emoji);
    };

    const messageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        if (!IamTyping) {
            socket.emit(START_TYPING, { senderId: userId, chatId, members });
            setIamTyping(true);
        }

        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
            socket.emit(STOP_TYPING, { senderId: userId, chatId, members });
            setIamTyping(false);
        }, 1500);
    };

    // Xử lý FILES
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Xử lý file ở đây
        console.log('Đã chọn file:', file);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitHandler();
        }
    };

    ///////////////////////////////////////////////////////////////////////////////
    const addUserListener = useCallback((data: AddMemberSocketResponse[]) => {
        console.log('ADD_USER:', data);
        setOnlineUsers(data);

        return () => {
            socket.off(ADD_USER);
        };
    }, []);

    const newMessageListener = useCallback(
        async (data: NewMessageSocketResponse) => {
            if (data.chatId !== chatId) return;

            ///////////////////////////////////////////////////

            if (data.sender !== userId) {
                const sound = new Audio(newMessageSound);
                sound.play();
            }
            ////////////////////////////////////////////////////

            setMessages((prev) => [...prev, data.message]);

            ////////////////////////////////////////////////////
            if (data.sender !== userId && data.chatId === chatId) {
                await userDetailsRefetch();
                socket.emit(SEEN_MESSAGE, { senderId: userId, chatId, members });
            }
            ////////////////////////////////////////////////////
        },
        [chatId, members]
    );

    const offlineUserListener = useCallback((data: AddMemberSocketResponse[]) => {
        console.log('OFFLINE_USER:', data);
        setOfflineUsers(data);

        return () => {
            socket.off(OFFLINE_USERS);
        };
    }, []);

    const seenMessageListener = useCallback(
        (data: SeenMessageSocketResponse) => {
            if (data.chatId !== chatId) return;
            setLastMessage({ sender: data.lastMessage?.sender, seen: data?.lastMessage?.seen });
        },
        [chatId]
    );

    const startTypingListener = useCallback(
        (data: { chatId: string }) => {
            if (data.chatId !== chatId) return;
            setUserTyping(true);
            const typingSound = new Audio(TypingSound);
            typingSound.play();
        },
        [chatId]
    );

    const stopTypingListener = useCallback(
        (data: { chatId: string }) => {
            if (data.chatId !== chatId) return;

            setUserTyping(false);
        },
        [chatId]
    );

    ///////////////////////////////////////////////////////////////////////////////

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */
    const debounced = userDebounce(searchInputValue, 500);

    const errors = [
        {
            isError: myChatsIsError,
            error: myChatsError,
        },
        {
            isError: chatDetails.isError,
            error: chatDetails.error,
        },
        {
            isError: oldMessagesChunk.isError,
            error: oldMessagesChunk.error,
        },
    ];

    useErrors(errors);

    const eventHandler = {
        [ADD_USER]: addUserListener,
        [NEW_MESSAGE]: newMessageListener,
        [OFFLINE_USERS]: offlineUserListener,
        [SEEN_MESSAGE]: seenMessageListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener,
    };

    useSocketEvents(socket, eventHandler);

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        if (userId) {
            socket.emit(ADD_USER, { userId: userId });
        }
    }, [userId]);

    useEffect(() => {
        if (!searchVisible || searchInputValue.trim() === '') {
            setFriends([]);
            return;
        }

        searchUser(encodeURIComponent(debounced))
            .then(({ data }) => {
                if (data?.users) {
                    setFriends(data.users);
                } else {
                    setFriends([]);
                }
            })
            .catch(() => {
                toastError('Có lỗi xảy ra!');
            });
    }, [debounced]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
    }, [messages, userTyping]);

    useEffect(() => {
        if (chatId) {
            localStorage.setItem('chatId', chatId);
        }

        myChatsRefetch();

        return () => {
            setMessage('');
            setMessages([]);
            setOldMessages([]);
            setPage(0);
        };
    }, [chatId]);

    useEffect(() => {
        const senderId = lastSenderId;

        setTimeout(async () => {
            if (lastMessage.seen) {
                return;
            }

            if (senderId !== userId && senderId) {
                await userDetailsRefetch();
                socket.emit(SEEN_MESSAGE, { senderId: userId, chatId, members });
                dispatch(decreaseNotification());
            }
        }, 1000);
    }, [chatId, messages, members, lastSenderId]);

    useEffect(() => {
        const lastMessage = chatDetails.data?.chat?.lastMessage;
        if (lastMessage) {
            setLastMessage({ sender: lastMessage.sender, seen: lastMessage.seen });
        }
    }, [chatDetails]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '2rem';
            textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, 126) + 'px';
            textAreaRef.current.style.overflowY = textAreaRef.current.scrollHeight > 126 ? 'auto' : 'hidden';
        }
    }, [message]);

    return (
        <div className="flex overflow-hidden pm:block" style={{ height: 'calc(100% - 3.8rem)' }}>
            <div className="btn-primary fixed top-4 hidden select-none sm:block" onClick={() => setIsOpen(!isOpen)}>
                <FaArrowsLeftRight />
            </div>

            {/* Sidebar */}
            <div
                className={`w-[22rem] overflow-auto border-r border-t border-bdCustom2 bg-bgCustom sm:fixed 
                sm:z-10 sm:h-full sm:w-[60%] pm:fixed pm:z-10 pm:h-full pm:w-[40%] tablet:w-[40%] ${
                    isOpen ? 'sm:translate-x-0 pm:translate-x-0 ' : 'sm:translate-x-[-110%] pm:translate-x-[-110%]'
                } 
                transition-all duration-300 `}
            >
                <h2 className="font-bold text-textBlackGray">Đoạn chat</h2>

                {/* search */}
                <SearchBar
                    friends={friends}
                    handleCloseSearch={handleCloseSearch}
                    handleRedirectChatId={handleRedirectChatId}
                    searchInputValue={searchInputValue}
                    searchVisible={searchVisible}
                    setSearchInputValue={setSearchInputValue}
                    setSearchVisible={setSearchVisible}
                />

                {/* Chat Sidebar */}
                <ChatSideBar
                    chatId={chatId}
                    myChats={myChats}
                    myChatsLoading={myChatsLoading}
                    searchVisible={searchVisible}
                    setIsOpen={setIsOpen}
                />
            </div>

            {/* Content  */}
            {!chatDetails.data?.success && !chatDetails.isLoading ? (
                <div className="grid w-full items-center border-t border-bdCustom2">
                    <div>
                        <img src={NoMessageLight} alt="NoMessage" style={{ margin: 'auto' }} />
                        <h2 className="mx-auto max-w-max text-center font-bold leading-tight text-textCustom">Chưa có đoạn chat nào!</h2>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    {/* Header */}
                    <ChatHeader lastOnlineTime={lastOnlineTime} online={online} receiver={receiver} />

                    {/* Body */}
                    <ChatContent
                        userId={userId}
                        allMessages={allMessages}
                        bottomRef={bottomRef}
                        lastMessage={lastMessage}
                        lastMessageId={lastMessageId}
                        oldMessagesChunk={oldMessagesChunk}
                        userTyping={userTyping}
                        userDetails={userDetails}
                        receiver={receiver}
                    />

                    {/* Chat bar */}
                    <form onSubmit={submitHandler} className="sticky bottom-0 flex items-center gap-2 bg-bgCustom px-2 pb-1">
                        {/* File Media */}
                        <Tooltip title="Đính kèm file">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <GoFileMedia size={20} color="#3798f2" onClick={() => setFileInputKey((prevKey) => prevKey + 1)} />
                            </label>
                            <input id="file-upload" type="file" className="hidden" key={fileInputKey} onChange={handleFileInputChange} />
                        </Tooltip>

                        <div className="flex w-full items-end rounded-lg bg-bgHoverGrayDark">
                            <div className="relative h-full w-full">
                                {/* <div className="p-2">
                                    <div className="relative h-12 w-12 select-none rounded-md">
                                        <div
                                            className="absolute right-[-0.5rem] top-[-0.5rem] flex h-5 w-5 cursor-pointer 
                                            items-center justify-center rounded-full bg-bgCustom text-textCustom 
                                            hover:bg-bgHoverGrayDark"
                                        >
                                            <IoMdClose size={13} className="" />
                                        </div>
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiDJOWtNm7FMFlZPfBLXy53ssnh8xEWg9ugg&s"
                                            alt=""
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                    </div>
                                </div> */}

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
                </div>
            )}
        </div>
    );
};

export default Messenger;
