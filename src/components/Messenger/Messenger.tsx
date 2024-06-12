// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { IoMdSend } from 'react-icons/io';
import { GoFileMedia } from 'react-icons/go';
import { MdOutlineAddReaction } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';

// ##########################
// #    IMPORT Components   #
// ##########################
import TippyProvider from '@components/Tippys/TippyProvider';
import userDebounce from '@hooks/userDebounce';
import axios from 'axios';
import { SearchUsersResponseType, UserDetailsType } from 'types/api-types';
import { Link } from 'react-router-dom';

const Messenger: React.FC = () => {
    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [searchVisible, setSearchVisible] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [friends, setFriends] = useState<UserDetailsType[]>([]);

    // const { data: searchUserData, refetch: refetchSearchUser } = useSearchUserQuery('');
    const debounced = userDebounce(inputValue, 500);
    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        if (!searchVisible || inputValue === '') {
            setFriends([]);
            return;
        }

        const refetch = async () => {
            try {
                const { data }: { data: SearchUsersResponseType } = await axios.get(
                    `/api/v1/user?username=${encodeURIComponent(debounced)}`
                );

                if (data.users) {
                    setFriends(data.users);
                } else {
                    setFriends([]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        refetch();
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
                            onClickOutside={() => setSearchVisible(false)}
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
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
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
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center gap-2 border-t px-2 shadow">
                    <div className="relative">
                        <Avatar
                            src={
                                <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                            }
                            size={45}
                        />
                        <div className="absolute bottom-0.5 right-0 h-3 w-3 rounded-full bg-green-400 outline outline-white"></div>
                    </div>
                    <div className="flex-1 select-none py-2">
                        <h3 className="font-semibold leading-tight text-textCustom">Đỗ Hùng</h3>
                        <p className="text-[0.8rem] font-normal text-textBlackGray">Đang hoạt động</p>
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-auto" style={{ height: 'calc(100% - 3.3rem)' }}>
                    <ul className="mx-2 mb-14 mt-2 flex flex-col gap-2">
                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">Day la tin nhan dau tien</p>
                        </li>

                        <li className="flex gap-2">
                            <p className="ml-auto max-w-[33rem] rounded-2xl bg-blue-500 p-2 text-white"> Tin nhan cua toi</p>
                        </li>

                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">Day la tin nhan thu 2</p>
                        </li>

                        <li className="flex gap-2">
                            <p className="ml-auto max-w-[33rem] rounded-2xl bg-blue-500 p-2 text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias unde commodi illum laboriosam corporis
                                iure eum voluptatibus eveniet, nesciunt ipsam voluptates nisi sequi fugit, dicta neque voluptas inventore?
                                Blanditiis, doloribus?
                            </p>
                        </li>

                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, fugit. Quos non unde omnis porro
                                praesentium rerum voluptates autem? Accusamus explicabo ad quas. Veniam voluptate in eligendi et perferendis
                                deleniti?
                            </p>
                        </li>

                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, fugit. Quos non unde omnis porro
                                praesentium rerum voluptates autem? Accusamus explicabo ad quas. Veniam voluptate in eligendi et perferendis
                                deleniti?
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Chat bar */}
                <div className="sticky bottom-0 flex items-center gap-2 bg-bgCustom px-2 pb-1">
                    {/* File Media */}
                    <div>
                        <GoFileMedia size={20} color="#3798f2" className="cursor-pointer" />
                    </div>

                    <div className="relative flex w-full">
                        <input type="text" className="w-full rounded-full bg-bgHoverGrayDark p-2 text-textCustom" placeholder="Aa" />
                        <MdOutlineAddReaction
                            className="absolute bottom-0 right-2 translate-y-[-50%] cursor-pointer"
                            size={18}
                            color="#3798f2"
                        />
                    </div>

                    <button>
                        <IoMdSend size={25} color="#3798f2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
