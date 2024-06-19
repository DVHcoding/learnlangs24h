// ##########################
// #      IMPORT NPM        #
// ##########################
import { useCallback, useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import { IoMdSend } from 'react-icons/io';
import { GoFileMedia } from 'react-icons/go';
import { MdOutlineAddReaction } from 'react-icons/md';

// ##########################
// #    IMPORT Components   #
// ##########################
import TippyProvider from '@components/Tippys/TippyProvider';
import userDebounce from '@hooks/userDebounce';
import { Chat, UserDetailsType } from 'types/api-types';
import { useLazySearchUserQuery, useUserDetailsQuery } from '@store/api/userApi';
import { toastError } from '@components/Toast/Toasts';
import { useGetChatByIdMutation, useGetChatDetailsQuery, useGetMyChatsQuery } from '@store/api/chatApi';
import useErrors from '@hooks/useErrors';
import { ADD_USER, NEW_MESSAGE } from '@constants/events';
import { useSocket } from '@utils/socket';
import useSocketEvents from '@hooks/useSocketEvents';
import { MessageSocketResponse } from 'types/types';

const Messenger: React.FC = () => {
    const socket = useSocket();
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const navigate = useNavigate();
    const { chatId } = useParams<string>();

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetails } = useUserDetailsQuery();
    const { data: myChats, isError: myChatsIsError, error: myChatsError, isLoading: myChatsLoading } = useGetMyChatsQuery();
    const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
    const [searchUser] = useLazySearchUserQuery();
    const [getChatById] = useGetChatByIdMutation();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [friends, setFriends] = useState<UserDetailsType[]>([]);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<MessageSocketResponse[]>([]);

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const members = chatDetails.data?.chat?.members.map((member) => member._id);
    const userId = userDetails?.user?._id;
    const receiver = chatDetails.data?.chat?.members.find((member) => member._id !== userId);

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

    const handleCloseSearch = () => {
        setSearchVisible(false);
        setSearchInputValue('');
    };

    const addUserListener = useCallback((data: any) => {
        console.log('adduser:', data);
    }, []);

    const newMessageListener = useCallback((data: any) => {
        console.log(data);
        if (data.chatId !== chatId) return;

        setMessages((prev) => [...prev, data.message]);
    }, []);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;

        socket.emit(NEW_MESSAGE, { senderId: userId, chatId, members, message });
        setMessage('');
    };

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
    };

    useSocketEvents(socket, eventHandler);

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        const userId = userDetails?.user._id;

        if (userId) {
            socket.emit(ADD_USER, { userId: userId });
        }
    }, [userDetails?.user._id]);

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

    return (
        <div className="flex overflow-hidden" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Sidebar */}
            <div className="w-[22rem] overflow-auto border-r border-t border-[#e5e5e5]">
                <h2 className="font-bold text-textBlackGray">Đoạn chat</h2>

                {/* search */}
                <div className="mb-4 flex items-center gap-1">
                    {searchVisible && (
                        <div className="rounded-full p-2 hover:bg-bgHoverGrayDark">
                            <GoArrowLeft size={20} />
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
                        {myChats?.chats.map((chat: Chat) => (
                            <Link to={`/messages/${chat._id}`} key={chat._id} style={{ textDecoration: 'none' }}>
                                <li
                                    className={`flex cursor-pointer items-center gap-3 rounded-md ${
                                        chatId === chat._id ? 'bg-bgHoverGrayDark' : ''
                                    } hover:bg-bgHoverGrayDark`}
                                >
                                    <Avatar.Group>
                                        {chat.avatar.map((avatar, index: number) => (
                                            <Avatar src={avatar} size={45} key={index} />
                                        ))}
                                    </Avatar.Group>

                                    <div className="flex-1 select-none py-2">
                                        <h3 className="font-semibold leading-tight text-textCustom">{chat.name}</h3>
                                        <p className="text-textBlackGray">.....</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>

            {/* Content  */}
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center gap-2 border-t px-2 shadow">
                    <div className="relative">
                        <Avatar src={receiver?.photo.url} size={45} />
                        <div className="absolute bottom-0.5 right-0 h-3 w-3 rounded-full bg-green-400 outline outline-white"></div>
                    </div>
                    <div className="flex-1 select-none py-2">
                        <h3 className="font-semibold leading-tight text-textCustom">{receiver?.username}</h3>
                        <p className="text-[0.8rem] font-normal text-textBlackGray">Đang hoạt động</p>
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-auto" style={{ height: 'calc(100% - 3.3rem)' }}>
                    <ul className="mx-2 mb-14 mt-2 flex flex-col gap-2">
                        {messages.map((message: MessageSocketResponse) => (
                            <li className="flex gap-2" key={message._id}>
                                {userDetails?.user._id !== message.sender._id && <Avatar src={receiver?.photo.url} />}

                                <p
                                    className={`max-w-[33rem] ${
                                        userDetails?.user._id === message.sender._id ? 'ml-auto bg-blue-500 text-white' : ''
                                    } rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom`}
                                >
                                    {message.content}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

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
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Aa"
                        />
                        <MdOutlineAddReaction
                            className="absolute bottom-0 right-2 translate-y-[-50%] cursor-pointer"
                            size={18}
                            color="#3798f2"
                        />
                    </div>

                    <button type="submit">
                        <IoMdSend size={25} color="#3798f2" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Messenger;
