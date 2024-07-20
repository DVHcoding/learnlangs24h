// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { LectureType } from '../../../types/types';
import { CourseType, LessonType } from '../../../types/api-types';
import { AppDispatch, RootState } from '@store/store';
import { changeUnitForms } from '@store/reducer/adminUnitLessonReducer';
import { useGetAllCoursesQuery, useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';

const UnitForms: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { unitForms } = useSelector((state: RootState) => state.adminUnitLesson);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        dispatch(changeUnitForms({ name: name as keyof typeof unitForms, value }));
    };

    const { data: courses } = useGetAllCoursesQuery();
    const { data: lessons } = useGetAllLessonsByCourseIdQuery(unitForms.course, { skip: !unitForms.course });

    return (
        <div className="flex flex-col gap-4">
            {/* unitTitle */}
            <div>
                <span className="font-body font-bold text-textCustom">Tên (*)</span>
                <input
                    name="title"
                    value={unitForms.title}
                    onChange={handleChange}
                    required
                    type="text"
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                    bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                />
            </div>

            {/* unitTime */}
            <div>
                <span className="font-body font-bold text-textCustom">Thời gian (*)</span>
                <input
                    name="time"
                    value={unitForms.time}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="00:00:00"
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border
                  border-gray-300 bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                />
            </div>

            {/* unitIcon */}
            <div>
                <span className="font-body font-bold text-textCustom">Icon (*)</span>
                <select
                    name="icon"
                    value={unitForms.icon}
                    onChange={handleChange}
                    required
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom 
                    p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                >
                    <option className="hidden" value="">
                        --- Chọn icon ---
                    </option>
                    <option value={LectureType.videoLecture}>Video Icon</option>
                    <option value={'exercise'}>Exercise Icon</option>
                    <option value={LectureType.listenExercise}>Listening Icon</option>
                </select>
            </div>

            {/* CourseId */}
            <div>
                <span className="font-body font-bold text-textCustom">Khóa học (*)</span>
                <select
                    name="course"
                    value={unitForms.course}
                    onChange={handleChange}
                    required
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 
                    bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                >
                    <option className="hidden" value="">
                        --- Chọn khóa học ---
                    </option>

                    {courses?.courses?.map((course: CourseType) => (
                        <option value={course._id} key={course._id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* LessonId */}
            <div>
                <span className="font-body font-bold text-textCustom">Chương (*)</span>
                <select
                    name="lesson"
                    value={unitForms.lesson}
                    onChange={handleChange}
                    required
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 
                    bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                >
                    <option className="hidden" value="">
                        --- Chọn chương học ---
                    </option>

                    {lessons?.lessons?.map((lesson: LessonType) => (
                        <option value={lesson._id} key={lesson._id}>
                            {lesson.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* LectureTypes */}
            <div>
                <span className="font-body font-bold text-textCustom">Loại bài học (*)</span>
                <select
                    name="lectureType"
                    value={unitForms.lectureType}
                    onChange={handleChange}
                    required
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom 
                    p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                >
                    <option className="hidden" value="">
                        --- Chọn loại bài học ---
                    </option>
                    <option value={LectureType.videoLecture}>Grammar Video</option>
                    <option value={LectureType.grammarExercise}>Grammar Exercise</option>
                    <option value={LectureType.vocaExercise}>Vocabulary Exercise</option>
                    <option value={LectureType.listenExercise}>Listening Exercise</option>
                </select>
            </div>
        </div>
    );
};

export default UnitForms;
