// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
import { Fragment } from 'react/jsx-runtime';
import { Empty } from 'antd';
import { useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import {
    useGetAllLessonsByCourseIdQuery,
    useGetAllUnitLessonsByCourseIdQuery,
    useGetUnitLessonByIdQuery,
    useGetUserProcessStatusesQuery,
    useGetVideoLectureContentQuery,
    useLazyGetUnitLessonIdByUserProcessQuery,
} from '@store/api/courseApi';
import { AppDispatch } from '@store/store';
import { useUserDetailsQuery } from '@store/api/userApi';
import { UnitLessonStatus } from 'types/api-types';
import { unlockUnitLesson } from '@utils/unlockUnitLesson';

const VideoLectureCard: React.FC<{ unitLessonId: string }> = ({ unitLessonId }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // ?id=.....
    const { id: courseId } = useParams<{ id: string }>();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const currentTimeRef = useRef<number>(0);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetailsData } = useUserDetailsQuery();
    const userId = useMemo(() => userDetailsData?.user?._id, [userDetailsData?.user]);

    const { data: videoLectureContentData } = useGetVideoLectureContentQuery(unitLessonId, {
        skip: !unitLessonId,
    });
    const { data: lessons } = useGetAllLessonsByCourseIdQuery(courseId, { skip: !courseId });
    const { data: unitLesson } = useGetUnitLessonByIdQuery(id, { skip: !id });
    const { data: unitLessons } = useGetAllUnitLessonsByCourseIdQuery(courseId, {
        skip: !courseId,
    });
    const { data: userProcessStatusData, refetch: userProcessRefetch } = useGetUserProcessStatusesQuery(userId, { skip: !userId });
    const [unitLessonByUserProcess] = useLazyGetUnitLessonIdByUserProcessQuery();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const isCompleted = useMemo(() => {
        if (userProcessStatusData?.success) {
            const currentUnitLesson = userProcessStatusData?.unitLessonStatus?.find(
                (status: UnitLessonStatus) => status?.unitLessonId?._id === id
            );
            return currentUnitLesson?.status === 'completed';
        }
        return false;
    }, [userProcessStatusData, id]);

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleProgress = async (progress: { playedSeconds: number }) => {
        currentTimeRef.current = progress.playedSeconds;

        // Lấy ra tổng thời gian của video và chuyển về số giây
        const timeStr = videoLectureContentData?.videoLectureContent.totalTime ?? '00:05:00';
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (currentTimeRef.current >= totalSeconds - 100) {
            if (!isCompleted) {
                await unlockUnitLesson({
                    id,
                    userId,
                    unitLesson,
                    allUnitLessonData: unitLessons,
                    lessons,
                    dispatch,
                    userProcessRefetch,
                    unitLessonByUserProcess,
                });
            }
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="rounded-lg pb-2">
            {videoLectureContentData?.videoLectureContent ? (
                <Fragment>
                    <div className="h-[27rem] phone:h-[13rem] pm:h-[20rem]">
                        <ReactPlayer
                            height="100%"
                            width="100%"
                            controls={true}
                            url={videoLectureContentData?.videoLectureContent?.videoUrl}
                            onProgress={handleProgress}
                        />
                    </div>
                    <div className="overflow-hidden tracking-wide text-textCustom">
                        {parse(videoLectureContentData?.videoLectureContent?.description)}
                    </div>
                </Fragment>
            ) : (
                <Empty className="mt-4" />
            )}
        </div>
    );
};

export default VideoLectureCard;
