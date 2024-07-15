// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useState } from 'react';
import { ChevronsLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import loadable from '@loadable/component';
import { Breadcrumb } from 'antd';
import { Link, useParams } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const ListeningLessonCard = loadable(() => import('@components/Courses/Listening/ListeningLessonCard'));
const VocaExercise = loadable(() => import('@components/Courses/Listening/VocaExercise'));
const HelpComments = loadable(() => import('@components/Shared/HelpComments'));

import { useGetUnitLessonByIdQuery, useGetUserProcessStatusesQuery } from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';

// #########################################################################
const Listening: React.FC = () => {
    /* ########################################################################## */
    /*                                   HOOKS                                    */
    /* ########################################################################## */
    const [searchParams] = useSearchParams();
    const { id: courseId } = useParams<{ id: string }>();
    let id = searchParams.get('id');

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetailsData } = useUserDetailsQuery();
    const { data: unitLessonData } = useGetUnitLessonByIdQuery(id, { skip: !id });
    const userId = userDetailsData?.user?._id ?? 'undefined';
    const { data: userProcessStatusData, isLoading: userProcessStatusLoading } = useGetUserProcessStatusesQuery(userId, { skip: !userId });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleToggleLesson = (): void => {
        setOpen(!open);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="overflow-hidden pl-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumb */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to={`/listening/${courseId}`}>Listening</Link>,
                        },
                        {
                            title: unitLessonData?.unitLesson?.title,
                        },
                    ]}
                />

                <button aria-label="expandButton" onClick={handleToggleLesson} className="rounded-md bg-bgHoverGrayDark p-[4px] lg:hidden">
                    <ChevronsLeft
                        className={`text-textCustom ${open ? 'rotate-[-180deg]' : 'rotate-0'} 
                        transition-all duration-300`}
                        size={20}
                    />
                </button>
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* content */}
                <div
                    className="scrollbar-mess relative h-full w-full overflow-auto 
                    rounded-tl-lg bg-bgCustomCard"
                >
                    <VocaExercise />

                    {/* Hỏi đáp */}
                    <HelpComments userDetailsData={userDetailsData} />
                </div>

                {/* Sidebar */}
                <div
                    className={`h-full min-w-[17rem] border-b border-l border-t border-bdCustom lg:static ${
                        open
                            ? 'sm:w-[50%] sm:translate-x-0 md:w-[35%] md:translate-x-0 phone:w-[80%]'
                            : 'sm:w-0 sm:translate-x-[100%] md:w-0 md:translate-x-[100%]'
                    } 
                    scrollbar flex-1 overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0  
                    sm:top-24 sm:rounded-md md:fixed md:right-0 md:top-24 lg:block lg:translate-x-0`}
                >
                    <div className="scrollbar h-full w-full overflow-auto ">
                        <ListeningLessonCard
                            handleToggleLesson={handleToggleLesson}
                            userProcessStatusData={userProcessStatusData}
                            userProcessStatusLoading={userProcessStatusLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listening;
