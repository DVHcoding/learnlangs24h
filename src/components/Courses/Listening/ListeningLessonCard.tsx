// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Accordion } from 'rsuite';
import { FaCheckCircle, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetAllUnitLessonsByCourseIdQuery, useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';
import { LessonType, UnitLessonStatus, UnitLessonType } from 'types/api-types';
import { ListeningLessonCardProps } from '@components/Courses/Listening/Listening.types';
import headerSidebar from '@components/Shared/HeaderSidebar.courses';
import RenderIcon from '@components/Shared/RenderIcon.courses';

const ListeningLessonCard: React.FC<ListeningLessonCardProps> = ({ handleToggleLesson, userProcessStatusData }) => {
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    //  Get id from url
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { id } = useParams<{ id: string }>();
    const unitLessonIdUrl = searchParams.get('id');

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: lessonsData } = useGetAllLessonsByCourseIdQuery(id, { skip: !id });
    const { data: unitLessonsData } = useGetAllUnitLessonsByCourseIdQuery(id, { skip: !id });

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleRedirect = (unitLessonId: string) => {
        // # Chỉ những unitLesson nào unlock hoặc completed thì mới click được
        const isUnitLessonUnlocked = userProcessStatusData?.unitLessonStatus?.find(
            (status: UnitLessonStatus) => status.unitLessonId._id === unitLessonId
        );

        if (isUnitLessonUnlocked) {
            navigate(`/listening/${id}?id=${unitLessonId}`);
            handleToggleLesson(); // sử dụng cái này dành cho màn hình nhỏ. Khi chuyển bài thì phải đóng sidebar lại
        }
    };

    const handleGetProcess = (lessonId: string) => {
        let process: number = 0;
        let completed: number = 0;

        // Sử dụng reduce để tính số liệu
        unitLessonsData?.unitLessons?.reduce((accumulator: number, unitLesson: UnitLessonType) => {
            if (unitLesson.lesson === lessonId) {
                process++;

                // Kiểm tra xem unitLesson có được hoàn thành không
                const isCompleted = userProcessStatusData?.unitLessonStatus?.some(
                    (status: UnitLessonStatus) => status.unitLessonId._id === unitLesson._id && status.status === 'completed'
                );

                if (isCompleted) {
                    completed++;
                }
            }

            return accumulator; // Không cần trả về gì từ reduce
        }, 0);

        return `${completed}/${process}`;
    };

    const handleGetTotalTime = (lessonId: string) => {
        let totalHours = 0;
        let totalMinutes = 0;
        let totalSeconds = 0;

        // Sử dụng reduce để tính tổng thời gian
        unitLessonsData?.unitLessons?.reduce((accumulator: number, unitLesson: UnitLessonType) => {
            if (unitLesson.lesson === lessonId) {
                const timeParts = unitLesson.time.split(':');
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                const seconds = parseInt(timeParts[2]);

                totalHours += hours;
                totalMinutes += minutes;
                totalSeconds += seconds;
            }

            return accumulator; // Không cần trả về gì từ reduce
        }, 0);

        // Chuyển đổi phút và giây thành giờ nếu cần
        totalMinutes += Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;

        return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds
            .toString()
            .padStart(2, '0')}`;

        /**
         * totalHours.toString().padStart(2, '0'):
         * - Đây là cách chuyển đổi số giờ thành chuỗi và đảm bảo rằng chuỗi này luôn có ít nhất 2 ký tự.
         * -.toString(): Chuyển đổi số giờ (totalHours) thành chuỗi.
         * -.padStart(2, '0'): Nếu chuỗi có ít hơn 2 ký tự, thêm các ký tự '0' vào đầu chuỗi cho đến khi có đủ 2 ký tự.
         *
         * - Đây là ký tự ngăn cách giữa giờ, phút và giây trong định dạng thời gian HH:mm:ss.
         * totalMinutes.toString().padStart(2, '0'):
         *
         * - Tương tự như trên, đây là cách chuyển đổi số phút thành chuỗi và đảm bảo chuỗi này luôn có ít nhất 2 ký tự.
         * totalSeconds.toString().padStart(2, '0'):
         *
         * - Cũng tương tự như trên, đây là cách chuyển đổi số giây thành chuỗi và đảm bảo chuỗi này luôn có ít nhất 2 ký tự.
         * ****: Dấu `` là một phần của cú pháp "template literals" trong JavaScript, cho phép chèn biến vào trong chuỗi một cách dễ đọc và dễ hiểu.
         * Trong trường hợp này, nó cho phép chèn các giá trị của totalHours, totalMinutes, và totalSeconds vào trong chuỗi một cách dễ dàng.
         */
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        if (lessonsData?.success === false) {
            navigate('/notfound');
        }
    }, [lessonsData?.success]);

    return (
        <Accordion>
            {lessonsData?.lessons?.map((lesson: LessonType) => (
                <Accordion.Panel
                    header={headerSidebar({
                        title: lesson.name,
                        process: handleGetProcess(lesson._id),
                        totalTime: handleGetTotalTime(lesson._id),
                    })}
                    key={lesson._id}
                >
                    <ul className="flex flex-col gap-2">
                        {unitLessonsData?.unitLessons?.map((unitLesson: UnitLessonType) => {
                            ////////////////////////////////////////////////////////////////////////////
                            // Lấy các unitLesson sao cho đúng với từng lesson tương ứng
                            if (unitLesson.lesson !== lesson._id) return null;

                            // Kiểm tra xem unitLesson ở trạng thái nào (completed || unlock)
                            const isCompletedOrUnlocked = userProcessStatusData?.unitLessonStatus?.some(
                                (status: UnitLessonStatus) =>
                                    status.unitLessonId._id === unitLesson._id &&
                                    (status.status === 'completed' || status.status === 'unlock')
                            );

                            // Khóa học đã unlock thì khi hover vào sẽ là pointer. Ngược lại sẽ là default
                            const isClickable = isCompletedOrUnlocked ? 'cursor-pointer' : 'cursor-default bg-bgHoverGrayDark';
                            ////////////////////////////////////////////////////////////////////////////

                            return (
                                <li
                                    key={unitLesson._id}
                                    className={`flex items-center justify-between rounded-lg p-2 transition-all duration-300 hover:bg-bgHoverGrayDark 
                                        ${unitLesson._id === unitLessonIdUrl ? 'bg-bgHoverGrayDark' : ''}
                                        ${isClickable}`}
                                    onClick={() => handleRedirect(unitLesson._id)}
                                >
                                    {/* Phần xử lý icon */}
                                    <div>
                                        <h4 className="mb-2 font-sans text-sm font-normal text-textCustom">{unitLesson.title}</h4>
                                        <div className="flex items-center gap-2">
                                            {RenderIcon(unitLesson?.icon)}
                                            <p className="font-sans text-xs font-normal text-textCustom">{unitLesson.time}</p>
                                        </div>
                                    </div>

                                    {(() => {
                                        // kiểm tra xem tài khoản user đã hoàn thành unitLesson đó chưa
                                        const isCompleted = userProcessStatusData?.unitLessonStatus?.some(
                                            (status: UnitLessonStatus) =>
                                                status.unitLessonId._id === unitLesson._id && status.status === 'completed'
                                        );

                                        if (isCompleted) {
                                            return <FaCheckCircle className="text-xs text-green-500" />;
                                        } else if (!isCompletedOrUnlocked) {
                                            return <FaLock className="text-xs text-gray-400" />;
                                        }

                                        return null;
                                    })()}
                                </li>
                            );
                        })}
                    </ul>
                </Accordion.Panel>
            ))}
        </Accordion>
    );
};

export default ListeningLessonCard;
