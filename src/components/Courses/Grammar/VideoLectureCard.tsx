// ##################################
// #       IMPORT Components
// ##################################

// ##################################
// #       IMPORT Npm
// ##################################
import ReactPlayer from 'react-player';
import { useGetVideoLectureContentQuery } from '@store/api/courseApi';
import parse from 'html-react-parser';
import { Fragment } from 'react/jsx-runtime';
import { Empty } from 'antd';
import { useRef } from 'react';

// ##################################
const VideoLectureCard: React.FC<{ unitLessonId: string }> = ({ unitLessonId }) => {
    const { data: videoLectureContentData, isLoading: videoLectureContentLoading } = useGetVideoLectureContentQuery(
        unitLessonId || 'undefined'
    );

    const currentTimeRef = useRef(0);

    const handleProgress = (progress: { playedSeconds: number }) => {
        currentTimeRef.current = progress.playedSeconds;

        if (currentTimeRef.current >= 565 - 120) {
            console.log('ok');
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
