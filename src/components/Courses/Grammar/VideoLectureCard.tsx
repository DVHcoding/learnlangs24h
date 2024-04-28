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

// ##################################
const VideoLectureCard: React.FC<{ unitLessonId: string }> = ({ unitLessonId }) => {
    const { data: videoLectureContentData, isLoading: videoLectureContentLoading } = useGetVideoLectureContentQuery(unitLessonId || '');

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
