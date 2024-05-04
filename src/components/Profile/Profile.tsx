import React from 'react';
// ##################################
// #       IMPORT Npm
// ##################################
import loadable from '@loadable/component';
import { Spin, Progress } from 'antd';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { Clock3 } from 'lucide-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import type { TabsProps } from 'antd';
import 'react-calendar-heatmap/dist/styles.css';

// ##################################
// #       IMPORT Components
// ##################################
const Sidebar = loadable(() => import('@pages/Sidebar/Sidebar'), {
    fallback: <Spin className="max-w-max translate-x-[50%] translate-y-[50%]" />,
});
const Navbar = loadable(() => import('@pages/Header/Navbar'));
import AvatarFrame from '@assets/profiles/avatarFrame.png';
import BannerIcon from '@assets/profiles/persional-header.svg';
import Achievement from '@assets/profiles/achievement.svg';
import AchievementActive from '@assets/profiles/achievement-active.svg';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Đang theo dõi',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Người theo dõi',
        children: 'Content of Tab Pane 2',
    },
];

// #########################################################################
const Profile: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################
    const expanded: boolean = window.innerWidth > 390;

    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################
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

    // ############################################
    return (
        <div
            className="h-screen bg-bgCustom sm:px-0 sm:py-0 md:p-0 
            xl:px-8 xl:py-4 "
        >
            <div className="flex h-full w-full overflow-hidden rounded-md border-2 border-bdCustom sm:rounded-none">
                {/* SIDE-BAR */}
                <Sidebar />

                {/* CONTENT */}
                <div
                    className={`scrollbar w-full overflow-auto bg-bgCustom 
                        ${expanded ? 'phone:z-0' : ''} `}
                >
                    {/* Navbar */}
                    <Navbar toggleTheme={toggleTheme} />

                    <div className="h-full px-4 phone:p-1 ">
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
                                        title: 'dohung',
                                    },
                                ]}
                            />
                        </div>

                        <div className="mt-2 h-full justify-between">
                            {/* Banner */}
                            <div className="relative flex h-[13rem] w-full items-center rounded-lg bg-[#cd7900]">
                                <div className="ml-4 flex items-center gap-4">
                                    <div className="relative h-24 w-24 rounded-full bg-white">
                                        <img src={AvatarFrame} alt="" className="absolute left-[-1.5rem] top-[-0.5rem] min-w-[9rem]" />
                                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="Avatar" />
                                    </div>

                                    <div>
                                        <h2 className="font-body font-bold leading-tight">Đỗ Hùng</h2>

                                        <div className="flex items-center gap-2">
                                            <Clock3 size={18} />
                                            <span className="font-segoe text-lg">Đã tham gia 13/04/2024</span>
                                        </div>
                                    </div>
                                </div>

                                <img src={BannerIcon} alt="banner icon" className="absolute right-0" />
                            </div>

                            {/* Bottom */}
                            <div className="mt-4 grid grid-cols-12 gap-4">
                                <div className="flex rounded-lg bg-bgHoverGrayDark sm:col-span-12 md:col-span-12 xl:col-span-7">
                                    <div className="flex w-full gap-2">
                                        <div className="min-w-[9rem] self-start py-4 phone:min-w-[6rem]">
                                            <img src={Achievement} alt="achievement" className="ml-auto w-[90%]" />
                                        </div>

                                        <div className="grow p-4">
                                            <h4 className="mb-2 max-w-max rounded-md bg-white px-3 py-1 uppercase leading-tight">
                                                level 1
                                            </h4>

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
                                                Hoàn thành 50 giờ học để đạt cấp độ tiếp theo. Khi đạt cấp độ mới sẽ nhận được các phần quà
                                                khác nhau.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <ul
                                    className="grid auto-rows-[7rem] grid-cols-2 gap-2 rounded-lg sm:col-span-12 
                                md:col-span-6 xl:col-span-5"
                                >
                                    {[...Array(4)].map((_, index) => (
                                        <li
                                            key={index}
                                            className="grid content-center justify-items-center gap-2 rounded-lg bg-bgHoverGrayDark"
                                        >
                                            <h3 className="max-w-max rounded-lg font-segoe text-lg leading-tight text-textCustom">
                                                Số đề đã làm
                                            </h3>
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
                                            alert(`Bạn đã học ${value?.count ?? '0'} giờ ngày ${value?.date}`);
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

                                    <div className="mt-1 flex items-center justify-between">
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

                                <div
                                    className="rounded-lg p-2 shadow sm:col-span-12 sm:h-[18rem] md:col-span-6 md:row-start-2 
                                    xl:col-span-4 xl:col-start-9 xl:row-start-2 xl:h-[20rem]"
                                >
                                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
