// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
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
import { hasLoadingApis } from '@utils/Helpers';

const Achievement = loadable(() => import('./Achievement'));
const Exam = loadable(() => import('./Exam'));
const Calendar = loadable(() => import('./Calendar'));
const Banner = loadable(() => import('./Banner'));
const IsFollowingTab = loadable(() => import('./IsFollowingTab'));
const FollowerTab = loadable(() => import('./FollowerTab'));

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
    const isLoadingApis = hasLoadingApis([followUserLoading, unFollowLoading, addFriendLoading, unFriendLoading]);

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
                            title: <Link to={`/profile/${dataUserDetails?.user.nickname}`}>Profile</Link>,
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
                    <Banner
                        dataUserByNickName={dataUserByNickName}
                        dataUserDetails={dataUserDetails}
                        getActionButtonLabel={getActionButtonLabel}
                        getActionButtonStyle={getActionButtonStyle}
                        handleUserAction={handleUserAction}
                        isLoadingApis={isLoadingApis}
                    />

                    {/* Bottom */}
                    <div className="mt-4 grid grid-cols-12 gap-4">
                        <Achievement />
                        <Exam />
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
                                            <IsFollowingTab
                                                isLoadingApis={isLoadingApis}
                                                loadingStates={loadingStates}
                                                dataUserDetails={dataUserDetails}
                                                dataUserDetailsPopulate={dataUserDetailsPopulate}
                                                handleTabUserAction={handleTabUserAction}
                                                getButtonLabelTab={getButtonLabelTab}
                                                getButtonStyleTab={getButtonStyleTab}
                                            />
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: 'Người theo dõi',
                                        children: (
                                            <FollowerTab
                                                dataUserDetails={dataUserDetails}
                                                dataUserDetailsPopulate={dataUserDetailsPopulate}
                                                isLoadingApis={isLoadingApis}
                                                loadingStates={loadingStates}
                                                getButtonLabelTab={getButtonLabelTab}
                                                getButtonStyleTab={getButtonStyleTab}
                                                handleTabUserAction={handleTabUserAction}
                                            />
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
