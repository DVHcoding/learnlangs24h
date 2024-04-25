// ##################################
// #       IMPORT Npm
// ##################################
import { Drawer, Button, InlineEdit } from 'rsuite';
import { useState } from 'react';
import { UsersRound, Clock8, LibraryBig, CalendarDays, Trophy } from 'lucide-react';
import StarIcon from '@mui/icons-material/Star';

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// ##################################
// #       IMPORT Components
// ##################################
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@admin/AdminPages/AdminSidebar';
import AdminBreadcrumbs from '@admin/AdminComponents/AdminBreadcrumbs/AdminBreadcrumbs';
import GrammarLessonCard from '@admin/AdminComponents/CoursesManager/Grammar/GrammarLessonCard';
import { CourseType } from 'types/api-types';

import { useGetAllCoursesQuery } from '@store/api/courseApi';

// ##################################
const CoursesList: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const [openWithHeader, setOpenWithHeader] = useState<boolean>(false);
    const { data, isLoading } = useGetAllCoursesQuery();

    return (
        <div>
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
                                <AdminBreadcrumbs pathNext="Courses" pathEnd="Courses List" />
                            </div>

                            <div>
                                <ul className="flex flex-wrap items-center  gap-4">
                                    {!isLoading &&
                                        data?.courses.map((course: CourseType) => (
                                            <li
                                                className="basis-[20rem] rounded-md bg-[#9aabab47] p-4  sm:mx-auto"
                                                key={course._id}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="font-semibold text-textCustom">
                                                        {course.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => setOpenWithHeader(true)}
                                                        aria-label="btn_view_grammar_courses"
                                                        className="btn-primary"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>

                                                <Link
                                                    to={`/admin/course/${course._id}`}
                                                    className="mb-1 flex max-w-max cursor-pointer items-center gap-2 hover:no-underline"
                                                >
                                                    <LibraryBig
                                                        size={18}
                                                        strokeWidth="1.5"
                                                        className="text-textCustom"
                                                    />
                                                    <p className="text-base text-textCustom transition-all hover:text-green-600">
                                                        73 Lesson
                                                    </p>
                                                </Link>

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
                                                    <p className="text-base text-textCustom">
                                                        {dayjs(course.createAt).format(
                                                            'DD-MM-YYYY'
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="mb-1 flex items-center gap-2">
                                                    <UsersRound
                                                        size={18}
                                                        strokeWidth="1.5"
                                                        className="text-textCustom"
                                                    />
                                                    <p className="text-base text-textCustom">
                                                        521 people
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Trophy
                                                        size={18}
                                                        strokeWidth="1.5"
                                                        className="text-textCustom"
                                                    />
                                                    <p className="text-base text-textCustom">
                                                        {course.rating}
                                                    </p>
                                                    <StarIcon
                                                        className="text-yellow-400"
                                                        fontSize="small"
                                                    />
                                                </div>
                                            </li>
                                        ))}
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
