// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Avatar, Button } from 'antd';
import { Fragment } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { APIResponse, Follow, UserDetailsPopulateResponseType } from 'types/api-types';

interface IsFollowingTabProps {
    dataUserDetailsPopulate: UserDetailsPopulateResponseType | undefined;
    dataUserDetails: APIResponse;
    loadingStates: Record<string, boolean>;
    isLoadingApis: boolean;
    handleTabUserAction: (currentUserData: APIResponse, targetUserData: Follow) => Promise<void>;
    getButtonLabelTab: (userData: APIResponse, targetUser: Follow) => 'Theo dõi' | 'Bạn bè' | 'Theo dõi lại' | 'Đã theo dõi';
    getButtonStyleTab: (userData: APIResponse, targetUser: Follow) => 'bg-[#d8dadf]' | 'bg-[#0861f2] text-white border-none';
}

const IsFollowingTab: React.FC<IsFollowingTabProps> = ({
    dataUserDetailsPopulate,
    dataUserDetails,
    loadingStates,
    isLoadingApis,
    handleTabUserAction,
    getButtonLabelTab,
    getButtonStyleTab,
}) => {
    return (
        <Fragment>
            <ul className="flex flex-col items-center gap-2">
                {dataUserDetailsPopulate?.user?.following?.map((user: Follow) => (
                    <li className="flex w-[90%] items-center justify-between rounded-lg bg-bgCustom p-2" key={user._id}>
                        <div className="flex items-center gap-2">
                            <Avatar size={'large'} style={{ backgroundColor: '#87d068' }} src={user?.photo?.url} />
                            <div>
                                <p className="font-segoe leading-tight text-textCustom">{user.username}</p>
                                <p className="mt-1 font-segoe leading-tight text-textCustom">{user.nickname}</p>
                            </div>
                        </div>
                        {dataUserDetails.user._id === dataUserDetailsPopulate.user._id && (
                            <Button
                                className={`${getButtonStyleTab(dataUserDetails, user)}`}
                                onClick={() => handleTabUserAction(dataUserDetails, user)}
                                loading={loadingStates[user._id]}
                                disabled={isLoadingApis}
                            >
                                {getButtonLabelTab(dataUserDetails, user)}
                            </Button>
                        )}
                    </li>
                ))}

                <li className="font-segoe text-textCustom">loading...</li>
            </ul>
        </Fragment>
    );
};

export default IsFollowingTab;
