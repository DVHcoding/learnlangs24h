// ##################################
// #       IMPORT Components
// ##################################
import Grammar from '@assets/backgrounds/Grammar.png';
import Listening from '@assets/backgrounds/Listening.png';
import Reading from '@assets/backgrounds/Reading.png';
import Writing from '@assets/backgrounds/Writing.png';

// ##################################
// #       IMPORT Npm
// ##################################
import { ArrowRight } from 'lucide-react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const data = [
    {
        src: Grammar,
        title: 'Grammar',
    },
    {
        src: Listening,
        title: 'Listening',
    },
    {
        src: Reading,
        title: 'Reading',
    },
    {
        src: Writing,
        title: 'Writing',
    },
];

interface MediaProps {
    loading?: boolean;
}

function Media(props: MediaProps) {
    const { loading = false } = props;

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
                    {(loading ? Array.from(new Array(data.length)) : data).map((item, index) => (
                        <li
                            key={index}
                            className="w-[7.9rem] rounded-lg bg-[#9aabab47] p-2 phone:grow"
                        >
                            {item ? (
                                <>
                                    <img src={item.src} alt="course" className="mx-auto w-40" />
                                    <h2
                                        className="select-none text-center font-body text-sm font-semibold
                                        text-textCustomFeatures phone:text-base"
                                    >
                                        {item.title}
                                    </h2>
                                </>
                            ) : (
                                <>
                                    <Skeleton variant="rectangular" height={120} />
                                    <Skeleton width="70%" height={10} />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

const Features: React.FC<{ loading: boolean }> = ({ loading }) => {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media loading={loading} />
        </Box>
    );
};

export default Features;
