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

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const ListeningLessonCard = loadable(() => import('@components/Courses/Listening/ListeningLessonCard'));
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

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleToggleLesson = () => {
        setOpen(!open);
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
                    rounded-tl-lg border-l border-t"
                >
                    {/* {unitLessonByIdLoading && <Spin />} */}

                    {/* {!unitLessonByIdLoading && unitLessonData?.success === false ? <Empty /> : ''} */}

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum accusantium obcaecati facere maxime commodi. Quidem
                        in molestiae at hic, excepturi a sed consequatur ut eos, et sapiente. Placeat, eius aut Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Delectus dolorem alias maiores sequi, quisquam, unde eos magni vero officiis eum
                        dolore ea omnis dicta optio autem a facere quod fugit.! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur, ratione nam quibusdam vero optio eius assumenda dignissimos, alias adipisci officia hic et ipsa?
                        Asperiores, rerum hic dignissimos libero illo odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                        quidem accusantium ratione, ullam enim pariatur officia! Quod, est? Voluptate, explicabo nam laboriosam facere quasi
                        nostrum sit quos porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                        eveniet incidunt repudiandae nulla ad culpa libero placeat in possimus iusto. Quasi aperiam dolorem ad aliquid vero
                        nesciunt harum. Temporibus, aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus veniam
                        placeat dolores eum architecto ipsa odit quos possimus. Provident voluptates ducimus, minus nobis ipsam fugiat simi
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum accusantium obcaecati facere maxime commodi. Quidem i
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum accusantium obcaecati facere maxime commodi. Quidem
                        in molestiae at hic, excepturi a sed consequatur ut eos, et sapiente. Placeat, eius aut Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Delectus dolorem alias maiores sequi, quisquam, unde eos magni vero officiis eum
                        dolore ea omnis dicta optio autem a facere quod fugit.! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur, ratione nam quibusdam vero optio eius assumenda dignissimos, alias adipisci officia hic et ipsa?
                        Asperiores, rerum hic dignissimos libero illo odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                        quidem accusantium ratione, ullam enim pariatur officia! Quod, est? Voluptate, explicabo nam laboriosam facere quasi
                        nostrum sit quos porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                        eveniet incidunt repudiandae nulla ad culpa libero placeat in possimus iusto. Quasi aperiam dolorem ad aliquid vero
                        nesciunt harum. Temporibus, aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus veniam
                        placeat dolores eum architecto ipsa odit quos possimus. Provident voluptates ducimus, minus nobis ipsam fugiat
                        similique aperiam! Cumque, dolore?n molestiae at hic, excepturi a sed consequatur ut eos, et sapiente. Placeat, eius
                        aut Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorem alias maiores sequi, quisquam, unde
                        eos magni vero officiis eum dolore ea omnis dicta optio autem a facere quod fugit.! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Aspernatur, ratione nam quibusdam vero optio eius assumenda dignissimos, alias
                        adipisci officia hic et ipsa? Asperiores, rerum hic dignissimos libero illo odit! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Vero quidem accusantium ratione, ullam enim pariatur officia! Quod, est? Voluptate,
                        explicabo nam laboriosam facere quasi nostrum sit quos porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Facere eveniet incidunt repudiandae nulla ad culpa libero placeat in possimus iusto.
                        Quasi aperiam dolorem ad aliquid vero nesciunt harum. Temporibus, aut. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Deserunt temporibus veniam placeat dolores eum architecto ipsa odit quos possimus. Provident
                        voluptates ducimus, minus nobis ipsam fugiat similique aperiam! Cumque, dolore?lique aperiam! Cumque, dolore? Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Illum accusantium obcaecati facere maxime commodi. Quidem in
                        molestiae at hic, excepturi a sed consequatur ut eos, et sapiente. Placeat, eius aut Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Delectus dolorem alias maiores sequi, quisquam, unde eos magni vero officiis eum
                        dolore ea omnis dicta optio autem a facere quod fugit.! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur, ratione nam quibusdam vero optio eius assumenda dignissimos, alias adipisci officia hic et ipsa?
                        Asperiores, rerum hic dignissimos libero illo odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                        quidem accusantium ratione, ullam enim pariatur officia! Quod, est? Voluptate, explicabo nam laboriosam facere quasi
                        nostrum sit quos porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                        eveniet incidunt repudiandae nulla ad culpa libero placeat in possimus iusto. Quasi aperiam dolorem ad aliquid vero
                        nesciunt harum. Temporibus, aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus veniam
                        placeat dolores eum architecto ipsa odit quos possimus. Provident voluptates ducimus, minus nobis ipsam fugiat
                        similique aperiam! Cumque, dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum accusantium
                        obcaecati facere maxime commodi. Quidem in molestiae at hic, excepturi a sed consequatur ut eos, et sapiente.
                        Placeat, eius aut Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorem alias maiores sequi,
                        quisquam, unde eos magni vero officiis eum dolore ea omnis dicta optio autem a facere quod fugit.! Lorem ipsum dolor
                        sit amet consectetur adipisicing elit. Aspernatur, ratione nam quibusdam vero optio eius assumenda dignissimos,
                        alias adipisci officia hic et ipsa? Asperiores, rerum hic dignissimos libero illo odit! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Vero quidem accusantium ratione, ullam enim pariatur officia! Quod, est? Voluptate,
                        explicabo nam laboriosam facere quasi nostrum sit quos porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Facere eveniet incidunt repudiandae nulla ad culpa libero placeat in possimus iusto.
                        Quasi aperiam dolorem ad aliquid vero nesciunt harum. Temporibus, aut. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Deserunt temporibus veniam placeat dolores eum architecto ipsa odit quos possimus. Provident
                        voluptates ducimus, minus nobis ipsam fugiat similique aperiam! Cumque, dolore? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Illum accusantium obcaecati facere maxime commodi. Quidem in molestiae at hic,
                        excepturi a sed consequatur ut eos, et sapiente. Placeat, eius aut Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. Delectus dolorem alias maiores sequi, quisquam, unde eos magni vero officiis eum dolore ea omnis
                        dicta optio autem a facere quod fugit.! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, ratione
                        nam quibusdam vero optio eius assumenda dignissimos, alias adipisci officia hic et ipsa? Asperiores, rerum hic
                        dignissimos libero illo odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quidem accusantium
                        ratione, ullam enim pariatur officia! Quod, est? Voluptate, explicabo nam laboriosam facere quasi nostrum sit quos
                        porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eveniet incidunt
                        repudiandae nulla ad culpa libero placeat in possimus iusto. Quasi aperiam dolorem ad aliquid vero nesciunt harum.
                        Temporibus, aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus veniam placeat dolores
                        eum architecto ipsa odit quos possimus. Provident voluptates ducimus, minus nobis ipsam fugiat similique aperiam!
                        commodi. Quidem in molestiae at hic, excepturi a sed consequatur ut eos, et sapiente. Placeat, eius aut Lorem, ipsum
                        dolor sit amet consectetur adipisicing elit. Delectus dolorem alias maiores sequi, quisquam, unde eos magni vero
                        Cumque, dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum accusantium obcaecati facere maxime
                        officiis eum dolore ea omnis dicta optio autem a facere quod fugit.! Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Aspernatur, ratione nam quibusdam vero optio eius assumenda dignissimos, alias adipisci officia
                        hic et ipsa? Asperiores, rerum hic dignissimos libero illo odit! Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Vero quidem accusantium ratione, ullam enim pariatur officia! Quod, est? Voluptate, explicabo nam laboriosam
                        facere quasi nostrum sit quos porro deleniti dicta!Loremlorem Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere eveniet incidunt repudiandae nulla ad culpa libero placeat in possimus iusto. Quasi aperiam dolorem ad
                        aliquid vero nesciunt harum. Temporibus, aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
                        temporibus veniam placeat dolores eum architecto ipsa odit quos possimus. Provident voluptates ducimus, minus nobis
                        ipsam fugiat similique aperiam! Cumque, dolore?
                    </p>

                    <div
                        className="sticky bottom-2 ml-auto mr-2 flex max-w-max cursor-pointer items-center 
                        gap-2 rounded-lg bg-slate-100 p-2 shadow-md"
                    >
                        <IoIosHelpCircle className="text-orange-400" size={20} />
                        <p className="text-title text-nowrap font-bold">Hỏi đáp</p>
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
