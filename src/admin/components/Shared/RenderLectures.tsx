// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { LectureType } from '../../../types/types';
import VideoLectureContent from '@admin/components/Courses/Grammar/GrammarVideo/VideoLectureContent';
import GrammarExercise from '@admin/components/Courses/Grammar/GrammarExercise/GrammarExercise';
import { RootState } from '@store/store';

const RenderLectures: React.FC = () => {
    const { unitForms } = useSelector((state: RootState) => state.adminUnitLesson);

    switch (unitForms.lectureType) {
        case LectureType.videoLecture:
            return <VideoLectureContent />;
        case LectureType.grammarExercise:
            return <GrammarExercise />;
        default:
            break;
    }
};

export default RenderLectures;
