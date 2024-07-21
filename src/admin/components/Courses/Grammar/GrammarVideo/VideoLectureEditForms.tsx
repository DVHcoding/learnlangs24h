// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import {
    useGetAllLessonsByCourseIdQuery,
    useGetGrammarExerciseQuery,
    useGetUnitLessonByIdQuery,
    useGetVideoLectureContentQuery,
} from '@store/api/courseApi';
import {
    changeEditableForms,
    changeUnitForms,
    changeVideoEditForms,
    changeVideoLecture,
    VideoLectureState,
} from '@store/reducer/adminUnitLessonReducer';
import { AppDispatch, RootState } from '@store/store';
import { Radio } from 'antd';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { LessonType } from 'types/api-types';

const VideoLectureEditForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { unitForms, videoLecture } = useSelector((state: RootState) => state.adminUnitLesson);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const { id: courseId, unitId } = useParams<string>();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: videoLectureData } = useGetVideoLectureContentQuery(unitId, { skip: !unitId });
    const { data: grammarExerciseData } = useGetGrammarExerciseQuery(unitId, { skip: !unitId });
    const { data: unitLesson } = useGetUnitLessonByIdQuery(unitId, { skip: !unitId });
    const { data: lessons } = useGetAllLessonsByCourseIdQuery(courseId, { skip: !courseId });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        dispatch(changeUnitForms({ name: name as keyof typeof unitForms, value }));
    };

    const handleVideoLectureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(changeVideoLecture({ name: name as keyof VideoLectureState, value }));
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    useEffect(() => {
        if (!unitId || !unitLesson || !videoLectureData) {
            return;
        }

        dispatch(
            changeEditableForms({
                title: unitLesson?.unitLesson.title,
                time: unitLesson?.unitLesson.time,
                lesson: unitLesson?.unitLesson.lesson,
            })
        );
        dispatch(
            changeVideoEditForms({
                videoUrl: videoLectureData?.videoLectureContent?.videoUrl,
                totalTime: videoLectureData?.videoLectureContent?.totalTime,
                description: videoLectureData?.videoLectureContent?.description,
            })
        );
    }, [unitId, unitLesson, grammarExerciseData?.grammarExercise?.type]);

    return (
        <div>
            <div>
                <span className="font-body font-bold">Tên (*)</span>
                <input
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={unitForms.title}
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border 
                    border-gray-300 p-1 focus:border-blue-400 sm:w-full"
                />
            </div>

            <div>
                <span className="font-body font-bold">Thời gian (*)</span>
                <input
                    name="time"
                    value={unitForms.time}
                    onChange={handleChange}
                    type="text"
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                    p-1 focus:border-blue-400 sm:w-full"
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

            <div>
                <span className="font-body font-bold">Tổng giời gian video (*)</span>
                <input
                    title="totalTime"
                    type="text"
                    value={videoLecture.totalTime}
                    onChange={handleVideoLectureChange}
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border 
                  border-gray-300 p-1 focus:border-blue-400 sm:w-full"
                />
            </div>

            <div>
                <span className="font-body font-bold">Bài học video (*)</span>

                <div className="mt-2">
                    <Radio.Group>
                        <Radio value={1}>Tải lên</Radio>
                        <Radio value={2}>Youtube</Radio>
                    </Radio.Group>
                </div>

                <input
                    name="videoUrl"
                    value={videoLecture.videoUrl}
                    onChange={handleVideoLectureChange}
                    type="text"
                    className="text-segoe mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1
                    focus:border-blue-400 sm:w-full"
                    placeholder="https://www.youtube.com"
                />

                <div className="mt-4 max-w-[35rem] overflow-hidden rounded-[3px] sm:h-[20rem] sm:w-full">
                    <ReactPlayer controls={true} url={videoLecture.videoUrl} width={'100%'} />
                </div>
            </div>
        </div>
    );
};

export default VideoLectureEditForms;
