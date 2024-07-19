// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Spin } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { UnitLessonType, UserProcessStatusResponse } from 'types/api-types';
import FillBlankExerciseCard from '@components/Courses/Grammar/FillBlankExerciseCard';
import VideoLectureCard from '@components/Courses/Grammar/VideoLectureCard';
import VocaExercise from '@components/Courses/Listening/VocaExercise';
import ListenExercise from '@components/Courses/Listening/ListenExercise/ListenExercise';

interface RenderContentProps {
    unitLesson: UnitLessonType | undefined;
    userProcessRefetch: () => void;
    userId?: string;
    userProcessStatusData?: UserProcessStatusResponse;
}

const RenderContent: React.FC<RenderContentProps> = ({ unitLesson, userProcessRefetch, userId, userProcessStatusData }) => {
    switch (unitLesson?.lectureType) {
        case 'videoLecture':
            return <VideoLectureCard unitLessonId={unitLesson._id} userProcessRefetch={userProcessRefetch} />;
        case 'exercise':
            return (
                <FillBlankExerciseCard
                    userId={userId as string}
                    userProcessStatusData={userProcessStatusData}
                    userProcessRefetch={userProcessRefetch}
                />
            );
        case 'vocaExercise':
            return <VocaExercise />;
        case 'listenExercise':
            return <ListenExercise />;
        default:
            return (
                <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                    <Spin />
                </div>
            );
    }
};

export default RenderContent;
