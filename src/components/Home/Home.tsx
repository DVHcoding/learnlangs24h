// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';

// ##################################
// #       IMPORT Npm
// ##################################

const Home: React.FC = () => {
    return (
        <div>
            <HelmetWrapper
                title="Learnlangs24h"
                description="Learnlangs24h makes AI-powered learning tools that let you study anything. Start learning today with our online flashcards, games and expert-written solutions"
                canonical="/"
            />

            <h1 className="text-red-400">Home</h1>
        </div>
    );
};

export default Home;
