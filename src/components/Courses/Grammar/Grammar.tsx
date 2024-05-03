import React, { useEffect, useState } from 'react';
// ##################################
// #       IMPORT Npm
// ##################################
import HelpIcon from '@mui/icons-material/Help';
import { ChevronsLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import loadable from '@loadable/component';
import { Spin } from 'antd';
import { Breadcrumb } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// ##################################
// #       IMPORT Components
// ##################################
const Sidebar = loadable(() => import('@pages/Sidebar/Sidebar'), {
    fallback: <Spin className="max-w-max translate-x-[50%] translate-y-[50%]" />,
});
const Navbar = loadable(() => import('@pages/Header/Navbar'));
const VideoLectureCard = loadable(() => import('./VideoLectureCard'));
const GrammarLessonCard = loadable(() => import('./GrammarLessonCard'));
const FillBlankExerciseCard = loadable(() => import('./FillBlankExerciseCard'));
import { useGetAllUnitLessonsByCourseIdQuery, useGetUnitLessonByIdQuery, useGetUserProcessStatusesQuery } from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';
import { AppDispatch } from '@store/store';
import { createNewUserProcessStatus } from '@store/reducer/courseReducer';
import { toastError } from '@components/Toast/Toasts';

// #########################################################################
const Grammar: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { id: courseId } = useParams();
    let id = searchParams.get('id');

    const { data: userDetailsData, isLoading: userDetailsLoading } = useUserDetailsQuery();
    const { data: allUnitLessonData, isLoading: allUnitLessonLoading } = useGetAllUnitLessonsByCourseIdQuery(courseId || 'undefined');
    const { data: unitLessonData, isLoading: unitLessonByIdLoading } = useGetUnitLessonByIdQuery(id || 'undefined');
    const userId = userDetailsData?.user?._id ?? 'undefined';
    const {
        data: userProcessStatusData,
        isLoading: userProcessStatusLoading,
        refetch: userProcessRefetch,
    } = useGetUserProcessStatusesQuery(userId);

    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################
    const [open, setOpen] = useState<boolean>(false);
    const expanded: boolean = window.innerWidth > 390;

    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################
    const handleToggleLesson = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchData = async () => {
            // Nếu vào bài học đầu tiên mà không có id của unitLesson trên URL thì điều hướng
            if (!allUnitLessonLoading && allUnitLessonData?.success && !id) {
                const firstUnitLessonId = allUnitLessonData?.unitLessons[0]._id;

                try {
                    if (!userDetailsLoading && userDetailsData?.user) {
                        const userId = userDetailsData.user._id as string;

                        // kiểm tra xem bài đầu tiên này đã có trong danh sách chưa
                        const { data }: any = await axios.get(
                            `/api/v1/unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${firstUnitLessonId}`
                        );

                        // Chưa có thì thêm vào (unlock bài đầu tiên)
                        if (data.success === false) {
                            await dispatch(createNewUserProcessStatus({ userId, unitLessonId: firstUnitLessonId }));
                        }
                    }

                    return navigate(`?id=${firstUnitLessonId}`);
                } catch (error) {
                    toastError('Có lỗi xảy ra!');
                }
            }

            if (!allUnitLessonLoading && allUnitLessonData?.success && id) {
                try {
                    if (!userDetailsLoading && userDetailsData?.user) {
                        const userId = userDetailsData.user._id as string;

                        // kiểm tra xem bài đầu tiên này đã có trong danh sách chưa
                        const { data }: any = await axios.get(`/api/v1/unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${id}`);

                        // Chưa có thì thêm vào (unlock bài đầu tiên)
                        if (data.success === false) {
                            return navigate('/notfound');
                        }
                    }
                } catch (error) {
                    toastError('Có lỗi xảy ra!');
                }
            }
        };

        fetchData();
    }, [id, navigate, unitLessonData?.success, allUnitLessonData?.success]);

    // ############################################
    return (
        <div
            className="h-screen bg-bgCustom sm:px-0 sm:py-0 md:p-0 
            xl:px-8 xl:py-4 "
        >
            <div className="flex h-full w-full overflow-hidden rounded-md border-2 border-bdCustom sm:rounded-none">
                {/* SIDE-BAR */}
                <Sidebar />

                {/* CONTENT */}
                <div
                    className={`scrollbar w-full overflow-auto bg-bgCustom 
                        ${expanded ? 'phone:z-0' : ''} `}
                >
                    {/* Navbar */}
                    <Navbar toggleTheme={toggleTheme} />

                    <div className="h-[85%] pl-4 phone:p-1 ">
                        <div className="flex justify-between">
                            <Breadcrumb
                                items={[
                                    {
                                        title: <Link to="/">Home</Link>,
                                    },
                                    {
                                        title: <Link to={`/grammar/${courseId}`}>Grammar</Link>,
                                    },
                                    {
                                        title: unitLessonData?.unitLesson?.title,
                                    },
                                ]}
                            />

                            <button
                                aria-label="expandButton"
                                onClick={handleToggleLesson}
                                className="rounded-md bg-bgHoverGrayDark p-[4px] lg:hidden"
                            >
                                <ChevronsLeft
                                    className={`text-textCustom ${open ? 'rotate-[-180deg]' : 'rotate-0'} transition-all duration-300`}
                                    size={20}
                                />
                            </button>
                        </div>

                        <div className="mt-2 flex h-full justify-between ">
                            <div className="scrollbar relative h-full w-full  overflow-auto rounded-lg " style={{ scrollbarWidth: 'none' }}>
                                {!unitLessonByIdLoading &&
                                unitLessonData?.unitLesson &&
                                unitLessonData.unitLesson.lectureType === 'exercise' ? (
                                    <FillBlankExerciseCard
                                        userProcessStatusData={userProcessStatusData}
                                        userProcessStatusLoading={userProcessStatusLoading}
                                        userProcessRefetch={userProcessRefetch}
                                        userId={userId}
                                    />
                                ) : (
                                    ''
                                )}

                                {!unitLessonByIdLoading &&
                                unitLessonData?.unitLesson &&
                                unitLessonData.unitLesson.lectureType === 'videoLecture' ? (
                                    <VideoLectureCard
                                        unitLessonId={unitLessonData.unitLesson._id}
                                        userProcessRefetch={userProcessRefetch}
                                    />
                                ) : (
                                    ''
                                )}

                                {unitLessonByIdLoading && <Spin />}

                                {!unitLessonByIdLoading && unitLessonData?.success === false ? <Empty /> : ''}

                                <div
                                    className="sticky bottom-2 ml-auto mr-2 flex max-w-max cursor-pointer items-center gap-2 rounded-lg
                                    bg-slate-100 p-2 shadow-md"
                                >
                                    <HelpIcon className="text-orange-400" />
                                    <p className="text-title text-nowrap font-bold">Hỏi đáp</p>
                                </div>
                            </div>

                            <div
                                className={`min-w-[17rem] lg:static ${
                                    open
                                        ? 'sm:w-[50%] sm:translate-x-0 md:w-[35%] md:translate-x-0 phone:w-[80%]'
                                        : 'sm:w-0 sm:translate-x-[100%] md:w-0 md:translate-x-[100%]'
                                } 
                                scrollbar overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0 sm:top-24  
                                sm:h-[85%] sm:rounded-md md:fixed md:right-0 md:top-24 md:h-[85%] lg:block lg:max-w-full lg:translate-x-0 xl:h-full`}
                            >
                                <div className="scrollbar h-full w-full overflow-auto ">
                                    <GrammarLessonCard
                                        handleToggleLesson={handleToggleLesson}
                                        userProcessStatusData={userProcessStatusData}
                                        userProcessStatusLoading={userProcessStatusLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grammar;
