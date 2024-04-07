// ##################################
// #       IMPORT Npm
// ##################################
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Avatar } from 'rsuite';
import { ArrowRight } from 'lucide-react';

type DataType = {
    avatar: string;
    name: string;
    description: string;
    active: string;
};

const data: DataType[] = [
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/12592949',
        name: 'Quoc dung',
        description: 'Got 126 hours in a month',
        active: '2 min ago',
    },
];

interface MediaProps {
    loading?: boolean;
}

function Media(props: MediaProps) {
    const { loading = false } = props;

    return (
        <>
            {/* top */}
            <div className="mb-4 flex items-center justify-between">
                <h1 className="font-title text-xl font-bold text-textCustom md:text-lg phone:text-base">
                    Top Users
                </h1>

                <div className="flex items-center gap-1 ">
                    <p
                        className="cursor-pointer select-none font-body text-sm 
                                        font-medium text-textCustom transition-all 
                                        duration-200 hover:text-textCustomProcess"
                    >
                        See All
                    </p>
                    <ArrowRight strokeWidth={2} size={18} className="text-textCustom" />
                </div>
            </div>

            {/* bottom */}
            <div className="relative">
                <ul
                    className="scrollbar flex h-80 flex-col gap-4 overflow-auto sm:h-auto sm:pr-0 md:pr-2 
                    xl:h-[22rem] phone:h-auto phone:pr-0"
                >
                    {(loading ? Array.from(new Array(6)) : data).map((item: DataType, index) => (
                        <li
                            className="flex items-end justify-between sm:gap-2 lg:gap-2 phone:gap-2"
                            key={index}
                        >
                            {item ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <Avatar
                                                size="sm"
                                                className="cursor-pointer"
                                                circle
                                                src={item.avatar}
                                                alt="@superman66"
                                            />
                                        </div>

                                        <div>
                                            <h5 className="font-body text-sm font-bold text-textCustomName">
                                                {item.name}
                                            </h5>
                                            <p className="font-body text-[12px] font-bold text-textCustomGray phone:text-xs">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-body text-xs font-semibold text-textCustomGray">
                                        {item.active}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="rounded-lg bg-bgCustomGroup p-1">
                                        <div className="flex items-center gap-3">
                                            <Skeleton variant="circular" width={40} height={40} />
                                            <div>
                                                <Skeleton width={200} height={20} />
                                                <Skeleton width={200} height={8} />
                                                <Skeleton width={200} height={8} />
                                            </div>
                                        </div>
                                        <p className="font-body font-bold text-textCustomGray md:text-xs lg:text-sm"></p>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bgCustom"></div>
            </div>
        </>
    );
}

const TopUser: React.FC<{ loading: boolean }> = ({ loading }) => {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media loading={loading} />
        </Box>
    );
};

export default TopUser;
