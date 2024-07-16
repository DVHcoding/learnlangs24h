/* ########################################################################## */
/*                                 IMPORT NPM                                 */
/* ########################################################################## */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowsLeftRight } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteScrollTop } from '6pp';
import data from '@emoji-mart/data';
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
import { AddMemberSocketResponse, Message, SendAttachmentsResponse } from 'types/chatApi-types';
import NoMessageLight from '@assets/messenger/NoMessageLight.png';
import newMessageSound from '@assets/messenger/SoundNewMessage.mp3';
import { LastMessageStatusType, MessageSocketResponse, NewMessageSocketResponse, SeenMessageSocketResponse } from 'types/types';
import { AppDispatch } from '@store/store';
import { decreaseNotification, setUploadingLoader } from '@store/reducer/miscReducer';
import TypingSound from '@assets/messenger/typingSound.mp3';
import ChatSideBar from '@components/Messenger/ChatSideBar';
import SearchBar from '@components/Messenger/SearchBar';
import ChatHeader from '@components/Messenger/ChatHeader';
import ChatContent from '@components/Messenger/ChatContent';
import { getFileType } from '@utils/getFileType';
import { isValidFileType } from '@utils/fileFormat';
import ChatBar from './ChatBar';
import { useAutoResizeTextArea } from '@hooks/useAutoResizeTextarea';

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

    const [files, setFiles] = useState<File[]>([]);
    const [fileInputKey, setFileInputKey] = useState<number>(0);
    const [newMessage, setNewMessage] = useState<MessageSocketResponse>({
        _id: '',
        chat: '',
        content: '',
        sender: { _id: '', name: '' },
        createdAt: new Date(),
    });

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

    /////////////////////////////////////////////////////////////////
    const handleCloseSearch: () => void = () => {
        setSearchVisible(false);
        setSearchInputValue('');
    };
    /////////////////////////////////////////////////////////////////
    const resetMessageState = () => {
        setFiles([]);
        setMessage('');
        setLastMessage({ sender: '', seen: false });
    };
    /////////////////////////////////////////////////////////////////
    const sendMessage = () => {
        socket.emit(NEW_MESSAGE, { senderId: userId, chatId, members, message });
        resetMessageState();
    };
    /////////////////////////////////////////////////////////////////
    const handleFileUpload = async () => {
        try {
            dispatch(setUploadingLoader(true));
            const myForm = new FormData();
            myForm.append('chatId', chatId || '');
            myForm.append('message', message);
            files.forEach((file) => myForm.append('attachments', file));
            resetMessageState();

            // Gửi request từ client
            fetch('/api/v1/message', {
                method: 'POST',
                body: myForm, // myForm là đối tượng FormData đã chuẩn bị
            })
                .then((response) => {
                    return response.json();
                })
                .then((data: SendAttachmentsResponse) => {
                    if (!data.success) {
                        toastError(`${data.message}`);
                    }

                    dispatch(setUploadingLoader(false));
                })
                .catch((error) => {
                    toastError(`${error}`);
                });
        } catch (error) {
            toastError(`Có lỗi xảy ra! ${error}`);
        }
    };

    /////////////////////////////////////////////////////////////////
    const submitHandler: (e?: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        if (e) e.preventDefault();

        if (files.length > 0) {
            handleFileUpload();
        } else {
            if (!message.trim()) return;
            sendMessage();
        }
    };
    /////////////////////////////////////////////////////////////////
    const addEmoji = (emojiData: any) => {
        const unicodeStrings = emojiData.unified.split('_');
        const codePoints = unicodeStrings.map((el: string) => parseInt(el, 16));
        const emoji = String.fromCodePoint(...codePoints);
        setMessage(message + emoji);
    };
    /////////////////////////////////////////////////////////////////
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

    /////////////////////////////////////////////////////////////////
    // Xử lý FILES
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        // Kiểm tra và cập nhật danh sách các file đã chọn
        if (selectedFiles) {
            const newFiles: File[] = Array.from(selectedFiles);
            const validFiles: File[] = [];

            // Kiểm tra số lượng file và kích thước của từng file
            for (let i = 0; i < newFiles.length; i++) {
                const file = newFiles[i];

                const fileType = getFileType(file);

                if (!isValidFileType(fileType)) {
                    toastError(`Loại file này không được hỗ trợ!.`);
                    return;
                }

                if (file.size <= 20 * 1024 * 1024) {
                    // 20MB limit
                    validFiles.push(file);
                } else {
                    toastError(`Vui lòng chọn file có kích thước <= 20MB.`);
                }

                // Kiểm tra số lượng file đã chọn và giới hạn chỉ cho phép tối đa 5 file
                if (files.length + validFiles.length > 5) {
                    toastError('Bạn chỉ có thể chọn tối đa 5 file.');
                    validFiles.length = 0; // Đặt validFiles về rỗng
                    break;
                }
            }

            // Cập nhật danh sách các file đã chọn
            setFiles([...files, ...validFiles]);
        }
    };
    /////////////////////////////////////////////////////////////////
    const handleRemoveFile = (fileIndex: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(fileIndex, 1);
        setFiles(updatedFiles);
    };
    /////////////////////////////////////////////////////////////////
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
            setNewMessage(data.message);
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
    useAutoResizeTextArea(textAreaRef, message);

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
        // Khi tôi logout ra và đăng nhập nick khác phải làm mới lại
        myChatsRefetch();

        return () => {
            setMessage('');
            setMessages([]);
            setOldMessages([]);
            setUserTyping(false);
            setPage(0);
        };
    }, [chatId]);

    useEffect(() => {
        const senderId = lastSenderId;

        if (senderId !== userId && senderId) {
            socket.emit(SEEN_MESSAGE, { senderId: userId, chatId, members });
            dispatch(decreaseNotification());
        }
    }, [chatId, messages, members, lastSenderId, dispatch]);

    useEffect(() => {
        const lastMessage = chatDetails.data?.chat?.lastMessage;
        if (lastMessage) {
            setLastMessage({ sender: lastMessage.sender, seen: lastMessage.seen });
        }
    }, [chatDetails]);

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
                    newMessage={newMessage}
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
                    <ChatBar
                        files={files}
                        fileInputKey={fileInputKey}
                        message={message}
                        emojiShow={emojiShow}
                        textAreaRef={textAreaRef}
                        submitHandler={submitHandler}
                        setFileInputKey={setFileInputKey}
                        handleFileInputChange={handleFileInputChange}
                        handleRemoveFile={handleRemoveFile}
                        setEmojiShow={setEmojiShow}
                        addEmoji={addEmoji}
                        handleKeyDown={handleKeyDown}
                        messageOnChange={messageOnChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Messenger;
