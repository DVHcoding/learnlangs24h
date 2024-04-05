// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@pages/Sidebar/Sidebar';

// ##################################
// #       IMPORT Npm
// ##################################

const Home: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const expanded: boolean = window.innerWidth > 390;

    return (
        <div>
            <HelmetWrapper
                title="Learnlangs24h"
                description="Learnlangs24h makes AI-powered learning tools that let you study anything. Start learning today with our online flashcards, games and expert-written solutions"
                canonical="/"
            />
            {/* CONTAINER */}
            <div
                className="scrollbar h-screen overflow-auto bg-bgCustom sm:px-0 sm:py-0 md:p-0 
                xl:px-8 xl:py-4"
            >
                {/* BOX */}
                <div className="flex h-full w-full overflow-hidden rounded-2xl shadow-md sm:rounded-none">
                    {/* SIDE-BAR */}
                    <Sidebar />

                    {/* CONTENT */}
                    <div
                        className={`scrollbar w-full overflow-auto bg-bgCustom 
                    xl:rounded-r-2xl xl:border-2 xl:border-bdCustom  ${
                        expanded ? 'phone:z-0' : ''
                    }`}
                    >
                        <Navbar toggleTheme={toggleTheme} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
