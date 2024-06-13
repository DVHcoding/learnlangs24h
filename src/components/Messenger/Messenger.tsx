// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { IoSearchSharp } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';
import { Link } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################
import TippyProvider from '@components/Tippys/TippyProvider';
import userDebounce from '@hooks/userDebounce';
import { UserDetailsType } from 'types/api-types';
import { useLazySearchUserQuery } from '@store/api/userApi';
import { toastError } from '@components/Toast/Toasts';
import ChatContent from '@components/Messenger/ChatContent';

const Messenger: React.FC = () => {
    const [searchUser] = useLazySearchUserQuery();
    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [friends, setFriends] = useState<UserDetailsType[]>([]);

    const debounced = userDebounce(searchInputValue, 500);
    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
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
                            onClickOutside={() => {
                                setSearchVisible(false);
                                setSearchInputValue('');
                            }}
                            content={
                                <ul className="scrollbar-small mr-16 mt-2 max-h-[34rem] w-[15rem] overflow-auto rounded-md bg-bgCustom shadow-md">
                                    {friends.map((friend: UserDetailsType) => (
                                        <Link to={`/messages/${friend._id}`} key={friend._id} style={{ textDecoration: 'none' }}>
                                            <li className="flex cursor-pointer select-none items-center gap-2 p-3 hover:bg-bgHoverGrayDark">
                                                <Avatar
                                                    src={friend.photo.url} // Assuming `photo.url` contains the URL for the avatar
                                                    size={35}
                                                />
                                                <h3 className="leading-tight text-textCustom">{friend.username}</h3>
                                            </li>
                                        </Link>
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

                {!searchVisible && (
                    <ul>
                        {[...Array(3)].map((_, index) => (
                            <li className="flex cursor-pointer items-center gap-3 rounded-md hover:bg-bgHoverGrayDark" key={index}>
                                <Avatar
                                    src={
                                        <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                    }
                                    size={45}
                                />
                                <div className="flex-1 select-none py-2">
                                    <h3 className="font-semibold leading-tight text-textCustom">Đỗ Hùng</h3>
                                    <p className="text-textBlackGray">This is a example text</p>
                                </div>
                            </li>
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
