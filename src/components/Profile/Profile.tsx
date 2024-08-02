// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';
import { Breadcrumb, Tabs, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import AvatarFrame from '@assets/profiles/avatarFrame.png';
import BannerIcon from '@assets/profiles/persional-header.svg';
import {
    useAddFriendMutation,
    useFollowUserMutation,
    useUnFollowMutation,
    useUnFriendMutation,
    useUserDetailsByNickNameQuery,
    useUserDetailsPopulateQuery,
    useUserDetailsQuery,
} from '@store/api/userApi';
import { useAsyncMutation } from '@hooks/useAsyncMutation';
import { APIResponse, Follow } from 'types/api-types';
import { toastError } from '@components/Toast/Toasts';
import Achievement from './Achievement';
import Exam from './Exam';
import Calendar from './Calendar';

// #########################################################################
const Profile: React.FC = () => {
    const { nickname } = useParams<string>();

    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: dataUserByNickName } = useUserDetailsByNickNameQuery(nickname, { skip: !nickname });
    const { data: dataUserDetails, refetch: refetchUserDetails } = useUserDetailsQuery();
    const { data: dataUserDetailsPopulate, refetch: refetchUserDetailsPopulate } = useUserDetailsPopulateQuery(nickname, {
        skip: !nickname,
    });

    const [followUser, followUserLoading] = useAsyncMutation(useFollowUserMutation);
    const [unFollow, unFollowLoading] = useAsyncMutation(useUnFollowMutation);
    const [addFriend, addFriendLoading] = useAsyncMutation(useAddFriendMutation);
    const [unFriend, unFriendLoading] = useAsyncMutation(useUnFriendMutation);

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleUserAction: (currentUserData: APIResponse, targetUserData: APIResponse) => void = (currentUserData, targetUserData) => {
        const { _id: currentUserId, following, friends } = currentUserData.user;
        const { _id: targetUserId, following: targetUserFollowing } = targetUserData.user;
        const isFollowing = following.includes(targetUserId);
        const isFriend = friends.includes(targetUserId);
        const isFollowedByTarget = targetUserFollowing.includes(currentUserId);

        // unFriend
        if (isFriend) {
            return unFriend({ userId: targetUserId });
        }

        // unFollow
        if (isFollowing) {
            return unFollow({ userId: targetUserId });
        }

        // addFriend
        if (isFollowedByTarget) {
            return addFriend({ userId: targetUserId });
        }

        // Follow
        return followUser({ userId: targetUserId });
    };

    const getActionButtonLabel = (currentUserData: APIResponse, targetUserData: APIResponse) => {
        const { _id: currentUserId, following, friends } = currentUserData.user;
        const { _id: targetUserId } = targetUserData.user;
        const isFollowing = following.includes(targetUserId); // Nếu mình đã follow đối phương rồi
        const isFollowedByTarget = targetUserData.user.following.includes(currentUserId); // Nếu đối phương đã follow mình
        const isFriend = friends.includes(targetUserId); // Nếu đã kết bạn

        if (isFriend) return 'Bạn bè';
        if (isFollowedByTarget) return 'Theo dõi lại';
        if (isFollowing) return 'Đã theo dõi';
        return 'Theo dõi';
    };

    const getActionButtonStyle = (currentUserData: APIResponse, targetUserData: APIResponse) => {
        const { _id: currentUserId, following, friends } = currentUserData.user;
        const { _id: targetUserId } = targetUserData.user;
        const isFollowing = following.includes(targetUserId); // Nếu mình đã follow đối phương rồi
        const isFollowedByTarget = targetUserData.user.following.includes(currentUserId); // Nếu đối phương đã follow mình rồi
        const isFriend = friends.includes(targetUserId); // Nếu đã kết bạn

        if (isFriend) return 'bg-[#d8dadf]';
        if (isFollowedByTarget) return 'bg-[#0861f2] text-white border-none';
        if (isFollowing) return 'bg-[#0861f2] text-white border-none';
        return 'bg-[#0861f2] text-white border-none';
    };

    const getButtonLabelTab = (userData: APIResponse, targetUser: Follow) => {
        const { _id: myUserId, following, friends } = userData.user;
        const { _id: targetId } = targetUser;
        const isFollowing = following.includes(targetId); // Nếu mình đã follow đối phương rồi
        const isFollowedBack = targetUser.following.includes(myUserId); // Nếu đối phương đã follow mình
        const isFriend = friends.includes(targetId); // Nếu đã kết bạn

        if (isFriend) return 'Bạn bè';
        if (isFollowedBack) return 'Theo dõi lại';
        if (isFollowing) return 'Đã theo dõi';
        return 'Theo dõi';
    };

    const getButtonStyleTab = (userData: APIResponse, targetUser: Follow) => {
        const { _id: myUserId, following, friends } = userData.user;
        const { _id: targetId } = targetUser;
        const isFollowing = following.includes(targetId); // Nếu đã theo dõi đối phương
        const isFollowedBack = targetUser.following.includes(myUserId); // Nếu đối phương đã follow mình
        const isFriend = friends.includes(targetId); // Nếu đã là bạn bè

        if (isFriend) return 'bg-[#d8dadf]';
        if (isFollowedBack || isFollowing) return 'bg-[#0861f2] text-white border-none';
        return 'bg-[#0861f2] text-white border-none';
    };

    const handleTabUserAction = async (currentUserData: APIResponse, targetUserData: Follow) => {
        const { _id: currentUserId, following, friends } = currentUserData.user;
        const { _id: targetUserId, following: targetUserFollowing } = targetUserData;
        const isFollowing = following.includes(targetUserId);
        const isFriend = friends.includes(targetUserId);
        const isFollowedByTarget = targetUserFollowing.includes(currentUserId);

        /**
         * Ví dụ sử dụng Computed Property Names
         *
         * let userId = 'user123';
         * let isLoading = true;
         *
         * let loadingStates = {
         *   [userId]: isLoading
         * };
         *
         * console.log(loadingStates); // Kết quả: { user123: true }
         */

        setLoadingStates((prev) => ({ ...prev, [targetUserId]: true }));

        try {
            switch (true) {
                case isFriend:
                    await unFriend({ userId: targetUserId });
                    break;
                case isFollowing:
                    await unFollow({ userId: targetUserId });
                    break;
                case isFollowedByTarget:
                    await addFriend({ userId: targetUserId });
                    break;
                default:
                    await followUser({ userId: targetUserId });
                    break;
            }

            // Cập nhật lại dữ liệu sau khi thực hiện hành động
            refetchUserDetails();
            refetchUserDetailsPopulate();
        } catch (error) {
            toastError('Có lỗi xảy ra. Vui lòng thử lại sau!');
        } finally {
            setLoadingStates((prev) => ({ ...prev, [targetUserId]: false }));
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="h-full px-4 phone:p-1 ">
            {/* BreadCrumbs */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: 'Profile',
                        },
                        {
                            title: nickname,
                        },
                    ]}
                />
            </div>

            {dataUserByNickName?.user && dataUserDetails?.user ? (
                <div className="mt-2 h-full justify-between">
                    {/* Banner */}
                    <div
                        className="relative flex h-[13rem] w-full items-center overflow-x-auto rounded-lg phone:h-[20rem]"
                        style={{ backgroundColor: 'rgb(52 109 226 / 47%)' }}
                    >
                        <div className="ml-4 flex gap-4 phone:flex-col">
                            <div
                                className="relative flex select-none flex-col gap-2 rounded-full 
                                phone:flex-row phone:items-center phone:gap-4"
                            >
                                <div className="h-24 w-24 overflow-hidden">
                                    <img
                                        src={AvatarFrame}
                                        alt="Khung avatar"
                                        className="pointer-events-none absolute left-[-1.5rem] top-[-0.5rem] min-w-[9rem]"
                                    />
                                    <img
                                        src={dataUserByNickName?.user?.photo?.url}
                                        alt="Avatar"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                </div>

                                {dataUserDetails.user._id !== dataUserByNickName.user._id && (
                                    <Button
                                        className={getActionButtonStyle(dataUserDetails, dataUserByNickName)}
                                        loading={followUserLoading || unFollowLoading || addFriendLoading || unFriendLoading}
                                        disabled={followUserLoading || unFollowLoading || addFriendLoading || unFriendLoading}
                                        onClick={() => handleUserAction(dataUserDetails, dataUserByNickName)}
                                    >
                                        {getActionButtonLabel(dataUserDetails, dataUserByNickName)}
                                    </Button>
                                )}
                            </div>

                            <ul className="mt-2 grid grid-cols-3 gap-4">
                                <div className="col-span-1 space-y-2">
                                    <li>
                                        <h2 className="font-body font-bold leading-tight text-textCustom phone:text-lg">
                                            {dataUserByNickName?.user?.username}
                                        </h2>
                                    </li>
                                    <li>
                                        <h3 className="my-0.5 font-be leading-tight text-textCustom">
                                            Follower: {dataUserByNickName?.user?.followers?.length}
                                        </h3>
                                    </li>
                                    <li>
                                        <span className="font-be  text-textCustom">
                                            Join At: {dayjs(dataUserByNickName?.user?.createdAt).format('DD/MM/YYYY')}
                                        </span>
                                    </li>
                                </div>

                                <div className="col-span-1 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <h3 className="text-nowrap font-be leading-tight text-textCustom phone:text-base">Cấp bậc:</h3>

                                        <h4 className="min-w-max select-none rounded-md bg-white px-3 py-1 uppercase leading-tight">
                                            level {dataUserByNickName?.user?.level}
                                        </h4>
                                    </li>

                                    <li>
                                        <h3 className="my-0.5 font-be leading-tight text-textCustom">Bài viết: 12</h3>
                                    </li>

                                    <li>
                                        <span className="text-nowrap font-be text-textCustom">
                                            Id: {dataUserByNickName?.user?.nickname}
                                        </span>
                                    </li>
                                </div>
                            </ul>
                        </div>

                        <img src={BannerIcon} alt="banner icon" className="absolute right-0 hidden xl:block" />
                    </div>

                    {/* Bottom */}
                    <div className="mt-4 grid grid-cols-12 gap-4">
                        {/* Achievement */}
                        <Achievement />

                        {/* Quantity exam completed */}
                        <Exam />

                        {/* Calendar */}
                        <Calendar dataUserByNickName={dataUserByNickName} />

                        {/* Follower */}
                        <div
                            className="tab-profile overflow-auto rounded-lg bg-bgHoverGrayDark p-2 sm:col-span-12 sm:h-[18rem] md:col-span-6 
                            md:row-start-2 md:h-[14.6rem] xl:col-span-4 xl:col-start-9 xl:row-start-2 xl:h-[20rem]"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            <Tabs
                                defaultActiveKey="1"
                                items={[
                                    {
                                        key: '1',
                                        label: 'Đang theo dõi',
                                        children: (
                                            <ul className="flex flex-col items-center gap-2">
                                                {dataUserDetailsPopulate?.user?.following?.map((user: Follow) => (
                                                    <li
                                                        className="flex w-[90%] items-center justify-between rounded-lg bg-bgCustom p-2"
                                                        key={user._id}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Avatar
                                                                size={'large'}
                                                                style={{ backgroundColor: '#87d068' }}
                                                                src={user?.photo?.url}
                                                            />
                                                            <div>
                                                                <p className="font-segoe leading-tight text-textCustom">{user.username}</p>
                                                                <p className="mt-1 font-segoe leading-tight text-textCustom">
                                                                    {user.nickname}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {dataUserDetails.user._id === dataUserDetailsPopulate.user._id && (
                                                            <Button
                                                                className={`${getButtonStyleTab(dataUserDetails, user)}`}
                                                                onClick={() => handleTabUserAction(dataUserDetails, user)}
                                                                loading={loadingStates[user._id]}
                                                                disabled={
                                                                    followUserLoading ||
                                                                    unFollowLoading ||
                                                                    addFriendLoading ||
                                                                    unFriendLoading
                                                                }
                                                            >
                                                                {getButtonLabelTab(dataUserDetails, user)}
                                                            </Button>
                                                        )}
                                                    </li>
                                                ))}

                                                <li className="font-segoe text-textCustom">loading...</li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: 'Người theo dõi',
                                        children: (
                                            <ul className="flex flex-col items-center gap-2">
                                                {dataUserDetailsPopulate?.user &&
                                                    (() => {
                                                        // Chuyển đổi danh sách following thành một tập hợp các _id
                                                        const followingSet = new Set(
                                                            dataUserDetailsPopulate.user.following.map(
                                                                (followingUser: Follow) => followingUser._id
                                                            )
                                                        );

                                                        return dataUserDetailsPopulate.user.followers.map((follower: Follow) => {
                                                            // Kiểm tra nếu follower không có trong tập hợp following
                                                            const isFollowing = followingSet.has(follower._id);

                                                            return (
                                                                !isFollowing && (
                                                                    <Fragment key={follower._id}>
                                                                        <li className="flex w-[90%] items-center justify-between rounded-lg bg-bgCustom p-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <Avatar
                                                                                    size={'large'}
                                                                                    style={{ backgroundColor: '#87d068' }}
                                                                                    src={follower.photo?.url}
                                                                                />
                                                                                <div>
                                                                                    <p className="font-segoe leading-tight text-textCustom">
                                                                                        {follower.username}
                                                                                    </p>
                                                                                    <p className="mt-1 font-segoe leading-tight text-textCustom">
                                                                                        {follower.nickname}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            {dataUserDetails.user._id ===
                                                                                dataUserDetailsPopulate.user._id && (
                                                                                <Button
                                                                                    className={`${getButtonStyleTab(
                                                                                        dataUserDetails,
                                                                                        follower
                                                                                    )}`}
                                                                                    onClick={() =>
                                                                                        handleTabUserAction(dataUserDetails, follower)
                                                                                    }
                                                                                    loading={loadingStates[follower._id]}
                                                                                    disabled={
                                                                                        followUserLoading ||
                                                                                        unFollowLoading ||
                                                                                        addFriendLoading ||
                                                                                        unFriendLoading
                                                                                    }
                                                                                >
                                                                                    {getButtonLabelTab(dataUserDetails, follower)}
                                                                                </Button>
                                                                            )}
                                                                        </li>
                                                                    </Fragment>
                                                                )
                                                            );
                                                        });
                                                    })()}

                                                <li className="font-segoe text-textCustom">loading...</li>
                                            </ul>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default Profile;
