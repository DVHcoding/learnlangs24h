// ##########################
// #      IMPORT NPM        #
// #########################
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

// ##########################
// #    IMPORT Components   #
// ##########################
import { Chat, MyChatResponse } from 'types/api-types';

interface SidebarProps {
    chatId: string | undefined;
    searchVisible: boolean;
    myChatsLoading: boolean;
    myChats: MyChatResponse | undefined;
    setIsOpen: (isOpen: boolean) => void;
}

const ChatSideBar: React.FC<SidebarProps> = ({ chatId, searchVisible, myChatsLoading, myChats, setIsOpen }) => {
    return (
        <Fragment>
            {!searchVisible && !myChatsLoading && (
                <ul>
                    {myChats?.chats?.map((chat: Chat) => (
                        <Link to={`/messages/${chat._id}`} key={chat._id} style={{ textDecoration: 'none' }}>
                            <li
                                className={`flex cursor-pointer items-center gap-3 rounded-md ${
                                    chatId === chat._id ? 'bg-bgHoverGrayDark' : ''
                                } py-1 hover:bg-bgHoverGrayDark`}
                                onClick={() => setIsOpen(false)}
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
        </Fragment>
    );
};

export default ChatSideBar;
