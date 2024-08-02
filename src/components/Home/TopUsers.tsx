// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Avatar } from 'antd';
import Skeleton from '@mui/material/Skeleton';
import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetTopUserByStudyTimeQuery } from '@store/api/studyTime.api';
import { formatHour } from '@utils/formatTime';

type DataType = {
    avatar: string;
    name: string;
    description: string;
    active: string;
};

const data: DataType[] = Array(8).fill({
    avatar: 'https://avatars.githubusercontent.com/u/12592949',
    name: 'Quoc dung',
    description: 'Got 126 hours in a month',
    active: '2 min ago',
});

const TopUser: React.FC = () => {
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
    const { data: topUserData, isLoading } = useGetTopUserByStudyTimeQuery({ month, year });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

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
        <Fragment>
            {/* top */}
            <div className="mb-4 flex items-center justify-between">
                <h1 className="font-title text-xl font-bold text-textCustom md:text-lg phone:text-base">Top Users</h1>

                <div className="flex items-center gap-1 ">
                    <p
                        className="cursor-pointer select-none font-body text-sm 
                        font-medium text-textCustom transition-all 
                        duration-200 hover:text-textCustomProcess"
                    >
                        See All
                    </p>
                    <ArrowRight strokeWidth={2} size={18} className="text-textCustom" />
                </div>
            </div>

            {/* bottom */}
            <div className="relative">
                <ul
                    className="scrollbar flex h-80 flex-col gap-4 overflow-auto sm:h-auto 
                    sm:pr-0 md:pr-2 xl:h-[22rem] phone:h-auto phone:pr-0"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {isLoading
                        ? data.map((_item, index) => (
                              <li className="flex items-end justify-between sm:gap-2 lg:gap-2 phone:gap-2" key={index}>
                                  <div className="rounded-lg bg-bgCustomGroup p-1">
                                      <div className="flex items-center gap-3">
                                          <Skeleton variant="circular" width={40} height={40} />
                                          <div>
                                              <Skeleton width={200} height={20} />
                                              <Skeleton width={200} height={8} />
                                              <Skeleton width={200} height={8} />
                                          </div>
                                      </div>
                                      <p className="font-body font-bold text-textCustomGray md:text-xs lg:text-sm"></p>
                                  </div>
                              </li>
                          ))
                        : topUserData?.data.map((item) => (
                              <li className="flex items-start justify-between sm:gap-2 lg:gap-2 phone:gap-2" key={item.user}>
                                  <div className="flex items-center gap-2">
                                      <Avatar
                                          size="default"
                                          className="min-h-9 min-w-9 cursor-pointer "
                                          src={item?.userDetails?.photo?.url}
                                          alt={item.userDetails.nickname}
                                      />
                                      <div>
                                          <h5 className="font-be text-sm font-semibold text-textCustomName">{item.userDetails.nickname}</h5>
                                          <p className="font-be text-[12px] text-textCustom phone:text-xs">
                                              {`Got ${formatHour(item.totalDuration / 1000)} on this month`}
                                          </p>
                                      </div>
                                  </div>
                                  <p className="whitespace-nowrap font-be text-xs font-semibold text-textCustomGray">
                                      Level {item.userDetails.level}
                                  </p>
                              </li>
                          ))}
                </ul>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bgCustom"></div>
            </div>
        </Fragment>
    );
};

export default TopUser;
