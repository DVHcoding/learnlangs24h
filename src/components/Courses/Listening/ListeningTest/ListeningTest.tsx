// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################

// import ConversationTest from '@components/Courses/Listening/ListeningTest/KET/ConversationTest';
import PicturesTest from '@components/Courses/Listening/ListeningTest/KET/PicturesTest';
// import MatchingTest from '@components/Courses/Listening/ListeningTest/KET/MatchingTest';
// import GapFill from '@components/Courses/Listening/ListeningTest/KET/GapFill';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const ListeningTest: React.FC = () => {
    return (
        <div className="p-2">
            <PicturesTest />
        </div>
    );
};

export default ListeningTest;
