// ##################################
// #       IMPORT Components
// ##################################

import { useGetAllCoursesQuery } from '@store/api/courseApi';
import { CourseType } from 'types/api-types';

// ##################################
// #       IMPORT Npm
// ##################################
import { ArrowRight } from 'lucide-react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

interface MediaProps {
    loading?: boolean;
    data?: CourseType[];
}

function Media(props: MediaProps) {
    const { loading = false, data } = props;
    const navigate = useNavigate();

    const handleRedirect: (path: string) => void = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="mb-6">
                {/* top */}
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="font-title text-xl font-bold text-textCustom md:text-lg phone:text-base">
                        Top Features
                    </h1>

                    <div className="flex items-center gap-1">
                        <p
                            className="cursor-pointer select-none font-body text-sm 
                            font-medium text-textCustom transition-all duration-200 
                            hover:text-textCustomProcess"
                        >
                            See All
                        </p>
                        <ArrowRight
                            strokeWidth={2}
                            size={18}
                            className="text-textCustom phone:w-[15px]"
                        />
                    </div>
                </div>

                {/* bottom */}
                <ul className="flex flex-wrap items-center justify-center gap-4">
                    {!loading ? (
                        data?.map((course) => (
                            <li
                                key={course?._id}
                                className="w-[7.9rem] cursor-pointer rounded-lg bg-[#9aabab47] p-2 phone:grow"
                                onClick={() =>
                                    handleRedirect(`/${course?.name.toLowerCase()}?id=1`)
                                }
                            >
                                <img
                                    src={course?.image?.url}
                                    alt={course?.name}
                                    className="mx-auto w-40"
                                />
                                <h2
                                    className="select-none text-center font-body text-sm font-semibold
                                         text-textCustomFeatures phone:text-base"
                                >
                                    {course?.name}
                                </h2>
                            </li>
                        ))
                    ) : (
                        <>
                            {Array.from(new Array(4)).map((_, index) => (
                                <li
                                    className="w-[7.9rem] rounded-lg bg-[#9aabab47] p-2 phone:grow"
                                    key={index}
                                >
                                    <Skeleton variant="rectangular" height={120} />
                                    <Skeleton width="70%" height={10} />
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}

const Features: React.FC = () => {
    const { data, isLoading: getAllCoursesLoading } = useGetAllCoursesQuery();

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media loading={getAllCoursesLoading} data={data?.courses} />
        </Box>
    );
};

export default Features;
