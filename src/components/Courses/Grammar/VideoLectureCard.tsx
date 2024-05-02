// ##################################
// #       IMPORT Components
// ##################################
import {
    useGetAllLessonsByCourseIdQuery,
    useGetAllUnitLessonsByCourseIdQuery,
    useGetUnitLessonByIdQuery,
    useGetVideoLectureContentQuery,
} from '@store/api/courseApi';
import { AppDispatch } from '@store/store';
import { createNewUserProcessStatus, updateUserProcessStatus } from '@store/reducer/courseReducer';
import { useUserDetailsQuery } from '@store/api/userApi';
import { LessonType, UnitLessonType } from 'types/api-types';
import { toastError } from '@components/Toast/Toasts';

// ##################################
// #       IMPORT Npm
// ##################################
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
import { Fragment } from 'react/jsx-runtime';
import { Empty } from 'antd';
import { useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// ##################################
const VideoLectureCard: React.FC<{ unitLessonId: string; userProcessRefetch: () => void }> = ({ unitLessonId, userProcessRefetch }) => {
    const dispatch: AppDispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // ?id=.....
    const { id: courseId } = useParams();

    /* -------------------------------------------------------------------------- */
    /*                                # API RTK query                             */
    /* -------------------------------------------------------------------------- */
    const { data: videoLectureContentData, isLoading: videoLectureContentLoading } = useGetVideoLectureContentQuery(
        unitLessonId || 'undefined'
    );
    const { data: userDetailsData, isLoading: userDetailsLoading } = useUserDetailsQuery();
    const { data: lessons, isLoading: getAllLessonsLoading } = useGetAllLessonsByCourseIdQuery(courseId || '');
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(id || '');
    const { data: unitLessons, isLoading: getUnitLessonsByCourseIdLoading } = useGetAllUnitLessonsByCourseIdQuery(courseId || '');

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [apiCalled, setApiCalled] = useState<boolean>(false);
    const currentTimeRef = useRef<number>(0);

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */
    const handleProgress = async (progress: { playedSeconds: number }) => {
        currentTimeRef.current = progress.playedSeconds;

        if (currentTimeRef.current >= 565 - 120 && !apiCalled /* chỉ cho phép chạy api get 1 lần */) {
            if (!getAllLessonsLoading && lessons?.success && !getUnitLessonByIdLoading && unitLesson?.success) {
                if (unitLessons?.success && !getUnitLessonsByCourseIdLoading && !userDetailsLoading && userDetailsData?.user) {
                    // # Lấy vị trí của unitLesson hiện tại (bại đang học hiện tại)
                    const currentUnitLessonIndex = unitLessons.unitLessons.findIndex((unitLesson: UnitLessonType) => {
                        return unitLesson._id === id;
                    });

                    // id của unitLesson hiện tại
                    const currentUnitLessonId = unitLessons?.unitLessons[currentUnitLessonIndex]?._id;

                    // # Lấy id của unitLesson tiếp theo (bài học tiếp theo) dựa vào vị trí của bài học trước + 1
                    let nextUnitLessonId = unitLessons.unitLessons[currentUnitLessonIndex + 1]?._id;

                    try {
                        // # Nếu không phải bài cuối thì mở khóa bài tiếp theo
                        if (nextUnitLessonId) {
                            const userId = userDetailsData.user._id as string;

                            // kiểm tra xem bài tiếp theo đã completed hay unlock chưa
                            const { data }: any = await axios.get(
                                `/api/v1/unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${nextUnitLessonId}`
                            );

                            if (data.success === false) {
                                await dispatch(createNewUserProcessStatus({ userId, unitLessonId: nextUnitLessonId }));
                                await dispatch(updateUserProcessStatus({ userId, unitLessonId: currentUnitLessonId }));
                                userProcessRefetch();
                            }
                        } else {
                            // # Nếu là bài cuối cùng
                            // # Lấy vị trí của lesson dựa vào unitLesson bài hiện tại . id của lesson
                            const currentLessonIndex = lessons.lessons.findIndex((lesson: LessonType) => {
                                return lesson._id === unitLesson.unitLesson.lesson;
                            });

                            // # Lấy ra id của lesson tiếp theo dựa vào vị trí của lesson trước + 1
                            const nextLessonId = lessons.lessons[currentLessonIndex + 1]?._id;

                            // # Nếu là lesson cuối cùng thi thông báo đã là bài cuối cùng
                            if (!nextLessonId) {
                                return toastError('Bạn đã học đến bài cuối cùng!');
                            }

                            // # Lấy ra tất cả unitLesson của bài tiếp theo dựa vào id lesson mới
                            const allUnitLessonWithNextLessonId = unitLessons.unitLessons.filter((unitLesson: UnitLessonType) => {
                                return unitLesson.lesson === nextLessonId;
                            });

                            // # Gán cho nextUnitLessonId là id của unitLesson vị trí thứ 0 với lesson Id mới
                            nextUnitLessonId = allUnitLessonWithNextLessonId[0]._id;
                        }

                        setApiCalled(true); // Flag này dùng để tránh api bị call liên tục khi chạy video. Chỉ chạy một lần duy nhất
                    } catch (error) {
                        toastError('có lỗi xảy ra!');
                    }
                }
            }
        }
    };

    // const timeStr = '9:26';
    // const [minutes, seconds] = timeStr.split(':').map(Number);

    // const totalSeconds = minutes * 60 + seconds;
    // console.log('Tổng số giây:', totalSeconds);

    return (
        <div className="w-full rounded-lg pb-2">
            {!videoLectureContentLoading && videoLectureContentData?.videoLectureContent ? (
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
                    <div className="tracking-wide text-textCustom">{parse(videoLectureContentData.videoLectureContent.description)}</div>
                </Fragment>
            ) : (
                <Empty className="mt-4" />
            )}
        </div>
    );
};

export default VideoLectureCard;
