// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useState } from 'react';
import { IoIosHelpCircle } from 'react-icons/io';
import { ChevronsLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import loadable from '@loadable/component';
import { Breadcrumb } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Alert } from 'antd';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { MdOutlineTranslate } from 'react-icons/md';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const ListeningLessonCard = loadable(() => import('@components/Courses/Listening/ListeningLessonCard'));
import Flashcard from '@components/Courses/Listening/FlashCard';
import { useGetUnitLessonByIdQuery, useGetUserProcessStatusesQuery } from '@store/api/courseApi';
import { useUserDetailsQuery } from '@store/api/userApi';

// #########################################################################
const Listening: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { id: courseId } = useParams<{ id: string }>();
    let id = searchParams.get('id');

    const { data: userDetailsData } = useUserDetailsQuery();
    const { data: unitLessonData } = useGetUnitLessonByIdQuery(id, { skip: !id });
    const userId = userDetailsData?.user?._id ?? 'undefined';
    const { data: userProcessStatusData, isLoading: userProcessStatusLoading } = useGetUserProcessStatusesQuery(userId, { skip: !userId });

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState<boolean>(false);
    const [activeCard, setActiveCard] = useState<number>(1);
    const [direction, setDirection] = useState<number>(1);

    const flashArrays = [
        {
            frontContent: 'Clever',
            backContent: 'Thông minh',
        },
        {
            frontContent: 'Friendly',
            backContent: 'Thân thiện',
        },
    ];

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleToggleLesson = (): void => {
        setOpen(!open);
    };

    const handlePrevCard = () => {
        setActiveCard((prev) => {
            if (prev - 1 <= 0) {
                return 1;
            }
            return prev - 1;
        });

        setDirection(-1);
    };

    const handleNextCard = () => {
        setActiveCard((prev) => {
            if (prev + 1 >= flashArrays.length) {
                return flashArrays.length;
            }
            return prev + 1;
        });

        setDirection(1);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="overflow-hidden pl-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumb */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to={`/listening/${courseId}`}>Listening</Link>,
                        },
                        {
                            title: unitLessonData?.unitLesson?.title,
                        },
                    ]}
                />

                <button aria-label="expandButton" onClick={handleToggleLesson} className="rounded-md bg-bgHoverGrayDark p-[4px] lg:hidden">
                    <ChevronsLeft
                        className={`text-textCustom ${open ? 'rotate-[-180deg]' : 'rotate-0'} transition-all duration-300`}
                        size={20}
                    />
                </button>
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* content */}
                <div
                    className="scrollbar-mess relative h-full w-full overflow-auto 
                    rounded-tl-lg border-l border-t bg-[#f6f7fb]"
                >
                    {/* {unitLessonByIdLoading && <Spin />} */}
                    {/* {!unitLessonByIdLoading && unitLessonData?.success === false ? <Empty /> : ''} */}
                    <Alert
                        message="Các bạn cần học thuộc các từ vựng này để có thể nghe được bài học tiếp theo. Khi kiểm tra thành công, bài tiếp theo sẽ tự động mở!"
                        banner
                        className="bg-bgCustomProcess text-textCustom"
                    />

                    <ul className="grid grid-cols-3 gap-2 overflow-hidden p-2">
                        <li
                            className="cursor-pointer select-none rounded-md bg-white p-3 text-center 
                            font-segoe text-base transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaEdit size={20} color="#16a815" />
                                <p className="text-lg">Viết</p>
                            </div>
                        </li>

                        <li
                            className="cursor-pointer select-none rounded-md bg-white p-3 text-center 
                            font-segoe text-base transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <MdOutlineTranslate size={20} color="#16a815" />
                                <p className="text-lg">Dịch cả câu</p>
                            </div>
                        </li>

                        <li
                            className="cursor-pointer select-none rounded-md bg-white p-3 text-center 
                            font-segoe text-base transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <RiQuestionAnswerFill size={20} color="#16a815" />
                                <p className="text-lg">Kiểm tra</p>
                            </div>
                        </li>

                        <li className="col-span-3">
                            {flashArrays.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`${index + 1 === activeCard ? '' : 'hidden'}`}
                                    animate={{
                                        opacity: index + 1 === activeCard ? 1 : 0,
                                        x: index + 1 === activeCard ? 0 : direction === 1 ? '-30%' : '30%',
                                    }}
                                    transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                                >
                                    <Flashcard frontContent={item.frontContent} backContent={item.backContent} />
                                </motion.div>
                            ))}
                        </li>
                    </ul>

                    <div className="flex items-center justify-center gap-4">
                        <div
                            className="cursor-pointer rounded-full bg-white p-2 transition-all 
                            hover:bg-bgHoverGrayDark"
                            onClick={handlePrevCard}
                        >
                            <ArrowLeft size={20} />
                        </div>

                        <h4 className="select-none font-segoe text-base">
                            {activeCard}/{flashArrays.length}
                        </h4>

                        <div
                            className="cursor-pointer rounded-full bg-white p-2 transition-all 
                            hover:bg-bgHoverGrayDark"
                            onClick={handleNextCard}
                        >
                            <ArrowRight size={20} />
                        </div>
                    </div>

                    <div
                        className="sticky bottom-2 ml-auto mr-2 flex max-w-max cursor-pointer items-center 
                        gap-2 rounded-lg bg-slate-100 p-2 shadow-md"
                    >
                        <IoIosHelpCircle className="text-orange-400" size={20} />
                        <p className="text-title select-none text-nowrap font-bold">Hỏi đáp</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div
                    className={`min-w-[17rem] border lg:static ${
                        open
                            ? 'sm:w-[50%] sm:translate-x-0 md:w-[35%] md:translate-x-0 phone:w-[80%]'
                            : 'sm:w-0 sm:translate-x-[100%] md:w-0 md:translate-x-[100%]'
                    } 
                                scrollbar overflow-y-auto bg-bgCustom transition-all duration-300 sm:fixed sm:right-0 sm:top-24  
                                sm:h-[85%] sm:rounded-md md:fixed md:right-0 md:top-24 md:h-[85%] lg:block lg:max-w-full lg:translate-x-0 xl:h-full`}
                >
                    <div className="scrollbar h-full w-full overflow-auto ">
                        <ListeningLessonCard
                            handleToggleLesson={handleToggleLesson}
                            userProcessStatusData={userProcessStatusData}
                            userProcessStatusLoading={userProcessStatusLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listening;
