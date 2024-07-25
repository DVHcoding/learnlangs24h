// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { UnitLessonType } from 'types/api-types';
import VideoLectureCard from '@components/Courses/Grammar/VideoLectureCard';
import VocaExercise from '@components/Courses/Listening/VocaExercise';
import ListenExercise from '@components/Courses/Listening/ListenExercise/ListenExercise';
import GrammarExercise from '@components/Courses/Grammar/GrammarExercise/GrammarExercise';
//@ts-ignore
import { LectureType } from '@types/types';
import DotLoader from '@pages/Loader/DotLoader';

interface RenderContentProps {
    unitLesson: UnitLessonType | undefined;
}

const RenderContent: React.FC<RenderContentProps> = ({ unitLesson }) => {
    switch (unitLesson?.lectureType) {
        case LectureType.videoLecture:
            return <VideoLectureCard unitLessonId={unitLesson._id} />;
        case LectureType.grammarExercise:
            return <GrammarExercise />;
        case LectureType.vocaExercise:
            return <VocaExercise />;
        case LectureType.listenExercise:
            return <ListenExercise />;
        default:
            return (
                <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                    <DotLoader />
                </div>
            );
    }
};

export default RenderContent;
