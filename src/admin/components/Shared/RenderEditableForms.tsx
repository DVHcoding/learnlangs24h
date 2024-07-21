// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useParams } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetUnitLessonByIdQuery } from '@store/api/courseApi';
//@ts-ignore
import { LectureType } from '@types/types';
import RenderExerciseForms from '../Courses/Grammar/GrammarExercise/RenderExerciseForms';
import VideoLectureEditable from '../Courses/Grammar/GrammarVideo/VideoLectureEditable';

const RenderEditableForms: React.FC = () => {
    const { unitId } = useParams<string>();

    const { data: unitLessonData } = useGetUnitLessonByIdQuery(unitId, { skip: !unitId });

    switch (unitLessonData?.unitLesson?.lectureType) {
        case LectureType.grammarExercise:
            return <RenderExerciseForms />;
        case LectureType.videoLecture:
            return <VideoLectureEditable />;
        case LectureType.listenExercise:
            break;
        case LectureType.vocaExercise:
            break;
        default:
            break;
    }
};

export default RenderEditableForms;
