// ##################################
// #       IMPORT Components
// ##################################
import Plant from '@assets/backgrounds/Plant.png';
import Video from '@assets/videos/videoAuthen.mp4';

import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@pages/Sidebar/Sidebar';

import TeamGroup from './Group';
import TopUsers from './TopUsers';
import Features from './Features';
import Certificates from './Certificates';

// ##################################
// #       IMPORT Npm
// ##################################
import { MoveRight } from 'lucide-react';

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
                <div className="flex h-full w-full overflow-hidden rounded-2xl shadow-md sm:rounded-none">
                    {/* SIDE-BAR */}
                    <Sidebar />

                    {/* CONTENT */}
                    <div
                        className={`scrollbar w-full overflow-auto bg-bgCustom xl:rounded-r-2xl xl:border-2 
                        xl:border-bdCustom  ${expanded ? 'phone:z-0' : ''}`}
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
                                ></video>

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
                            <div
                                className="relative shrink basis-80 rounded-xl bg-bgCustomProcess px-4 py-6 
                            md:overflow-hidden lg:overflow-visible"
                            >
                                <h1 className="mb-3 font-title text-xl font-bold text-textCustom phone:text-lg">
                                    My Process
                                </h1>

                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="font-title text-base text-textCustom">
                                            Today
                                        </p>
                                        <span className="font-body text-sm font-bold text-textCustomProcess">
                                            4 hours
                                        </span>
                                    </div>

                                    <div>
                                        <p className="font-title text-base text-textCustom">
                                            This Month
                                        </p>
                                        <span className="font-body text-sm font-bold text-textCustomProcess">
                                            72 hours
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 flex max-w-max cursor-pointer items-center gap-4">
                                    <p
                                        className="select-none font-body text-base 
                                        font-semibold  text-textCustom transition-all hover:text-textCustomProcess phone:text-sm"
                                    >
                                        View Details
                                    </p>
                                    <MoveRight
                                        strokeWidth={2}
                                        size={18}
                                        className="text-textCustom"
                                    />
                                </div>

                                <img
                                    src={Plant}
                                    alt="Plant"
                                    className="absolute bottom-0 right-[-4rem] w-44 md:right-[-2rem] 
                                    md:w-36 phone:right-[-1rem] phone:w-24 pm:right-[-1rem] pm:w-24"
                                />
                            </div>
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
