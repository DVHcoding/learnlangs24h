// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useNavigate, useParams } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetAllCoursesQuery, useGetAllLessonsByCourseIdQuery, useGetAllUnitLessonsByCourseIdQuery } from '@store/api/courseApi';
import { CourseType, LessonType, UnitLessonType } from 'types/api-types';
import RenderIcon from '@components/Shared/RenderIcon.courses';

const CoursesEditableSidebar: React.FC<{ open: boolean }> = ({ open }) => {
    const { id: courseId, unitId } = useParams<{ id: string; unitId: string }>();
    const navigate = useNavigate();

    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    //  RTK query data
    const { data: courses, isLoading } = useGetAllCoursesQuery();
    const { data: lessons } = useGetAllLessonsByCourseIdQuery(courseId, { skip: !courseId });
    const { data: unitLessons } = useGetAllUnitLessonsByCourseIdQuery(courseId, {
        skip: !courseId,
    });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    // Lấy ra tên khóa học để làm label cho sidebar
    let courseName: string | undefined;
    if (!isLoading && courses?.success) {
        courseName = courses?.courses.find((course: CourseType) => course._id === courseId)?.name;
    }

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */

    // hàm điều hướng người dùng qua route khác
    const handleRedirect: (unitId: string) => void = (unitId) => {
        navigate(`/admin/course/${courseId}/edit/${unitId}`);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div
            className={`h-full basis-[17rem] overflow-auto bg-white phone:fixed phone:z-50 pm:fixed pm:z-50
            ${
                !open ? 'phone:translate-x-[-100%] pm:translate-x-[-100%]' : 'phone:translate-x-0 pm:translate-x-0'
            } transition-all duration-300`}
        >
            <h3 className="bg-gray-300 text-center font-sans">{courseName ?? '...Loading'}</h3>

            <ul className="h-full">
                {lessons?.lessons?.map((lesson: LessonType) => (
                    <li key={lesson._id}>
                        <div className="flex min-h-[3rem] items-center bg-gray-200 p-2">
                            <h3 className="font-sans font-normal leading-7">Chương {lesson.name}</h3>
                        </div>

                        <ul>
                            {unitLessons?.unitLessons?.map((unitLesson: UnitLessonType) => {
                                if (unitLesson.lesson === lesson._id) {
                                    return (
                                        <li
                                            onClick={() => handleRedirect(unitLesson._id)}
                                            key={unitLesson._id}
                                            className={`flex min-h-[3rem] cursor-pointer items-center gap-2 
                                        ${
                                            unitLesson._id === unitId ? 'border-r-[3px] border-green-400 bg-blue-200' : ''
                                        }   p-2 transition-all duration-300 hover:bg-bgHoverGrayDark`}
                                        >
                                            {RenderIcon(unitLesson.icon)}

                                            <h4 className="select-none font-sans font-normal leading-tight text-textCustom">
                                                Bai {unitLesson.title}
                                            </h4>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoursesEditableSidebar;
