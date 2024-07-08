// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useState } from 'react';
import { ChevronsLeft, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { Alert, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const ListeningLessonCard = loadable(() => import('@components/Courses/Listening/ListeningLessonCard'));
const HelpComments = loadable(() => import('@components/Shared/HelpComments'));

import { useGetUserProcessStatusesQuery } from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';
import AudioWaveform from './AudioWaveform';

// #########################################################################
const Quiz: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const navigate = useNavigate();

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
                            title: <Link to={`/listening/`}>Listening</Link>,
                        },
                        {
                            title: 'quiz',
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
                    rounded-tl-lg  bg-bgCustomCard"
                >
                    <Alert
                        message="Cố gắng nghe thật kĩ và điền nghĩa tiếng việt vào nhé!"
                        banner
                        className="bg-bgCustomProcess text-textCustom"
                    />

                    <div className="mt-2 flex items-center justify-between px-2">
                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={() => navigate(-1)}
                        >
                            <Undo2 size={20} className="text-textCustom" />
                        </div>

                        <Button type="primary">Nộp bài</Button>
                    </div>

                    {/* AudioWaveform */}
                    <ul className="mt-4 flex flex-col items-center">
                        <li>
                            <AudioWaveform />
                        </li>

                        <li>
                            <AudioWaveform />
                        </li>
                    </ul>

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
                    scrollbar overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0 sm:top-24  
                    sm:rounded-md md:fixed md:right-0 md:top-24 lg:block lg:max-w-full lg:translate-x-0`}
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

export default Quiz;
