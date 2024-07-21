// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useParams } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetGrammarExerciseQuery } from '@store/api/courseApi';
//@ts-ignore
import { GrammarExerciseTypes } from '@types/types';
import FillBlankEditable from './FillBlank/FillBlankEditable';

const RenderExerciseForms: React.FC = () => {
    const { unitId } = useParams<string>();

    const { data: grammarExerciseData } = useGetGrammarExerciseQuery(unitId, { skip: !unitId });

    switch (grammarExerciseData?.grammarExercise?.exerciseType) {
        case GrammarExerciseTypes.FillBlankExercise:
            return <FillBlankEditable />;

        default:
            break;
    }
};

export default RenderExerciseForms;
