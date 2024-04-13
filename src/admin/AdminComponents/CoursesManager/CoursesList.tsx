// ##################################
// #       IMPORT Npm
// ##################################
import { Drawer, Button, InlineEdit } from 'rsuite';
import { useState } from 'react';
import { UsersRound, Clock8, LibraryBig, CalendarDays, Trophy } from 'lucide-react';
import StarIcon from '@mui/icons-material/Star';

// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@admin/AdminPages/AdminSidebar';
import AdminBreadcrumbs from '@admin/AdminComponents/AdminBreadcrumbs/AdminBreadcrumbs';
import GrammarLessonCard from '@admin/AdminComponents/CoursesManager/Grammar/GrammarLessonCard';

// ##################################
const CoursesList: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const [openWithHeader, setOpenWithHeader] = useState<boolean>(false);

    return (
        <div>
            <HelmetWrapper title="Admin Page" description="Admin Page" canonical="/admin" />

            {/* CONTAINER */}
            <div
                className="scrollbar h-screen overflow-auto bg-bgCustom sm:px-0 sm:py-0 md:p-0 
                xl:px-8 xl:py-4"
            >
                {/* BOX */}
                <div className="flex h-full w-full overflow-hidden rounded-md border-2 border-bdCustom sm:rounded-none">
                    {/* SIDE-BAR */}
                    <Sidebar />

                    {/* CONTENT */}
                    <div className={`scrollbar w-full overflow-auto bg-bgCustom `}>
                        {/* Navbar */}
                        <Navbar toggleTheme={toggleTheme} />

                        {/* Body */}
                        <div className="h-full px-4">
                            {/* BreadCrumbs */}
                            <div>
                                <AdminBreadcrumbs
                                    pathNext="Courses Manager"
                                    pathEnd="Courses List"
                                />
                            </div>

                            <div>
                                <ul className="flex flex-wrap items-center  gap-4">
                                    <li className="basis-[20rem] rounded-md bg-[#9aabab47] p-4  sm:mx-auto">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-semibold text-textCustom">
                                                Grammar Course
                                            </h3>
                                            <button
                                                onClick={() => setOpenWithHeader(true)}
                                                aria-label="btn_view_grammar_courses"
                                                className="btn-primary"
                                            >
                                                View Details
                                            </button>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <LibraryBig
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">73 Lesson</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <Clock8
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base  text-textCustom">
                                                8:05:64 hours
                                            </p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">24/02/2024</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <UsersRound
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">521 people</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Trophy
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">4.2</p>
                                            <StarIcon
                                                className="text-yellow-400"
                                                fontSize="small"
                                            />
                                        </div>
                                    </li>

                                    <li className="basis-[20rem] rounded-md bg-[#9aabab47] p-4  sm:mx-auto">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-semibold text-textCustom">
                                                Listening Course
                                            </h3>
                                            <button
                                                aria-label="btn_view_grammar_courses"
                                                className="btn-primary"
                                            >
                                                View Details
                                            </button>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <LibraryBig
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">57 Lesson</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <Clock8
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base  text-textCustom">
                                                12:05:64 hours
                                            </p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">04/02/2024</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <UsersRound
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">121 people</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Trophy
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">5.0</p>
                                            <StarIcon
                                                className="text-yellow-400"
                                                fontSize="small"
                                            />
                                        </div>
                                    </li>

                                    <li className="basis-[20rem] rounded-md bg-[#9aabab47] p-4  sm:mx-auto">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-semibold text-textCustom">
                                                Reading Course
                                            </h3>
                                            <button
                                                aria-label="btn_view_grammar_courses"
                                                className="btn-primary"
                                            >
                                                View Details
                                            </button>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <LibraryBig
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">73 Lesson</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <Clock8
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base  text-textCustom">
                                                8:05:64 hours
                                            </p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">24/02/2024</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <UsersRound
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">521 people</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Trophy
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">4.2</p>
                                            <StarIcon
                                                className="text-yellow-400"
                                                fontSize="small"
                                            />
                                        </div>
                                    </li>

                                    <li className="basis-[20rem] rounded-md bg-[#9aabab47] p-4  sm:mx-auto">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-semibold text-textCustom">
                                                Writing Course
                                            </h3>
                                            <button
                                                aria-label="btn_view_grammar_courses"
                                                className="btn-primary"
                                            >
                                                View Details
                                            </button>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <LibraryBig
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">73 Lesson</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <Clock8
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base  text-textCustom">
                                                8:05:64 hours
                                            </p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">24/02/2024</p>
                                        </div>

                                        <div className="mb-1 flex items-center gap-2">
                                            <UsersRound
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">521 people</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Trophy
                                                size={18}
                                                strokeWidth="1.5"
                                                className="text-textCustom"
                                            />
                                            <p className="text-base text-textCustom">4.2</p>
                                            <StarIcon
                                                className="text-yellow-400"
                                                fontSize="small"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <Drawer
                                open={openWithHeader}
                                onClose={() => setOpenWithHeader(false)}
                                size="sm"
                                className="md:max-w-[30rem] phone:max-w-full pm:max-w-[80%] tablet:max-w-[30rem]"
                            >
                                <Drawer.Header className="bg-bgCustom">
                                    <InlineEdit
                                        defaultValue="Grammar Course"
                                        className="font-semibold text-textCustom"
                                    />

                                    <Drawer.Actions>
                                        <Button onClick={() => setOpenWithHeader(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => setOpenWithHeader(false)}
                                            appearance="primary"
                                        >
                                            Confirm
                                        </Button>
                                    </Drawer.Actions>
                                </Drawer.Header>

                                <Drawer.Body className="bg-bgCustom">
                                    <GrammarLessonCard />
                                </Drawer.Body>
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesList;
