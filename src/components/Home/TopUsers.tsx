// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import Skeleton from '@mui/material/Skeleton';
import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import Avatar from '@components/Avatar/Avatar';
import { useGetTopUserByStudyTimeQuery } from '@store/api/studyTime.api';
import { formatHour } from '@utils/formatTime';
import LevelDisplay from '@components/Level/LevelStyles';

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
                <h1 className="font-be text-xl font-bold text-textCustom md:text-lg phone:text-base">Top Users</h1>

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
                    className="scrollbar flex h-80 flex-col gap-2 overflow-auto sm:h-auto 
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
                        : topUserData?.data?.map((item) => (
                              <Link
                                  to={`/profile/${item.userDetails.nickname}`}
                                  className="flex items-start justify-between rounded-md p-1 
                                  transition-all hover:bg-bgHoverGrayDark hover:no-underline sm:gap-2 
                                  lg:gap-2 phone:gap-2"
                                  key={item.user}
                                  style={{ textDecoration: 'none' }}
                              >
                                  <div className="flex items-center gap-2">
                                      <Avatar
                                          image={item?.userDetails?.photo.url}
                                          width={2.7}
                                          height={2.7}
                                          frame={item?.userDetails.avatarFrame ? item?.avatarFrameDetails?.photo?.url : ''}
                                      />

                                      <div>
                                          <LevelDisplay
                                              customStyles="font-be text-sm font-semibold text-textCustomName"
                                              level={item.userDetails.level}
                                          >
                                              {item?.userDetails.username}
                                          </LevelDisplay>

                                          <p className="space-x-1 font-be text-[12px] text-textCustom phone:text-xs">
                                              <span>Got</span>
                                              <LevelDisplay
                                                  customStyles="font-be text-[12px] font-semibold text-textCustomName"
                                                  level={item.userDetails.level}
                                              >
                                                  {formatHour(item.totalDuration / 1000)}
                                              </LevelDisplay>
                                              <span>on this month</span>
                                          </p>
                                      </div>
                                  </div>

                                  <LevelDisplay
                                      customStyles="whitespace-nowrap font-be text-xs font-medium text-textCustom"
                                      level={item?.userDetails.level}
                                  >
                                      level {item?.userDetails.level}
                                  </LevelDisplay>
                              </Link>
                          ))}
                </ul>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bgCustom"></div>
            </div>
        </Fragment>
    );
};

export default TopUser;
