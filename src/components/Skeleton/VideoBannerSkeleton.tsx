import Skeleton from '@mui/material/Skeleton';

const VideoBannerSkeleton = () => {
    return (
        <div
            className="relative h-52 shrink-0 basis-[50%] animate-pulse overflow-hidden rounded-xl 
            bg-bgHoverGrayDark sm:grow phone:w-full"
        >
            <div
                className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] px-2
                text-center text-white"
            >
                <h1
                    className="mb-2 text-nowrap font-body text-2xl font-bold sm:text-wrap md:text-wrap 
                    md:text-lg lg:text-3xl phone:text-wrap phone:text-lg"
                >
                    <Skeleton animation="wave" width={'90%'} className="mx-auto" />
                </h1>

                <p className="mb-[10%] text-base sm:text-wrap md:text-wrap md:text-sm lg:text-lg phone:text-left phone:text-sm">
                    <Skeleton animation="wave" width={'90%'} height={15} className="mx-auto" />
                    <Skeleton animation="wave" width={'90%'} height={15} className="mx-auto" />
                    <Skeleton animation="wave" width={'90%'} height={15} className="mx-auto" />
                </p>
            </div>
        </div>
    );
};

export default VideoBannerSkeleton;
