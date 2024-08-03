import { useMemo } from 'react';
import { Progress } from 'antd';
import 'react-calendar-heatmap/dist/styles.css';

import AchievementActive from '@assets/profiles/achievement-active.svg';
import { useGetStudyTimeByMonthQuery } from '@store/api/studyTime.api';
import { APIResponse } from 'types/api-types';
import { getHoursFromMilliseconds } from '@utils/formatTime';

import Level1 from '@assets/rank/level1.png';
import Level2 from '@assets/rank/level2.png';
import Level3 from '@assets/rank/level3.png';
import Level4 from '@assets/rank/level4.png';
import Level5 from '@assets/rank/level5.png';
import Level6 from '@assets/rank/level6.png';
import Level7 from '@assets/rank/level7.png';
import Level8 from '@assets/rank/level8.png';
import Level9 from '@assets/rank/level9.png';
import Level10 from '@assets/rank/level10.png';
import Level11 from '@assets/rank/level11.png';
import Level12 from '@assets/rank/level12.png';

interface AchievementProps {
    dataUserByNickName: APIResponse | undefined;
}

const Achievement: React.FC<AchievementProps> = ({ dataUserByNickName }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    const userId = useMemo(() => dataUserByNickName?.user._id, [dataUserByNickName?.user]);
    const { data: studyTimeData } = useGetStudyTimeByMonthQuery({ userId, month, year }, { skip: !userId || !month || !year });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const hours = useMemo(() => {
        if (!studyTimeData?.monthlyDuration) {
            return 0;
        }

        return getHoursFromMilliseconds(studyTimeData.monthlyDuration);
    }, [studyTimeData]);

    const LEVELS = [
        { level: 1, targetHours: 50, title: 'Học viên tập sự', description: 'Cần học 50 giờ để đạt được cấp độ tiếp theo.', image: Level1 },
        {
            level: 2,
            targetHours: 100,
            title: 'Học viên nghiêm túc',
            description: 'Cần học 100 giờ để đạt được cấp độ tiếp theo.',
            image: Level2,
        },
        {
            level: 3,
            targetHours: 150,
            title: 'Nhà Khám Phá',
            description: 'Cần học 150 giờ để đạt được cấp độ tiếp theo.',
            image: Level3,
        },
        {
            level: 4,
            targetHours: 200,
            title: 'Học giả đầy triển vọng',
            description: 'Cần học 200 giờ để đạt được cấp độ tiếp theo.',
            image: Level4,
        },
        {
            level: 5,
            targetHours: 250,
            title: 'Nhà tư duy sáng tạo',
            description: 'Cần học 250 giờ để đạt được cấp độ tiếp theo.',
            image: Level5,
        },
        {
            level: 6,
            targetHours: 300,
            title: 'Chuyên gia trong lĩnh vực',
            description: 'Cần học 300 giờ để đạt được cấp độ tiếp theo.',
            image: Level6,
        },
        {
            level: 7,
            targetHours: 350,
            title: 'Nhà chiến lược học tập',
            description: 'Cần học 350 giờ để đạt được cấp độ tiếp theo.',
            image: Level7,
        },
        {
            level: 8,
            targetHours: 400,
            title: 'Bậc thầy kiến thức',
            description: 'Cần học 400 giờ để đạt được cấp độ tiếp theo.',
            image: Level8,
        },
        {
            level: 9,
            targetHours: 450,
            title: 'Nhà cách tân giáo dục',
            description: 'Cần học 450 giờ để đạt được cấp độ tiếp theo.',
            image: Level9,
        },
        {
            level: 10,
            targetHours: 500,
            title: 'Học giả uyên bác',
            description: 'Cần học 500 giờ để đạt được cấp độ tiếp theo.',
            image: Level10,
        },
        {
            level: 11,
            targetHours: 550,
            title: 'Nhà hiền triết hiện đại',
            description: 'Cần học 550 giờ để đạt được cấp độ tiếp theo.',
            image: Level11,
        },
        {
            level: 12,
            targetHours: 600,
            title: 'Bậc thầy vô song',
            description: 'Cần học 600 giờ để hoàn thành cấp độ cuối này.',
            image: Level12,
        },
    ];

    const getCurrentLevel = (hours: number): number => {
        for (let i = 0; i < LEVELS.length; i++) {
            if (hours < LEVELS[i].targetHours) {
                return i + 1;
            }
        }
        return LEVELS.length;
    };

    const currentLevel = getCurrentLevel(hours);
    const currentLevelData = LEVELS[currentLevel - 1];

    const progressPercentage = Math.min((hours / currentLevelData.targetHours) * 100, 100);

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="flex rounded-lg bg-bgHoverGrayDark sm:col-span-12 md:col-span-12 xl:col-span-7">
            <div className="flex w-full gap-2">
                <div className="w-[9rem] self-start py-4 phone:min-w-[6rem]">
                    <img src={currentLevelData.image} alt="achievement" className="ml-auto w-[90%]" />
                </div>

                <div className="grow p-4">
                    <h4 className="mb-2 max-w-max rounded-md bg-white px-3 py-1 uppercase leading-tight">level {currentLevel}</h4>

                    <div className="flex items-center justify-between phone:flex-wrap">
                        <h2 className="max-w-max rounded-lg font-body font-bold leading-tight text-textCustom sm:text-lg phone:text-base">
                            {currentLevelData.title}
                        </h2>
                        <h3 className="max-w-max rounded-lg font-body font-bold leading-tight text-textCustom phone:text-base">
                            {hours} / {currentLevelData.targetHours} hours
                        </h3>
                    </div>

                    <div className="mb-2 flex items-center">
                        <Progress percent={progressPercentage} size={['100%', 15]} trailColor="white" showInfo={false} />
                        <img src={AchievementActive} alt="Achievement Active" />
                    </div>

                    <p className="text-justify text-base text-textCustom phone:line-clamp-4 pm:line-clamp-4">
                        {currentLevelData.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Achievement;
