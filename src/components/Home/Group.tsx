// ##################################
// #       IMPORT Npm
// ##################################
import { Avatar, AvatarGroup, Carousel } from 'rsuite';
import Skeleton from '@mui/material/Skeleton';

type Member = {
    avatar: string;
    name: string;
};

type Group = {
    nameGroup: string;
    members: Member[];
};

type User = {
    avatar: string;
    name: string;
};

interface MediaProps {
    loading?: boolean;
}

function Media(props: MediaProps) {
    const { loading = false } = props;

    const data: Group[] = [
        {
            nameGroup: 'Learn Everyday',
            members: [
                {
                    avatar: 'https://avatars.githubusercontent.com/u/12592949',
                    name: 'superman66',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/12592949',
                    name: 'SavenOutman',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/15609339',
                    name: 'hiyanguo',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/14308293',
                    name: 'MarvelSQ',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/1203827',
                    name: 'shimoguo',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/9625224',
                    name: 'theJian',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/15884443',
                    name: 'LeightonYao',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/10924138',
                    name: 'zmhawk',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/2797600',
                    name: 'posebear1990',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/23637144',
                    name: 'Sleaf',
                },
            ],
        },
        {
            nameGroup: 'Nhóm chia sẻ tài liệu tiếng anh',
            members: [
                {
                    avatar: 'https://avatars.githubusercontent.com/u/12592949',
                    name: 'superman66',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/12592949',
                    name: 'SavenOutman',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/15609339',
                    name: 'hiyanguo',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/14308293',
                    name: 'MarvelSQ',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/1203827',
                    name: 'shimoguo',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/9625224',
                    name: 'theJian',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/15884443',
                    name: 'LeightonYao',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/10924138',
                    name: 'zmhawk',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/2797600',
                    name: 'posebear1990',
                },
                {
                    avatar: 'https://avatars.githubusercontent.com/u/23637144',
                    name: 'Sleaf',
                },
            ],
        },
    ];

    const max = 5;

    return (
        <div
            className="flex max-h-max items-start justify-between gap-4 sm:w-full
            sm:flex-col md:w-full md:flex-row md:pb-5 lg:w-[50%] lg:flex-col"
        >
            <div className="mx-auto w-full">
                <h2
                    className="mb-4 max-w-max text-start font-body text-base
                   font-bold text-textCustom phone:mb-1"
                >
                    Group chat
                </h2>

                <ul className="flex flex-col justify-center gap-2 sm:mx-auto sm:flex-row sm:flex-wrap">
                    {(loading ? Array.from(new Array(2)) : data).map((item, index) => (
                        <li className="rounded-lg bg-bgCustomGroup p-2 shadow" key={index}>
                            {item ? (
                                <>
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                                        <AvatarGroup stack size="sm">
                                            {item.members
                                                .filter((_user: User, i: number) => i < max)
                                                .map((user: User) => (
                                                    <Avatar
                                                        circle
                                                        key={user.name}
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        style={{ width: 30, height: 30 }}
                                                    />
                                                ))}
                                            <Avatar
                                                circle
                                                style={{
                                                    background: '#111',
                                                    width: 30,
                                                    height: 30,
                                                    userSelect: 'none',
                                                }}
                                                size="sm"
                                            >
                                                +{item.members.length - max}
                                            </Avatar>
                                        </AvatarGroup>

                                        <button
                                            className="border-borderCustom rounded-md border-2 p-1 font-body font-semibold
                                            text-textCustom transition-all duration-300 hover:bg-bgCustomProcess"
                                        >
                                            Join Now
                                        </button>
                                    </div>

                                    <div>
                                        <p className="font-title font-medium text-textCustom">{item.nameGroup}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="mb-1 flex items-center gap-2">
                                            <Skeleton variant="circular" width={30} height={30} />
                                            <Skeleton variant="circular" width={30} height={30} />
                                            <Skeleton variant="circular" width={30} height={30} />
                                            <Skeleton variant="circular" width={30} height={30} />
                                        </div>

                                        <div>
                                            <Skeleton width={60} height={40} />
                                        </div>
                                    </div>

                                    <div>
                                        <Skeleton width={'100%'} />
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mx-auto sm:w-[60%] phone:w-full pm:w-full">
                <h2
                    className="mb-4 max-w-max font-body text-base font-bold
                     text-textCustom phone:mb-2"
                >
                    New Books
                </h2>

                <ul className="mt-1 w-full rounded-lg xl:mt-5">
                    <Carousel
                        className="mx-auto rounded-lg bg-[#9aabab47] md:h-[17rem] lg:h-[8.6rem] phone:h-full 
                        phone:w-full pm:h-full pm:w-[15rem]"
                        shape="bar"
                        autoplay={true}
                        autoplayInterval={5000}
                    >
                        <img
                            src="https://m.media-amazon.com/images/I/51a+XisfDsL._AC_UF1000,1000_QL80_.jpg"
                            className="object-contain sm:object-cover"
                            alt="books"
                        />

                        <img
                            src="https://online.pubhtml5.com/ulgj/wnif/files/large/1.jpg?1601886053"
                            className="object-contain sm:object-cover"
                            alt="book"
                        />

                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJoPvA--FFhfnfwl6mGC2S97La3YQMARhB6Q&usqp=CAU"
                            className="object-contain sm:object-cover"
                            alt="book"
                        />
                        <img
                            src="https://sachtienganhhanoi.com/wp-content/uploads/2020/03/Pages-from-Pages-from-Grammar_and_Vocabulary_Practice_B1-scaled.jpg"
                            className="object-contain sm:object-cover"
                            alt="book"
                        />
                    </Carousel>
                </ul>
            </div>
        </div>
    );
}

const Group: React.FC<{ loading: boolean }> = ({ loading }) => {
    return <Media loading={loading} />;
};

export default Group;
