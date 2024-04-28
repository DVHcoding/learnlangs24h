import React, { useState } from 'react';
// ##################################
// #       IMPORT Components
// ##################################
import Sidebar from '@pages/Sidebar/Sidebar';
import Navbar from '@pages/Header/Navbar';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import VideoLectureCard from './VideoLectureCard';
import GrammarLessonCard from './GrammarLessonCard';
import { useGetUnitLessonByIdQuery } from '@store/api/courseApi';

// ##################################
// #       IMPORT Npm
// ##################################
import HelpIcon from '@mui/icons-material/Help';
import { ChevronsLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import FillBlankExerciseCard from './FillBlankExerciseCard';

const Grammar: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const [searchParams] = useSearchParams();
    let id = searchParams.get('id');
    if (!id) {
        id = '662407c34c6fc5e5d110835d';
    }

    const { data: unitLessonData, isLoading: unitLessonByIdLoading } = useGetUnitLessonByIdQuery(id || '');

    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################
    const [open, setOpen] = useState<boolean>(false);
    const expanded: boolean = window.innerWidth > 390;

    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################
    const handleToggleLesson = () => {
        setOpen(!open);
    };

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

                    <div className="h-[85%] pl-4 phone:p-1 ">
                        <div className="flex justify-between">
                            <Breadcrumbs />

                            <button
                                aria-label="expandButton"
                                onClick={handleToggleLesson}
                                className="rounded-md bg-bgHoverGrayDark p-[4px] lg:hidden"
                            >
                                <ChevronsLeft
                                    className={`text-textCustom ${open ? 'rotate-[-180deg]' : 'rotate-0'} transition-all duration-300`}
                                    size={20}
                                />
                            </button>
                        </div>

                        <div className="mt-2 flex h-full ">
                            <div
                                className="scrollbar relative h-full overflow-auto rounded-lg xl:min-w-[54.4rem] xl:max-w-[54.4rem]"
                                style={{ scrollbarWidth: 'none' }}
                            >
                                {!unitLessonByIdLoading &&
                                unitLessonData?.unitLesson &&
                                unitLessonData.unitLesson.lectureType === 'exercise' ? (
                                    <FillBlankExerciseCard />
                                ) : (
                                    ''
                                )}

                                {!unitLessonByIdLoading &&
                                unitLessonData?.unitLesson &&
                                unitLessonData.unitLesson.lectureType === 'videoLecture' ? (
                                    <VideoLectureCard unitLessonId={unitLessonData.unitLesson._id} />
                                ) : (
                                    ''
                                )}

                                <div
                                    className="sticky bottom-2 ml-auto mr-2 flex max-w-max cursor-pointer items-center gap-2 rounded-lg
                                    bg-slate-100 p-2 shadow-md"
                                >
                                    <HelpIcon className="text-orange-400" />
                                    <p className="text-title text-nowrap font-bold">Hỏi đáp</p>
                                </div>
                            </div>

                            <div
                                className={`basis-96 lg:static ${
                                    open
                                        ? 'sm:w-[50%] sm:translate-x-0 md:w-[35%] md:translate-x-0 phone:w-[80%]'
                                        : 'sm:w-0 sm:translate-x-[100%] md:w-0 md:translate-x-[100%]'
                                } 
                                scrollbar overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0 sm:top-24  
                                sm:h-[85%] sm:rounded-md md:fixed md:right-0 md:top-24 md:h-[85%] lg:block lg:max-w-full lg:translate-x-0 xl:h-full`}
                            >
                                <div className="scrollbar h-full w-full overflow-auto ">
                                    <GrammarLessonCard handleToggleLesson={handleToggleLesson} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grammar;
