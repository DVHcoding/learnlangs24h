// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Avatar } from 'antd';
import { GoArrowLeft } from 'react-icons/go';
import { IoSearchSharp } from 'react-icons/io5';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { UserDetailsType } from 'types/api-types';
import TippyProvider from '@components/Tippys/TippyProvider';

interface SearchBarProps {
    searchVisible: boolean;
    friends: UserDetailsType[];
    searchInputValue: string;
    handleCloseSearch: () => void;
    handleRedirectChatId: (userId: string) => Promise<void>;
    setSearchInputValue: (value: string) => void;
    setSearchVisible: (value: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchVisible,
    friends,
    searchInputValue,
    handleCloseSearch,
    handleRedirectChatId,
    setSearchInputValue,
    setSearchVisible,
}) => {
    return (
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
    );
};

export default SearchBar;
