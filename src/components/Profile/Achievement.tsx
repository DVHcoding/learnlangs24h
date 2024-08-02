// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Progress } from 'antd';
import 'react-calendar-heatmap/dist/styles.css';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import AchievementImage from '@assets/profiles/achievement.svg';
import AchievementActive from '@assets/profiles/achievement-active.svg';

const Achievement: React.FC = () => {
    return (
        <div className="flex rounded-lg bg-bgHoverGrayDark sm:col-span-12 md:col-span-12 xl:col-span-7">
            <div className="flex w-full gap-2">
                <div className="min-w-[9rem] self-start py-4 phone:min-w-[6rem]">
                    <img src={AchievementImage} alt="achievement" className="ml-auto w-[90%]" />
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
                        Hoàn thành 50 giờ học để đạt cấp độ tiếp theo. Khi đạt cấp độ mới sẽ nhận được các phần quà khác nhau.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Achievement;
