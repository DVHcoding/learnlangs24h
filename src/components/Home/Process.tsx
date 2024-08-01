// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { MoveRight } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import Plant from '@assets/backgrounds/Plant.png';
import ProcessSkeleton from '@components/Skeleton/ProcessSkeleton';
import { RootState } from '@store/store';
import { formatTime } from '@utils/formatTime';

const Process: React.FC<{ loading: boolean }> = ({ loading }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const { stats } = useSelector((state: RootState) => state.studyTime);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

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
            {!loading ? (
                <div
                    className="relative shrink basis-80 rounded-xl bg-bgCustomProcess px-4 py-6
                    md:overflow-hidden lg:overflow-visible"
                >
                    <h1 className="mb-3 font-title text-xl font-bold text-textCustom phone:text-lg">My Process</h1>

                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-title text-base text-textCustom">Today</p>
                            <span className="font-body text-sm font-bold text-textCustomProcess">{formatTime(stats.daily / 1000)}</span>
                        </div>

                        <div>
                            <p className="font-title text-base text-textCustom">This Month</p>
                            <span className="font-body text-sm font-bold text-textCustomProcess">72 hours</span>
                        </div>
                    </div>

                    <div className="mt-8 flex max-w-max cursor-pointer items-center gap-4">
                        <p
                            className="select-none font-body text-base  font-semibold
                            text-textCustom transition-all hover:text-textCustomProcess phone:text-sm"
                        >
                            View Details
                        </p>
                        <MoveRight strokeWidth={2} size={18} className="text-textCustom" />
                    </div>

                    <img
                        src={Plant}
                        alt="Plant"
                        className="absolute bottom-0 right-[-4rem] w-44 md:right-[-2rem]
                md:w-36 phone:right-[-1rem] phone:w-24 pm:right-[-1rem] pm:w-24"
                    />
                </div>
            ) : (
                <ProcessSkeleton />
            )}
        </Fragment>
    );
};

export default Process;
