import React, { useState } from 'react';
// ##################################
// #       IMPORT Components
// ##################################
import SocialContact from '@pages/Contact/SocialContact';
import Sidebar from '@pages/Sidebar/Sidebar';
import Navbar from '@pages/Header/Navbar';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import GrammarData from './Grammar.json';
import LessonGrammarCard from './LessonGrammarCard';
import LectureVideoCard from './LectureVideoCard';
import BlankQuestionCard from './BlankQuestionCard';
import { LessonItemsType, LessonsType } from 'types/types';

// ##################################
// #       IMPORT Npm
// ##################################
import HelpIcon from '@mui/icons-material/Help';
import { ChevronsLeft } from 'lucide-react';
import { useSearchParams, Navigate } from 'react-router-dom';

const Grammar: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    // stored state to expand the sidebar
    const expanded: boolean = window.innerWidth > 390;

    // get lectureId from url
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    // stored state to expend the lesion
    const [open, setOpen] = useState<boolean>(false);

    // The function to use toggle lecture sidebar
    const handleToggleLesson = () => {
        setOpen(!open);
    };

    // ############################################
    const lessonWithId = GrammarData.lessons.find((lesson: LessonsType) => {
        return lesson.lessonItems.find((lessonItem: LessonItemsType) => {
            return lessonItem.id === id;
        });
    });

    if (lessonWithId === undefined) {
        return <Navigate to="/notfound" />;
    }

    const lessonItem = lessonWithId.lessonItems.find((lesson: LessonItemsType) => {
        return lesson.id === id;
    });

    const lessonCategory = lessonItem?.lessonCategory;

    // ############################################
    return (
        <div
            className="scrollbar h-screen overflow-auto bg-bgCustom sm:px-0 sm:py-0 md:p-0 
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
                                    className={`text-textCustom ${
                                        open ? 'rotate-[-180deg]' : 'rotate-0'
                                    } transition-all duration-300`}
                                    size={20}
                                />
                            </button>
                        </div>

                        <div className="relative mt-2 flex h-full ">
                            <div className="scrollbar h-full grow overflow-auto rounded-lg">
                                {lessonCategory === 'blankQuestions' && <BlankQuestionCard />}

                                {lessonCategory === 'lectureVideo' && (
                                    <>
                                        <LectureVideoCard />

                                        <div className="my-4">
                                            <h1 className="font-title text-2xl font-bold text-textCustom phone:text-lg pm:text-xl">
                                                {lessonItem?.title}
                                            </h1>
                                            <p className="font-body font-medium text-textCustom phone:text-xs">
                                                {lessonItem?.dateCreated}
                                            </p>
                                            <p className="my-4 font-body text-base font-semibold text-textCustom phone:text-[0.8rem] pm:text-sm">
                                                Tham gia các cộng đồng để cùng học hỏi, chia sẻ và
                                                "thám thính" xem LearnLang24h sắp có gì mới nhé!
                                            </p>
                                            <SocialContact />
                                        </div>
                                    </>
                                )}

                                <div
                                    className="absolute bottom-4 left-[64%] flex cursor-pointer items-center gap-2 rounded-lg
                                    bg-slate-100 p-2 shadow-md sm:left-[70%] md:left-[82%] lg:left-[65%] phone:left-[60%] "
                                >
                                    <HelpIcon className="text-orange-400" />
                                    <p className="text-title text-nowrap font-bold">Hỏi đáp</p>
                                </div>
                            </div>

                            <div
                                className={`basis-72 lg:static ${
                                    open
                                        ? 'sm:w-[50%] sm:translate-x-0 md:w-[35%] md:translate-x-0 phone:w-[80%]'
                                        : 'sm:w-0 sm:translate-x-[100%] md:w-0 md:translate-x-[100%]'
                                } 
                                scrollbar overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0 sm:top-24  
                                sm:h-[85%] sm:rounded-md md:fixed md:right-0 md:top-24 md:h-[85%] lg:block lg:max-w-full lg:translate-x-0 xl:h-full`}
                            >
                                <div className="scrollbar h-full w-full overflow-auto">
                                    <LessonGrammarCard handleToggleLesson={handleToggleLesson} />
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
