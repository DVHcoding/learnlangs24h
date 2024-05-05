// ##########################
// #      IMPORT NPM        #
// ##########################
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useNavigate, useParams } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

// ##########################
// #    IMPORT Components   #
// ##########################
import { useGetAllCoursesQuery, useGetAllLessonsByCourseIdQuery, useGetAllUnitLessonsByCourseIdQuery } from '@store/api/courseApi';
import { CourseType, LessonType, UnitLessonType } from 'types/api-types';

//###########################
const Sidebar = () => {
    const { id: courseId, unitId } = useParams();
    const navigate = useNavigate();

    //  RTK query data
    const { data: courses, isLoading } = useGetAllCoursesQuery();
    const { data: lessons, isLoading: getAllLessonsLoading } = useGetAllLessonsByCourseIdQuery(courseId || 'undefined');
    const { data: unitLessons, isLoading: getAllUnitLessonByCourseIdLoading } = useGetAllUnitLessonsByCourseIdQuery(courseId || '');

    let courseName;
    if (!isLoading && courses?.success) {
        courseName = courses?.courses.find((course: CourseType) => course._id === courseId)?.name;
    }

    const handleRedirect: (unitId: string) => void = (unitId) => {
        navigate(`/admin/course/${courseId}/edit/${unitId}`);
    };

    return (
        <div
            className={`h-full basis-[15rem] overflow-auto bg-white phone:fixed phone:z-50 pm:fixed pm:z-50
            ${
                !open ? 'phone:translate-x-[-100%] pm:translate-x-[-100%]' : 'phone:translate-x-0 pm:translate-x-0'
            } transition-all duration-300`}
        >
            <h3 className="bg-gray-300 text-center font-title font-bold">{courseName ?? '...Loading'}</h3>

            <ul className="h-full">
                {!getAllLessonsLoading && lessons?.success
                    ? lessons.lessons.map((lesson: LessonType) => (
                          <li key={lesson._id}>
                              <div className="flex min-h-[3rem] items-center bg-gray-200 p-2">
                                  <h3 className="leading-tight">Chương {lesson.name}</h3>
                              </div>

                              <ul>
                                  {!getAllUnitLessonByCourseIdLoading && unitLessons?.success
                                      ? unitLessons.unitLessons.map((unitLesson: UnitLessonType) =>
                                            unitLesson.lesson === lesson._id ? (
                                                <li
                                                    onClick={() => handleRedirect(unitLesson._id)}
                                                    key={unitLesson._id}
                                                    className={`flex min-h-[3rem] cursor-pointer items-center gap-2 
                                                    ${
                                                        unitLesson._id === unitId ? 'border-r-[3px] border-green-400 bg-blue-200' : ''
                                                    } p-2 transition-all duration-300 hover:bg-bgHoverGrayDark`}
                                                >
                                                    {unitLesson.icon === 'videoLecture' ? (
                                                        <PlayCircleFilledIcon className="text-xs text-orange-400" />
                                                    ) : (
                                                        <CreateIcon className="text-xs text-orange-400" />
                                                    )}

                                                    <h4 className="select-none font-body text-[0.8rem] font-medium leading-tight text-textCustom">
                                                        Bai {unitLesson.title}
                                                    </h4>
                                                </li>
                                            ) : (
                                                ''
                                            )
                                        )
                                      : ''}
                              </ul>
                          </li>
                      ))
                    : ''}
            </ul>
        </div>
    );
};

export default Sidebar;
