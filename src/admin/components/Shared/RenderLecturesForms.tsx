// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
//@ts-ignore
import { LectureType } from '@types/types';
import VideoLectureForms from '@admin/components/Courses/Grammar/GrammarVideo/VideoLectureForms';
import GrammarExerciseForms from '@admin/components/Courses/Grammar/GrammarExercise/GrammarExerciseForms';
import { RootState } from '@store/store';
import VocaExerciseForms from '@admin/components/Courses/Listening/ListeningVocabulary/VocaExerciseForms';
import ListenExerciseForms from '../Courses/Listening/ListeningExercise/ListenExerciseForms';

const RenderLecturesForms: React.FC = () => {
    const { unitForms } = useSelector((state: RootState) => state.adminUnitLesson);

    switch (unitForms.lectureType) {
        case LectureType.videoLecture:
            return <VideoLectureForms />;
        case LectureType.grammarExercise:
            return <GrammarExerciseForms />;
        case LectureType.vocaExercise:
            return <VocaExerciseForms />;
        case LectureType.listenExercise:
            return <ListenExerciseForms />;
        default:
            break;
    }
};

export default RenderLecturesForms;
