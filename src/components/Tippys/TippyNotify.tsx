// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from 'rsuite';
import { BellRing } from 'lucide-react';
import parse from 'html-react-parser';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import TippyProvider from '@components/Tippys/TippyProvider';
import { useGetAllNotificationQuery } from '@store/api/notification.api';
import { useUserDetailsQuery } from '@store/api/userApi';
import { Notification } from 'types/notification.types';
import { formatTimeAgo } from '@utils/formatTimeAgo';

const TippyNotify: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [visible, setVisible] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetailsData } = useUserDetailsQuery();
    const userId = useMemo(() => userDetailsData?.user._id, [userDetailsData?.user]);

    const { data: notificationsData } = useGetAllNotificationQuery(userId, { skip: !userId });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const hide = () => setVisible(false);

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <TippyProvider
            visible={visible}
            placement="bottom-end"
            onClickOutside={hide}
            content={
                <div className="rounded-md border border-bdCustom bg-bgCustom shadow">
                    <div className="flex items-center justify-between gap-2 p-4">
                        <h3 className="font-body font-bold text-textCustom lg:text-lg">Thông báo</h3>

                        <button
                            className="rounded-md p-1 font-body font-semibold text-orange-600
                            transition-all duration-200 hover:bg-bgHoverGrayDark"
                        >
                            Đánh dấu đã đọc
                        </button>
                    </div>

                    <ul className="scrollbar flex h-96 flex-col gap-4 overflow-auto px-2">
                        {notificationsData?.notification.map((notification: Notification) => (
                            <Link to={`/${notification.relatedId}`} key={notification._id} style={{ textDecoration: 'none' }}>
                                <li
                                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg
                                    p-2 transition-all duration-100 hover:bg-bgHoverGrayDark ${
                                        notification.isRead ? '' : 'bg-bgHoverGrayDark'
                                    }`}
                                >
                                    <Avatar size="md" circle src={notification?.sender?.photo?.url} alt={notification.sender.nickname} />

                                    <div>
                                        <h4 className="font-be leading-6 text-textCustom">{parse(notification.content)}</h4>
                                        <p className="font-body font-semibold text-lime-600">{formatTimeAgo(notification.createdAt)}</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    <div className="py-3 transition-all duration-200 hover:bg-bgHoverGrayDark">
                        <Link
                            to="/notification"
                            className="font-body font-bold text-orange-600 hover:text-orange-600"
                            style={{ textDecoration: 'none' }}
                        >
                            <button className="mx-auto">Xem tất cả thông báo</button>
                        </Link>
                    </div>
                </div>
            }
        >
            <Badge
                onClick={() => setVisible(!visible)}
                content={5}
                role="button" // Adding role attribute to indicate clickable element
                aria-label="Toggle visibility" // Adding aria-label for accessibility
                className="cursor-pointer select-none"
            >
                <BellRing
                    size={22}
                    strokeWidth={1.6}
                    className="text-textCustom"
                    aria-hidden="true" // Adding aria-hidden to hide from accessibility tree as it's decorative
                />
            </Badge>
        </TippyProvider>
    );
};

export default TippyNotify;
