// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Avatar, Button } from 'antd';
import { Fragment } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { APIResponse, Follow, UserDetailsPopulateResponseType } from 'types/api-types';

interface FollowerTabProps {
    dataUserDetailsPopulate: UserDetailsPopulateResponseType | undefined;
    dataUserDetails: APIResponse;
    isLoadingApis: boolean;
    loadingStates: Record<string, boolean>;
    getButtonStyleTab: (userData: APIResponse, targetUser: Follow) => 'bg-[#d8dadf]' | 'bg-[#0861f2] text-white border-none';
    handleTabUserAction: (currentUserData: APIResponse, targetUserData: Follow) => Promise<void>;
    getButtonLabelTab: (userData: APIResponse, targetUser: Follow) => 'Theo dõi' | 'Bạn bè' | 'Theo dõi lại' | 'Đã theo dõi';
}

const FollowerTab: React.FC<FollowerTabProps> = ({
    dataUserDetails,
    dataUserDetailsPopulate,
    isLoadingApis,
    loadingStates,
    getButtonLabelTab,
    getButtonStyleTab,
    handleTabUserAction,
}) => {
    return (
        <Fragment>
            <ul className="flex flex-col items-center gap-2">
                {dataUserDetailsPopulate?.user &&
                    (() => {
                        // Chuyển đổi danh sách following thành một tập hợp các _id
                        const followingSet = new Set(
                            dataUserDetailsPopulate.user.following.map((followingUser: Follow) => followingUser._id)
                        );

                        return dataUserDetailsPopulate.user.followers.map((follower: Follow) => {
                            // Kiểm tra nếu follower không có trong tập hợp following
                            const isFollowing = followingSet.has(follower._id);

                            return (
                                !isFollowing && (
                                    <Fragment key={follower._id}>
                                        <li className="flex w-[90%] items-center justify-between rounded-lg bg-bgCustom p-2">
                                            <div className="flex items-center gap-2">
                                                <Avatar size={'large'} style={{ backgroundColor: '#87d068' }} src={follower.photo?.url} />
                                                <div>
                                                    <p className="font-segoe leading-tight text-textCustom">{follower.username}</p>
                                                    <p className="mt-1 font-segoe leading-tight text-textCustom">{follower.nickname}</p>
                                                </div>
                                            </div>

                                            {dataUserDetails.user._id === dataUserDetailsPopulate.user._id && (
                                                <Button
                                                    className={`${getButtonStyleTab(dataUserDetails, follower)}`}
                                                    onClick={() => handleTabUserAction(dataUserDetails, follower)}
                                                    loading={loadingStates[follower._id]}
                                                    disabled={isLoadingApis}
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
        </Fragment>
    );
};

export default FollowerTab;
