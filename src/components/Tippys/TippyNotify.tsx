// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'rsuite';
import { BellRing } from 'lucide-react';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import TippyProvider from '@components/Tippys/TippyProvider';
import { useGetAllNotificationQuery, useMarkedNotificationMutation } from '@store/api/notification.api';
import { useUserDetailsQuery } from '@store/api/userApi';
import { Notification } from 'types/notification.types';
import { formatTimeAgo } from '@utils/formatTimeAgo';
import { AppDispatch, RootState } from '@store/store';
import { addNotification } from '@store/reducer/notification.reducer';
import { useAsyncMutation } from '@hooks/useAsyncMutation';

const TippyNotify: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { notification } = useSelector((state: RootState) => state.notification);

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
    const userId = useMemo(() => userDetailsData?.user?._id, [userDetailsData?.user]);

    const { data: notificationsData } = useGetAllNotificationQuery(userId, { skip: !userId });
    const [markedNotification] = useAsyncMutation(useMarkedNotificationMutation);

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const unreadNotification = notification.filter((noti: Notification) => !noti.isRead).length;

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const hide = (): void => setVisible(false);

    const handleNavigate = async (notificationId: string, relatedId: string, isRead: boolean) => {
        if (isRead) {
            navigate(relatedId);
            return;
        }

        await markedNotification(notificationId);
        navigate(relatedId);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        if (!notificationsData?.success) {
            return;
        }

        dispatch(addNotification(notificationsData.notification));
    }, [notificationsData]);

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

                    {notification && notification.length <= 0 && (
                        <h3 className="select-none text-center font-be text-textCustomProcess">Không có thông báo nào!</h3>
                    )}

                    <ul className="scrollbar flex max-h-96 min-w-[20.5rem] flex-col gap-2 overflow-auto px-2">
                        {notification.map((notification: Notification) => (
                            <li
                                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg
                                    p-2 transition-all duration-100 hover:bg-bgHoverGrayDark ${
                                        notification.isRead ? '' : 'bg-bgHoverGrayDark'
                                    }`}
                                key={notification._id}
                                onClick={() => handleNavigate(notification._id, notification.relatedId, notification.isRead)}
                            >
                                <Avatar size="md" circle src={notification?.sender?.photo?.url} alt={notification.sender.nickname} />

                                <div>
                                    <h4 className="font-be leading-6 text-textCustom">{parse(notification.content)}</h4>
                                    <p className="font-body font-semibold text-lime-600">{formatTimeAgo(notification.createdAt)}</p>
                                </div>
                            </li>
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
            <Badge count={unreadNotification ?? 0} size="small" className="cursor-pointer select-none">
                <BellRing
                    size={22}
                    strokeWidth={1.6}
                    className="text-textCustom"
                    aria-hidden="true" // Adding aria-hidden to hide from accessibility tree as it's decorative
                    onClick={() => setVisible(!visible)}
                />
            </Badge>
        </TippyProvider>
    );
};

export default TippyNotify;
