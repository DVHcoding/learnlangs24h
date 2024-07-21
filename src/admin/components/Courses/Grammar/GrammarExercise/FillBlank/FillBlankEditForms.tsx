// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
//@ts-ignore
import { GrammarExerciseTypes } from '@types/types';
import { changeEditableForms, changeUnitForms } from '@store/reducer/adminUnitLessonReducer';
import { useGetAllLessonsByCourseIdQuery, useGetGrammarExerciseQuery, useGetUnitLessonByIdQuery } from '@store/api/courseApi';
import { LessonType } from 'types/api-types';
import { AppDispatch, RootState } from '@store/store';

const FillBlankEditForms: React.FC = () => {
    // Hooks
    const dispatch: AppDispatch = useDispatch();
    const { unitForms } = useSelector((state: RootState) => state.adminUnitLesson);

    // React router dom
    const { id: courseId, unitId } = useParams<string>();
    // RTK
    const { data: grammarExerciseData } = useGetGrammarExerciseQuery(unitId, { skip: !unitId });
    const { data: unitLesson } = useGetUnitLessonByIdQuery(unitId, { skip: !unitId });
    const { data: lessons } = useGetAllLessonsByCourseIdQuery(courseId, { skip: !courseId });

    //Function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        dispatch(changeUnitForms({ name: name as keyof typeof unitForms, value }));
    };

    useEffect(() => {
        if (!unitId || !unitLesson) {
            return;
        }

        dispatch(
            changeEditableForms({
                title: unitLesson?.unitLesson.title,
                time: unitLesson?.unitLesson.time,
                lesson: unitLesson?.unitLesson.lesson,
                date: dayjs(unitLesson?.unitLesson.createAt).format('YYYY-MM-DD HH:mm:ss'),
            })
        );
    }, [unitId, unitLesson, grammarExerciseData?.grammarExercise?.type]);

    return (
        <div className="flex flex-col gap-4">
            {/* Unit Title */}
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

            {/* Time */}
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

            {/* Date */}
            <div>
                <span className="font-body font-bold">Ngày tạo (*)</span>
                <input
                    name="date"
                    type="datetime-local"
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border
                  border-gray-300 p-1 focus:border-blue-400 sm:w-full"
                    onChange={handleChange}
                    value={unitForms.date}
                />
            </div>

            {/* Chapter */}
            <div>
                <span className="font-body font-bold">Chương học (*)</span>
                <select
                    name="lesson"
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300
                  bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    onChange={handleChange}
                    value={unitForms.lesson}
                >
                    <option disabled>--- Chọn chương ---</option>
                    {lessons?.lessons?.map((lesson: LessonType) => (
                        <option value={lesson._id} key={lesson._id}>
                            {lesson.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* LectureType */}
            <div>
                <span className="font-body font-bold">Loại bài học (*)</span>
                <select
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300
                  bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    defaultValue={'exercise'}
                >
                    <option value="exercise">Thực hành</option>
                </select>
            </div>

            {/* Exercise Type */}
            <div>
                <span className="font-body font-bold">Loại bài tập (*)</span>
                <select
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                    p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    defaultValue={GrammarExerciseTypes.FillBlankExercise}
                >
                    <option value={GrammarExerciseTypes.FillBlankExercise}>Điền vào chỗ trống</option>
                </select>
            </div>
        </div>
    );
};

export default FillBlankEditForms;
