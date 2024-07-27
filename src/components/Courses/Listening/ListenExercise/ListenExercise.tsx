// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useSearchParams } from 'react-router-dom';
import loadable from '@loadable/component';
import { Empty } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const ConversationTest = loadable(() => import('@components/Courses/Listening/ListenExercise/KET/ConversationTest'));
const PicturesTest = loadable(() => import('@components/Courses/Listening/ListenExercise/KET/PicturesTest'));
const MatchingTest = loadable(() => import('@components/Courses/Listening/ListenExercise/KET/MatchingTest'));
const GapFill = loadable(() => import('@components/Courses/Listening/ListenExercise/KET/GapFill'));

//@ts-ignore
import { ListenExerciseTypes } from '@types/types';
import { useGetListenExerciseQuery } from '@store/api/courseApi';

const ListenExercise: React.FC = () => {
    // React Route Dom
    const [searchParams] = useSearchParams();
    let id = searchParams.get('id');

    // RTK
    const { data: ListenExerciseData } = useGetListenExerciseQuery(id, { skip: !id });

    switch (ListenExerciseData?.listeningExercise?.exerciseType) {
        case ListenExerciseTypes.Conversation:
            return (
                <div className="p-2">
                    <ConversationTest ListenExerciseData={ListenExerciseData} />
                </div>
            );
        case ListenExerciseTypes.PicturesTest:
            return (
                <div className="p-2">
                    <PicturesTest ListenExerciseData={ListenExerciseData} />
                </div>
            );
        case ListenExerciseTypes.MatchingTest:
            return (
                <div className="p-2">
                    <MatchingTest />
                </div>
            );
        case ListenExerciseTypes.GapFill:
            return (
                <div className="p-2">
                    <GapFill />
                </div>
            );

        default:
            return <Empty className="mt-4" />;
    }
};

export default ListenExercise;
