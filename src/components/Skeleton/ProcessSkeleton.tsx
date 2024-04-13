import Skeleton from '@mui/material/Skeleton';

const ProcessSkeleton = () => {
    return (
        <div
            className="relative shrink basis-80 animate-pulse rounded-xl bg-bgCustomProcess px-4 
            py-6 md:overflow-hidden lg:overflow-visible"
        >
            <h1 className="mb-3 font-title text-xl font-bold text-textCustom phone:text-lg">
                <Skeleton animation="wave" width={218} />
            </h1>

            <div className="flex items-center gap-4">
                <div>
                    <Skeleton animation="wave" width={100} height={15} />
                    <Skeleton animation="wave" width={100} height={15} />
                </div>

                <div>
                    <Skeleton animation="wave" width={100} height={15} />
                    <Skeleton animation="wave" width={100} height={15} />
                </div>
            </div>

            <div className="mt-8 flex max-w-max cursor-pointer items-center gap-4">
                <Skeleton animation="wave" width={100} height={15} />
            </div>
        </div>
    );
};

export default ProcessSkeleton;
