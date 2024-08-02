// ##################################
// #       IMPORT Npm
// ##################################
import { useEffect, useState } from 'react';
import loadable from '@loadable/component';

// ##################################
// #       IMPORT Components
// ##################################
import Video from '@assets/videos/videoAuthen.mp4';
const HelmetWrapper = loadable(() => import('@components/Helmet/HelmetWrapper'));
const TeamGroup = loadable(() => import('./Group'));
const TopUsers = loadable(() => import('./TopUsers'));
const Features = loadable(() => import('./Features'));
const Certificates = loadable(() => import('./Certificates'));
const Process = loadable(() => import('./Process'));
const VideoBannerSkeleton = loadable(() => import('@components/Skeleton/VideoBannerSkeleton'));

// ##################################
const Home: React.FC = () => {
    let loading: boolean = false;
    const [loadingBanner, setLoadingBanner] = useState<boolean>(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoadingBanner(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div>
            <HelmetWrapper
                title="Learnlangs24h"
                description="Learnlangs24h makes AI-powered learning tools that let you study anything. Start learning today with our online flashcards, games and expert-written solutions"
                canonical="/"
            />

            {/* BODY HEAD */}
            <div className="flex gap-4 px-4 sm:flex-wrap">
                {/* Banner */}
                {!loadingBanner ? (
                    <div
                        className="relative h-52 shrink-0 basis-[50%] overflow-hidden rounded-xl bg-bgHoverGrayDark 
                        sm:grow phone:w-full"
                    >
                        <video src={Video} autoPlay muted loop className="absolute h-full w-full object-cover">
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
                                Free English skills development platform. You can access necessary features in the sidebar
                            </p>
                        </div>
                    </div>
                ) : (
                    <VideoBannerSkeleton />
                )}

                {/* My process */}
                <Process />
            </div>

            {/* BODY CENTER */}
            <div className="grid grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-1">
                <div>
                    {/* Features */}
                    <Features />

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
                        <TopUsers />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
