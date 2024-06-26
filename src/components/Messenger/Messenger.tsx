// ##########################
// #      IMPORT NPM        #
// ##########################
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Spin } from 'antd';
import { IoMdSend } from 'react-icons/io';
import { GoFileMedia } from 'react-icons/go';
import { MdOutlineAddReaction } from 'react-icons/md';
import { useInfiniteScrollTop } from '6pp';
import { LoadingOutlined } from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// ##########################
// #    IMPORT Components   #
// ##########################
import TippyProvider from '@components/Tippys/TippyProvider';
import userDebounce from '@hooks/userDebounce';
import { Chat, UserDetailsType } from 'types/api-types';
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
import { ADD_USER, NEW_MESSAGE, OFFLINE_USERS, SEEN_MESSAGE } from '@constants/events';
import { useSocket } from '@utils/socket';
import useSocketEvents from '@hooks/useSocketEvents';
import {
    AddMemberSocketResponse,
    Message,
    NewMessageSocketResponse,
    MessageSocketResponse,
    SeenMessageSocketResponse,
} from 'types/chatApi-types';
import NoMessageLight from '@assets/messenger/NoMessageLight.png';
import { formatTimeAgo } from '@utils/formatTimeAgo';
import newMessageSound from '@assets/messenger/SoundNewMessage.mp3';
import { LastMessageStatusType } from 'types/types';

const Messenger: React.FC = () => {
    const socket = useSocket();
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    const bottomRef = useRef<HTMLUListElement>(null);

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

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const oldMessagesChunk = useGetMessagesQuery({ chatId, page: page }, { skip: !chatId });

    const { data: userDetails } = useUserDetailsQuery();

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

    const submitHandler: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        socket.emit(NEW_MESSAGE, { senderId: userId, chatId, members, message });
        setMessage('');
    };

    const addEmoji = (emojiData: any) => {
        const unicodeStrings = emojiData.unified.split('_');
        const codePoints = unicodeStrings.map((el: string) => parseInt(el, 16));
        const emoji = String.fromCodePoint(...codePoints);
        setMessage(message + emoji);
    };

    const addUserListener = useCallback((data: AddMemberSocketResponse[]) => {
        console.log('ADD_USER:', data);
        setOnlineUsers(data);

        return () => {
            socket.off(ADD_USER);
        };
    }, []);

    const newMessageListener = useCallback(
        (data: NewMessageSocketResponse) => {
            if (data.chatId !== chatId) return;

            ////////////////////////////////////////////////////
            const sound = new Audio(newMessageSound);

            if (data.sender !== userId) {
                sound.play();
            }
            ////////////////////////////////////////////////////

            setMessages((prev) => [...prev, data.message]);
        },
        [chatId]
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
            console.log(data);
        },
        [chatId]
    );

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
    ];

    useErrors(errors);

    const eventHandler = {
        [ADD_USER]: addUserListener,
        [NEW_MESSAGE]: newMessageListener,
        [OFFLINE_USERS]: offlineUserListener,
        [SEEN_MESSAGE]: seenMessageListener,
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
    }, [messages]);

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
        setTimeout(() => {
            socket.emit(SEEN_MESSAGE, { senderId: userId, chatId, members });
        }, 1000);
    }, [chatId, messages]);

    useEffect(() => {
        const lastMessage = chatDetails.data?.chat?.lastMessage;
        if (lastMessage) {
            setLastMessage({ sender: lastMessage.sender, seen: lastMessage.seen });
        }
    }, [chatDetails]);

    return (
        <div className="flex overflow-hidden" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Sidebar */}
            <div className="w-[22rem] overflow-auto border-r border-t border-bdCustom2">
                <h2 className="font-bold text-textBlackGray">Đoạn chat</h2>

                {/* search */}
                <div className="mb-4 flex items-center gap-1">
                    {searchVisible && (
                        <div className="rounded-full p-2 hover:bg-bgHoverGrayDark">
                            <GoArrowLeft size={20} className="text-textCustom" />
                        </div>
                    )}

                    <div className="flex flex-1 items-center gap-2 rounded-full bg-bgHoverGrayDark p-2">
                        <IoSearchSharp size={20} className="left-3 text-gray-400" />

                        <TippyProvider
                            visible={searchVisible}
                            placement="bottom"
                            onClickOutside={handleCloseSearch}
                            content={
                                <ul className="scrollbar-small mr-16 mt-2 max-h-[34rem] w-[15rem] overflow-auto rounded-md bg-bgCustom shadow-md">
                                    {friends.map((friend: UserDetailsType) => (
                                        <li
                                            className="flex cursor-pointer select-none items-center gap-2 p-3 hover:bg-bgHoverGrayDark"
                                            key={friend._id}
                                            onClick={() => handleRedirectChatId(friend._id)}
                                        >
                                            <Avatar
                                                src={friend.photo.url} // Assuming `photo.url` contains the URL for the avatar
                                                size={35}
                                            />
                                            <h3 className="leading-tight text-textCustom">{friend.username}</h3>
                                        </li>
                                    ))}
                                </ul>
                            }
                        >
                            <input
                                type="text"
                                className="w-full bg-transparent text-textCustom"
                                placeholder="Tìm kiếm trên messenger"
                                value={searchInputValue}
                                // trimStart() ngăn người dùng nhấn cách lần đầu
                                onChange={(e) => setSearchInputValue(e.target.value.trimStart())}
                                onClick={() => setSearchVisible(true)}
                            />
                        </TippyProvider>
                    </div>
                </div>

                {/* Chat Sidebar */}
                {!searchVisible && !myChatsLoading && (
                    <ul>
                        {myChats?.chats?.map((chat: Chat) => (
                            <Link to={`/messages/${chat._id}`} key={chat._id} style={{ textDecoration: 'none' }}>
                                <li
                                    className={`flex cursor-pointer items-center gap-3 rounded-md ${
                                        chatId === chat._id ? 'bg-bgHoverGrayDark' : ''
                                    } py-1 hover:bg-bgHoverGrayDark`}
                                >
                                    <Avatar.Group>
                                        {chat.avatar.map((avatar: string, index: number) => (
                                            <Avatar src={avatar} size={45} key={index} />
                                        ))}
                                    </Avatar.Group>

                                    <div className="flex-1 select-none py-2">
                                        <h3 className="font-semibold leading-tight text-textCustom">{chat.name}</h3>
                                        <p className="text-textBlackGray">Tin nhắn mới nhất!</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
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
                    <div className="flex items-center gap-2 border-t border-bdCustom2 px-2 shadow">
                        <div className="relative">
                            <Avatar src={receiver?.photo.url} size={45} />
                            {online && (
                                <div className="absolute bottom-0.5 right-0 h-3 w-3 rounded-full bg-green-400 outline outline-white"></div>
                            )}
                        </div>

                        <div className="flex-1 select-none py-2">
                            <h3 className="font-semibold leading-tight text-textCustom">{receiver?.username}</h3>
                            {online ? (
                                <p className="text-[0.8rem] font-normal text-textBlackGray">Đang hoạt động</p>
                            ) : (
                                <p className="text-[0.8rem] font-normal text-textBlackGray">
                                    Hoạt động {formatTimeAgo(lastOnlineTime as string)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <ul
                        className="scrollbar-mess mb-14 flex flex-col gap-2 overflow-auto pb-4 pt-2"
                        style={{ height: 'calc(100% - 6.3rem)' }}
                        ref={bottomRef}
                    >
                        {(oldMessagesChunk.isLoading || oldMessagesChunk.isFetching) && <Spin indicator={<LoadingOutlined spin />} />}

                        {allMessages.map((message: Message) => (
                            <li className="mr-2 flex gap-2" key={message._id}>
                                {userDetails?.user._id !== message.sender._id && <Avatar src={receiver?.photo.url} />}

                                <div
                                    className={`max-w-[33rem] ${
                                        userDetails?.user._id === message.sender._id ? 'ml-auto' : ''
                                    } flex flex-col items-center`}
                                >
                                    <p
                                        className={`max-w-[33rem] ${
                                            userDetails?.user._id === message.sender._id ? ' bg-blue-500 text-white' : ''
                                        } rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom`}
                                    >
                                        {message.content}
                                    </p>

                                    {message._id === lastMessageId && (
                                        <p className="mt-1 max-w-max text-xs leading-tight">
                                            {message.sender._id === userId &&
                                                (lastMessage.sender === message.sender._id && lastMessage.seen ? 'Đã xem' : 'Đã gửi')}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Chat bar */}
                    <form onSubmit={submitHandler} className="sticky bottom-0 flex items-center gap-2 bg-bgCustom px-2 pb-1">
                        {/* File Media */}
                        <div>
                            <GoFileMedia size={20} color="#3798f2" className="cursor-pointer" />
                        </div>

                        <div className="relative flex w-full">
                            <input
                                type="text"
                                className="w-full rounded-full bg-bgHoverGrayDark p-2 text-textCustom"
                                value={message}
                                onFocus={() => setEmojiShow(false)}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Aa"
                            />
                            <MdOutlineAddReaction
                                className="absolute bottom-0 right-2 translate-y-[-50%] cursor-pointer"
                                size={18}
                                color="#3798f2"
                                onClick={() => setEmojiShow(!emojiShow)}
                            />

                            {emojiShow && (
                                <div className="absolute bottom-12 right-0 select-none">
                                    <Picker data={data} onEmojiSelect={addEmoji} previewPosition="none" />
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
