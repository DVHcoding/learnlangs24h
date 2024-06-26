// ##########################
// #      IMPORT NPM        #
// ##########################
import { Avatar } from 'antd';

// ##########################
// #    IMPORT Components   #
// ##########################
import { AddMemberSocketResponse, Member } from 'types/chatApi-types';
import { formatTimeAgo } from '@utils/formatTimeAgo';

interface ChatHeaderContentProps {
    receiver: Member | undefined;
    online: AddMemberSocketResponse | undefined;
    lastOnlineTime: string | Date | undefined;
}

const ChatHeader: React.FC<ChatHeaderContentProps> = ({ receiver, online, lastOnlineTime }) => {
    return (
        <div className="flex items-center gap-2 border-t border-bdCustom2 px-2 shadow">
            <div className="relative">
                <Avatar src={receiver?.photo.url} size={45} />
                {online && <div className="absolute bottom-0.5 right-0 h-3 w-3 rounded-full bg-green-400 outline outline-white"></div>}
            </div>

            <div className="flex-1 select-none py-2">
                <h3 className="font-semibold leading-tight text-textCustom">{receiver?.username}</h3>
                {online ? (
                    <p className="text-[0.8rem] font-normal text-textBlackGray">Đang hoạt động</p>
                ) : (
                    <p className="text-[0.8rem] font-normal text-textBlackGray">Hoạt động {formatTimeAgo(lastOnlineTime as Date)}</p>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
