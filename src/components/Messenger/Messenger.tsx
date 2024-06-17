// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { IoSearchSharp } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';
import { Link, useNavigate, useParams } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################
import TippyProvider from '@components/Tippys/TippyProvider';
import userDebounce from '@hooks/userDebounce';
import { Chat, UserDetailsType } from 'types/api-types';
import { useLazySearchUserQuery } from '@store/api/userApi';
import { toastError } from '@components/Toast/Toasts';
import ChatContent from '@components/Messenger/ChatContent';
import { useGetChatByIdMutation, useGetChatDetailsQuery, useGetMyChatsQuery } from '@store/api/chatApi';
import useErrors from '@hooks/useErrors';

const Messenger: React.FC = () => {
    /* -------------------------------------------------------------------------- */
    /*                               REACT ROUTE DOM                              */
    /* -------------------------------------------------------------------------- */
    const navigate = useNavigate();
    const { chatId } = useParams<string>();

    /* -------------------------------------------------------------------------- */
    /*                                     RTK                                    */
    /* -------------------------------------------------------------------------- */
    const { data: myChats, isError: myChatsIsError, error: myChatsError, isLoading: myChatsLoading } = useGetMyChatsQuery();
    const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
    const [searchUser] = useLazySearchUserQuery();
    const [getChatById] = useGetChatByIdMutation();

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [friends, setFriends] = useState<UserDetailsType[]>([]);

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */
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

    /* -------------------------------------------------------------------------- */
    /*                                CUSTOM HOOKS                                */
    /* -------------------------------------------------------------------------- */
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

    /* -------------------------------------------------------------------------- */
    /*                                  useEffect                                  */
    /* -------------------------------------------------------------------------- */
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
                                        <p className="text-textBlackGray">This is a example text</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>

            {/* Content  */}
            <ChatContent />
        </div>
    );
};

export default Messenger;
