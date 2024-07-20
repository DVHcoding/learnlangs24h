// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
// @ts-ignore
import { GrammarExerciseTypes } from '@types/types';
import FillBlankExercise from './FillBlank/FillBlankExercise';
import MultipleChoice from './MultipleChoice/MultipleChoice';

interface RenderExerciseProps {
    exerciseType: string;
}

const RenderExercise: React.FC<RenderExerciseProps> = ({ exerciseType }) => {
    switch (exerciseType) {
        case GrammarExerciseTypes.FillBlankExercise:
            return <FillBlankExercise />;
        case GrammarExerciseTypes.MultipleChoice:
            return <MultipleChoice />;
        default:
            break;
    }
};

export default RenderExercise;
