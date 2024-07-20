// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useSearchParams } from 'react-router-dom';
import { Empty } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetGrammarExerciseQuery } from '@store/api/courseApi';
import { ExerciseType } from './GrammarExercise.types';
import FillBlankExercise from './FillBlank/FillBlankExercise';

const GrammarExercise: React.FC = () => {
    const [searchParams] = useSearchParams();
    let id = searchParams.get('id');

    const { data: GrammarExerciseData } = useGetGrammarExerciseQuery(id, { skip: !id });

    switch (GrammarExerciseData?.grammarExercise?.exerciseType) {
        case ExerciseType.FillBlankExercise:
            return (
                <div className="p-2">
                    <FillBlankExercise GrammarExerciseData={GrammarExerciseData} />
                </div>
            );
        default:
            return <Empty className="mt-4" />;
    }
};

export default GrammarExercise;
