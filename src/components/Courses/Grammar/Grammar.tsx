// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { useState } from 'react';
import { ChevronsLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import loadable from '@loadable/component';
import { Spin } from 'antd';
import { Breadcrumb } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Empty } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const VideoLectureCard = loadable(() => import('./VideoLectureCard'));
const FillBlankExerciseCard = loadable(() => import('./FillBlankExerciseCard'));
const LessonCard = loadable(() => import('@components/Courses/LessonCard/LessonCard'));

import { useGetAllUnitLessonsByCourseIdQuery, useGetUnitLessonByIdQuery, useGetUserProcessStatusesQuery } from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';
import HelpComments from '@components/Shared/HelpComments';
import { useUnitLessonProcess } from '@hooks/useUnitLessonProcess';

// #########################################################################
const Grammar: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
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
    const { data: allUnitLessonData } = useGetAllUnitLessonsByCourseIdQuery(courseId, { skip: !courseId });
    const { data: unitLessonData, isLoading: unitLessonByIdLoading } = useGetUnitLessonByIdQuery(id, { skip: !id });
    const userId = userDetailsData?.user?._id ?? 'undefined';
    const {
        data: userProcessStatusData,
        isLoading: userProcessStatusLoading,
        refetch: userProcessRefetch,
    } = useGetUserProcessStatusesQuery(userId, { skip: !userId });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleToggleLesson = () => {
        setOpen(!open);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */
    useUnitLessonProcess({ userId, id, allUnitLessonData, userProcessRefetch });

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="overflow-hidden pl-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumbs */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to={`/grammar/${courseId}`}>Grammar</Link>,
                        },
                        {
                            title: unitLessonData?.unitLesson?.title,
                        },
                    ]}
                />

                <button aria-label="expandButton" onClick={handleToggleLesson} className="rounded-md bg-bgHoverGrayDark p-[4px] lg:hidden">
                    <ChevronsLeft
                        className={`text-textCustom ${open ? 'rotate-[-180deg]' : 'rotate-0'} transition-all duration-300`}
                        size={20}
                    />
                </button>
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* Content */}
                <div className="scrollbar-mess relative h-full w-full overflow-auto rounded-lg ">
                    {!unitLessonByIdLoading && unitLessonData?.unitLesson && unitLessonData.unitLesson.lectureType === 'exercise' ? (
                        <FillBlankExerciseCard
                            userProcessStatusData={userProcessStatusData}
                            userProcessStatusLoading={userProcessStatusLoading}
                            userProcessRefetch={userProcessRefetch}
                            userId={userId}
                        />
                    ) : (
                        ''
                    )}

                    {!unitLessonByIdLoading && unitLessonData?.unitLesson && unitLessonData.unitLesson.lectureType === 'videoLecture' ? (
                        <VideoLectureCard unitLessonId={unitLessonData.unitLesson._id} userProcessRefetch={userProcessRefetch} />
                    ) : (
                        ''
                    )}

                    {unitLessonByIdLoading && <Spin />}

                    {!unitLessonByIdLoading && unitLessonData?.success === false ? <Empty /> : ''}

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
                    scrollbar flex-1 overflow-auto bg-bgCustom transition-all  
                    duration-300 sm:fixed sm:right-0 sm:rounded-md md:fixed md:right-0 lg:block
                    lg:translate-x-0`}
                >
                    <LessonCard userProcessStatusData={userProcessStatusData} handleToggleLesson={handleToggleLesson} />
                </div>
            </div>
        </div>
    );
};

export default Grammar;
