// ##################################
// #       IMPORT Npm
// ##################################

// ##################################
// #       IMPORT Components
// ##################################
import Video from '@assets/videos/videoAuthen.mp4';
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@pages/Sidebar/Sidebar';

import TeamGroup from './Group';
import TopUsers from './TopUsers';
import Features from './Features';
import Certificates from './Certificates';
import Process from './Process';

// ##################################
const Home: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const expanded: boolean = window.innerWidth > 390;
    let loading: boolean = false;

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
                <div className="flex h-full w-full overflow-hidden rounded-md border-2 border-bdCustom sm:rounded-none">
                    {/* SIDE-BAR */}
                    <Sidebar />

                    {/* CONTENT */}
                    <div
                        className={`scrollbar w-full overflow-auto bg-bgCustom 
                        ${expanded ? 'phone:z-0' : ''} `}
                    >
                        <Navbar toggleTheme={toggleTheme} />

                        {/* BODY HEAD */}
                        <div className="flex gap-4 px-4 sm:flex-wrap">
                            {/* Banner */}
                            <div
                                className="relative h-52 shrink-0 basis-[50%] overflow-hidden rounded-xl bg-bgHoverGrayDark 
                                sm:grow phone:w-full"
                            >
                                <video
                                    src={Video}
                                    autoPlay
                                    muted
                                    loop
                                    className="absolute h-full w-full object-cover"
                                >
                                    <track kind="captions" srcLang="en" label="English Captions" />
                                </video>

                                <div
                                    className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] px-2
                                    text-center text-white"
                                >
                                    <h1
                                        className="mb-2 text-nowrap font-body text-2xl font-bold sm:text-wrap md:text-wrap 
                                        md:text-lg lg:text-3xl phone:text-wrap phone:text-lg"
                                    >
                                        Explore many exciting courses
                                    </h1>

                                    <p className="mb-[10%] text-base sm:text-wrap md:text-wrap md:text-sm lg:text-lg phone:text-left phone:text-sm">
                                        Free English skills development platform. You can access
                                        necessary features in the sidebar
                                    </p>
                                </div>
                            </div>

                            {/* My process */}
                            <Process />
                        </div>

                        {/* BODY CENTER */}
                        <div className="grid grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-1">
                            <div>
                                {/* Features */}
                                <Features loading={loading} />

                                {/* Certificates */}
                                <Certificates />
                            </div>

                            <div
                                className="flex items-start justify-between gap-4 sm:flex-wrap sm:justify-center 
                                md:flex-wrap lg:ml-2 lg:flex-nowrap phone:ml-0"
                            >
                                {/* Group & New books */}
                                <TeamGroup loading={loading} />

                                {/* Top users */}
                                <div className="sm:grow md:grow">
                                    <TopUsers loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
