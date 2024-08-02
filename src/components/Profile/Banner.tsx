// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button } from 'antd';
import dayjs from 'dayjs';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import AvatarFrame from '@assets/profiles/avatarFrame.png';
import BannerIcon from '@assets/profiles/persional-header.svg';
import { APIResponse } from 'types/api-types';

interface BannerProps {
    dataUserByNickName: APIResponse;
    dataUserDetails: APIResponse;
    isLoadingApis: boolean;
    handleUserAction: (currentUserData: APIResponse, targetUserData: APIResponse) => void;
    getActionButtonLabel: (
        currentUserData: APIResponse,
        targetUserData: APIResponse
    ) => 'Bạn bè' | 'Theo dõi lại' | 'Đã theo dõi' | 'Theo dõi';
    getActionButtonStyle: (
        currentUserData: APIResponse,
        targetUserData: APIResponse
    ) => 'bg-[#d8dadf]' | 'bg-[#0861f2] text-white border-none';
}

const Banner: React.FC<BannerProps> = ({
    dataUserByNickName,
    dataUserDetails,
    isLoadingApis,
    getActionButtonLabel,
    handleUserAction,
    getActionButtonStyle,
}) => {
    return (
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
                        <img src={dataUserByNickName?.user?.photo?.url} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                    </div>

                    {dataUserDetails.user._id !== dataUserByNickName.user._id && (
                        <Button
                            className={getActionButtonStyle(dataUserDetails, dataUserByNickName)}
                            loading={isLoadingApis}
                            disabled={isLoadingApis}
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
                            <span className="text-nowrap font-be text-textCustom">Id: {dataUserByNickName?.user?.nickname}</span>
                        </li>
                    </div>
                </ul>
            </div>

            <img src={BannerIcon} alt="banner icon" className="absolute right-0 hidden xl:block" />
        </div>
    );
};

export default Banner;