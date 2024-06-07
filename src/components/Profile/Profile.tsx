import React from 'react';
// ##################################
// #       IMPORT Npm
// ##################################
import { useParams } from 'react-router-dom';
import { Progress, Empty } from 'antd';
import { Breadcrumb, Tabs, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'react-calendar-heatmap/dist/styles.css';
import type { TabsProps } from 'antd';

// ##################################
// #       IMPORT Components
// ##################################

import AvatarFrame from '@assets/profiles/avatarFrame.png';
import BannerIcon from '@assets/profiles/persional-header.svg';
import Achievement from '@assets/profiles/achievement.svg';
import AchievementActive from '@assets/profiles/achievement-active.svg';
import { useUserDetailsByNickNameQuery } from '@store/api/userApi';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Đang theo dõi',
        children: (
            <ul className="flex flex-col items-center gap-2">
                {[...Array(6)].map((_item, index) => (
                    <li className="flex w-[90%] justify-between rounded-lg bg-bgCustom p-2" key={index}>
                        <div className="flex items-center gap-2">
                            <Avatar size={'large'} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            <div>
                                <p className="font-segoe leading-tight text-textCustom">Đỗ Hùng</p>
                                <p className="mt-1 font-segoe leading-tight text-textCustom">@dohung1504</p>
                            </div>
                        </div>

                        <button className="btn-disabled">Followed</button>
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
                {[...Array(6)].map((_item, index) => (
                    <li className="flex w-[90%] justify-between rounded-lg bg-bgCustom p-2" key={index}>
                        <div className="flex items-center gap-2">
                            <Avatar size={'large'} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            <div>
                                <p className="font-segoe leading-tight text-textCustom">Đỗ Hùng</p>
                                <p className="mt-1 font-segoe leading-tight text-textCustom">@dohung1504</p>
                            </div>
                        </div>

                        <button className="btn-primary">Follow</button>
                    </li>
                ))}
                <li className="font-segoe text-textCustom">loading...</li>
            </ul>
        ),
    },
];

// #########################################################################
const Profile: React.FC = () => {
    const { nickname } = useParams<string>();

    // use RTK query to get userDetailsByNickName
    const { data, isLoading } = useUserDetailsByNickNameQuery(nickname || 'undefined');

    const values = [
        { date: '2024-05-08', count: 0 },
        { date: '2024-05-09', count: 2 },
        { date: '2024-05-10', count: 4 },
        { date: '2024-05-11', count: 6 },
        { date: '2024-05-12', count: 8 },
        { date: '2024-06-01', count: 5 },
        { date: '2024-06-02', count: 3 },
        { date: '2024-06-03', count: 1 },
        { date: '2024-06-04', count: 0 },
        { date: '2024-06-05', count: 2 },
        { date: '2024-06-06', count: 4 },
        { date: '2024-06-07', count: 6 },
        { date: '2024-06-08', count: 7 },
        { date: '2024-06-09', count: 3 },
        { date: '2024-06-10', count: 2 },
        { date: '2024-06-11', count: 1 },
        { date: '2024-06-12', count: 4 },
        { date: '2024-06-13', count: 5 },
        { date: '2024-06-14', count: 6 },
        { date: '2024-06-15', count: 7 },
        { date: '2024-06-16', count: 8 },
        { date: '2024-06-17', count: 0 },
        { date: '2024-06-18', count: 1 },
        { date: '2024-06-19', count: 2 },
        { date: '2024-06-20', count: 3 },
        { date: '2024-06-21', count: 4 },
        { date: '2024-06-22', count: 5 },
        { date: '2024-06-23', count: 6 },
        { date: '2024-06-24', count: 7 },
        { date: '2024-06-25', count: 8 },
    ];

    const handleFollowUser: (userId: string) => void = (userId) => {
        alert(userId);
    };

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

            {data?.success && data.user && !isLoading ? (
                <div className="mt-2 h-full justify-between">
                    {/* Banner */}
                    <div
                        className="relative flex h-[13rem] w-full items-center overflow-x-auto rounded-lg phone:h-[20rem]"
                        style={{ backgroundColor: 'rgb(52 109 226 / 47%)' }}
                    >
                        <div className="ml-4 flex gap-4 phone:flex-col">
                            <div className="relative flex h-24 w-24 select-none flex-col gap-2 rounded-full phone:flex-row phone:items-center phone:gap-4">
                                <img src={AvatarFrame} alt="" className="absolute left-[-1.5rem] top-[-0.5rem] min-w-[9rem]" />
                                <img src={data?.user?.photo?.url} alt="Avatar" className="min-w-[6rem] rounded-full" />

                                <button className="btn-primary" onClick={() => handleFollowUser(data?.user?._id)}>
                                    Follow
                                </button>
                            </div>

                            <ul className="mt-2 grid grid-cols-3 gap-4">
                                <div className="col-span-1 space-y-2">
                                    <li>
                                        <h2 className="font-body font-bold leading-tight text-textCustom phone:text-lg">
                                            {data?.user?.username}
                                        </h2>
                                    </li>
                                    <li>
                                        <h3 className="my-0.5 font-segoe leading-tight text-textCustom">
                                            Follower: {data?.user?.followers?.length}
                                        </h3>
                                    </li>
                                    <li>
                                        <span className="font-segoe text-base text-textCustom">
                                            Join At: {dayjs(data?.user?.createdAt).format('DD/MM/YYYY')}
                                        </span>
                                    </li>
                                </div>

                                <div className="col-span-1 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <h2 className="text-nowrap font-segoe font-bold leading-tight text-textCustom phone:text-base">
                                            Cấp bậc:
                                        </h2>

                                        <h4 className="min-w-max select-none rounded-md bg-white px-3 py-1 uppercase leading-tight">
                                            level {data?.user?.level}
                                        </h4>
                                    </li>

                                    <li>
                                        <h3 className="my-0.5 font-segoe leading-tight text-textCustom">Bài viết: 12</h3>
                                    </li>

                                    <li>
                                        <span className="text-nowrap font-body text-base text-textCustom">Id: {data?.user?.nickname}</span>
                                    </li>
                                </div>
                            </ul>
                        </div>

                        <img src={BannerIcon} alt="banner icon" className="absolute right-0 hidden xl:block" />
                    </div>

                    {/* Bottom */}
                    <div className="mt-4 grid grid-cols-12 gap-4">
                        {/* Achievement */}
                        <div className="flex rounded-lg bg-bgHoverGrayDark sm:col-span-12 md:col-span-12 xl:col-span-7">
                            <div className="flex w-full gap-2">
                                <div className="min-w-[9rem] self-start py-4 phone:min-w-[6rem]">
                                    <img src={Achievement} alt="achievement" className="ml-auto w-[90%]" />
                                </div>

                                <div className="grow p-4">
                                    <h4 className="mb-2 max-w-max rounded-md bg-white px-3 py-1 uppercase leading-tight">level 1</h4>

                                    <div className="flex items-center justify-between phone:flex-wrap">
                                        <h2
                                            className=" max-w-max rounded-lg font-body font-bold leading-tight text-textCustom 
                                                sm:text-lg phone:text-base"
                                        >
                                            Hội ma mới
                                        </h2>
                                        <h3
                                            className="max-w-max rounded-lg font-body font-bold leading-tight text-textCustom
                                                phone:text-base"
                                        >
                                            0 / 50 hours
                                        </h3>
                                    </div>

                                    <div className="mb-2 flex items-center">
                                        <Progress percent={80} size={['100%', 15]} trailColor="white" showInfo={false} />
                                        <img src={AchievementActive} alt="Achievement Active" />
                                    </div>

                                    <p className="text-justify text-base text-textCustom phone:line-clamp-4 pm:line-clamp-4">
                                        Hoàn thành 50 giờ học để đạt cấp độ tiếp theo. Khi đạt cấp độ mới sẽ nhận được các phần quà khác
                                        nhau.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quantity exam completed */}
                        <ul
                            className="grid auto-rows-[7rem] grid-cols-2 gap-2 rounded-lg sm:col-span-12 
                                    md:col-span-6 xl:col-span-5"
                        >
                            {[...Array(4)].map((_, index) => (
                                <li key={index} className="grid content-center justify-items-center gap-2 rounded-lg bg-bgHoverGrayDark">
                                    <h3 className="max-w-max rounded-lg font-segoe text-lg leading-tight text-textCustom">Số đề đã làm</h3>
                                    <h3 className="max-w-max rounded-lg font-segoe leading-tight text-textCustom">12</h3>
                                    <h3 className="max-w-max rounded-lg font-segoe leading-tight text-textCustom">Đề thi</h3>
                                </li>
                            ))}
                        </ul>

                        {/* Calendar */}
                        <div
                            className="scrollbar overflow-auto rounded-lg sm:col-span-12 
                                    md:col-span-12 xl:col-span-8"
                        >
                            <CalendarHeatmap
                                startDate={new Date('2024-01-01')}
                                endDate={new Date('2024-12-31')}
                                values={values}
                                onClick={(value) => {
                                    alert(`Bạn đã học ${value?.count ?? '0'} giờ ngày ${value?.date ?? '....'}`);
                                }}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }

                                    if (value.count >= 8) {
                                        return `color-scale-8`;
                                    }

                                    if (value.count >= 6) {
                                        return 'color-scale-6';
                                    }

                                    if (value.count >= 4) {
                                        return 'color-scale-4';
                                    }

                                    if (value.count >= 2) {
                                        return 'color-scale-2';
                                    }

                                    return `color-scale-${value.count}`;
                                }}
                            />

                            <div className="mb-2 mt-1 flex items-center justify-between">
                                <h3 className="max-w-max rounded-lg font-segoe leading-tight text-textCustom phone:hidden phone:text-base">
                                    Biểu đồ số giờ học theo ngày
                                </h3>

                                <div className="ml-auto flex items-center gap-2">
                                    <p className="text-textCustom">Less</p>
                                    <div className="flex items-center gap-1">
                                        <div className="h-3 w-3 bg-bgHoverGrayDark"></div>
                                        <div className="h-3 w-3 bg-[#0e4429]"></div>
                                        <div className="h-3 w-3 bg-[#006d32]"></div>
                                        <div className="h-3 w-3 bg-[#26a641]"></div>
                                        <div className="h-3 w-3 bg-[#39d353]"></div>
                                    </div>
                                    <p className="text-textCustom">More</p>
                                </div>
                            </div>
                        </div>

                        {/* Follower */}
                        <div
                            className="tab-profile overflow-auto rounded-lg bg-bgHoverGrayDark p-2 sm:col-span-12 sm:h-[18rem] md:col-span-6 
                                    md:row-start-2 md:h-[14.6rem] xl:col-span-4 xl:col-start-9 xl:row-start-2 xl:h-[20rem]"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
