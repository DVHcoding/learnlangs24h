// ##################################
// #       IMPORT Components
// ##################################
import { useGetAllUnitLessonsByCourseIdQuery, useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';
import { LessonType, UnitLessonStatus, UnitLessonType, UserProcessStatusResponse } from 'types/api-types';

// ##################################
// #       IMPORT Npm
// ##################################
import { Accordion } from 'rsuite';
import { PencilLine } from 'lucide-react';
import { FaCheckCircle, FaLock } from 'react-icons/fa';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const headerSidebar: React.FC<{ title: string; process: string; totalTime: string }> = ({ title, process, totalTime }) => {
    return (
        <div>
            <h4 className="font-body text-base font-bold text-textCustom">{title}</h4>

            <div className="flex items-center gap-2">
                <span className="text-xs text-textCustom">{process}</span>
                <p className="mb-[1px] text-xs text-textCustom">|</p>
                <span className="text-xs text-textCustom">{totalTime}</span>
            </div>
        </div>
    );
};

const GrammarLessonCard: React.FC<{
    handleToggleLesson: () => void;
    userProcessStatusData: UserProcessStatusResponse | undefined;
    userProcessStatusLoading: boolean;
}> = ({ handleToggleLesson, userProcessStatusData, userProcessStatusLoading }) => {
    //  Get id from url
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { id } = useParams<{ id: string }>();
    const unitLessonIdUrl = searchParams.get('id');
    const { data, isLoading } = useGetAllLessonsByCourseIdQuery(id || '');
    const { data: dataUnitLesson } = useGetAllUnitLessonsByCourseIdQuery(id || '');

    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################

    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################
    const handleRedirect = (unitLessonId: string) => {
        // # Chỉ những unitLesson nào unlock hoặc completed thì mới click được
        const isUnitLessonUnlocked = userProcessStatusData?.unitLessonStatus?.find(
            (status: UnitLessonStatus) => status.unitLessonId._id === unitLessonId
        );

        if (isUnitLessonUnlocked) {
            navigate(`/grammar/${id}?id=${unitLessonId}`);
            handleToggleLesson(); // sử dụng cái này dành cho màn hình nhỏ. Khi chuyển bài thì phải đóng sidebar lại
        }
    };

    const handleGetProcess = (lessonId: string) => {
        let process: number = 0;
        let completed: number = 0;

        if (dataUnitLesson?.unitLessons) {
            dataUnitLesson?.unitLessons.forEach((unitLesson: UnitLessonType) => {
                if (unitLesson.lesson === lessonId) {
                    process++;

                    // Đếm số unitLesson đã hoàn thành
                    const isCompleted = userProcessStatusData?.unitLessonStatus?.find(
                        (status: UnitLessonStatus) => status.unitLessonId._id === unitLesson._id && status.status === 'completed'
                    );

                    if (isCompleted) {
                        completed++;
                    }
                }
            });
        }

        return `${completed}/${process}`;
    };

    const handleGetTotalTime = (lessonId: string) => {
        let totalHours = 0;
        let totalMinutes = 0;
        let totalSeconds = 0;

        if (dataUnitLesson) {
            // Duyệt qua từng phần tử trong mảng unitLessons
            dataUnitLesson.unitLessons.forEach((unitLesson: UnitLessonType) => {
                // Kiểm tra nếu lesson của unitLesson trùng khớp với lessonId
                if (unitLesson.lesson === lessonId) {
                    // Tách chuỗi thời gian (dạng 'hh:mm:ss') thành mảng các phần tử [hours, minutes, seconds]
                    const timeParts = unitLesson.time.split(':');
                    // Chuyển đổi các phần tử từ chuỗi sang số nguyên
                    const hours = parseInt(timeParts[0]);
                    const minutes = parseInt(timeParts[1]);
                    const seconds = parseInt(timeParts[2]);

                    // Cộng dồn giờ, phút và giây vào tổng số giờ, phút và giây
                    totalHours += hours;
                    totalMinutes += minutes;
                    totalSeconds += seconds;
                }
            });

            // Chuyển đổi phút và giây thành giờ nếu cần
            totalMinutes += Math.floor(totalSeconds / 60);
            totalSeconds %= 60;
            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes %= 60;
        }

        return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds
            .toString()
            .padStart(2, '0')}`;

        /**
         * totalHours.toString().padStart(2, '0'):
         *    - Đây là cách chuyển đổi số giờ thành chuỗi và đảm bảo rằng chuỗi này luôn có ít nhất 2 ký tự.
         *    - .toString(): Chuyển đổi số giờ (totalHours) thành chuỗi.
         *    - .padStart(2, '0'): Nếu chuỗi có ít hơn 2 ký tự, thêm các ký tự '0' vào đầu chuỗi cho đến khi có đủ 2 ký tự.
         * :: Đây là ký tự ngăn cách giữa giờ, phút và giây trong định dạng thời gian HH:mm:ss.
         * totalMinutes.toString().padStart(2, '0'):
         *    - Tương tự như trên, đây là cách chuyển đổi số phút thành chuỗi và đảm bảo chuỗi này luôn có ít nhất 2 ký tự.
         * totalSeconds.toString().padStart(2, '0'):
         *    - Cũng tương tự như trên, đây là cách chuyển đổi số giây thành chuỗi và đảm bảo chuỗi này luôn có ít nhất 2 ký tự.
         * ****: Dấu `` là một phần của cú pháp "template literals" trong JavaScript, cho phép chèn biến vào trong chuỗi một cách dễ đọc và dễ hiểu.
         * Trong trường hợp này, nó cho phép chèn các giá trị của totalHours, totalMinutes, và totalSeconds vào trong chuỗi một cách dễ dàng.
         */
    };

    useEffect(() => {
        if (data?.success === false) {
            navigate('/notfound');
        }
    }, [data?.success]);

    return (
        <Accordion>
            {!isLoading &&
                data?.lessons?.map((lesson: LessonType) => (
                    <Accordion.Panel
                        header={headerSidebar({
                            title: lesson.name,
                            process: handleGetProcess(lesson._id),
                            totalTime: handleGetTotalTime(lesson._id),
                        })}
                        key={lesson._id}
                    >
                        <ul className="flex flex-col gap-2">
                            {dataUnitLesson && !userProcessStatusLoading
                                ? dataUnitLesson?.unitLessons?.map((unitLesson: UnitLessonType) =>
                                      unitLesson.lesson === lesson._id ? (
                                          <li
                                              className={`flex items-center justify-between  
                                              ${unitLesson._id === unitLessonIdUrl ? 'bg-bgHoverGrayDark' : ''}  
                                                ${
                                                    // UnitLesson nào là completed và unlock thì sẽ không có bg là gray
                                                    userProcessStatusData?.unitLessonStatus?.find(
                                                        (status: UnitLessonStatus) =>
                                                            status.unitLessonId._id === unitLesson._id &&
                                                            (status.status === 'completed' || status.status === 'unlock')
                                                    )
                                                        ? 'cursor-pointer'
                                                        : 'cursor-default bg-bgHoverGrayDark'
                                                }
                                              rounded-lg p-2 transition-all duration-300 hover:bg-bgHoverGrayDark`}
                                              key={unitLesson._id}
                                              onClick={() => handleRedirect(unitLesson._id)}
                                          >
                                              <div>
                                                  <h4 className="mb-2 text-sm font-semibold text-textCustom">{unitLesson.title}</h4>
                                                  <div className="flex items-center gap-2">
                                                      {unitLesson.icon === 'videoLecture' ? (
                                                          <IoPlayCircleSharp className="text-sm text-orange-400" />
                                                      ) : (
                                                          <PencilLine className="text-orange-400" size={13} />
                                                      )}
                                                      <p className="text-xs text-textCustom">{unitLesson.time}</p>
                                                  </div>
                                              </div>

                                              {userProcessStatusData?.unitLessonStatus?.find(
                                                  (status: UnitLessonStatus) =>
                                                      status.unitLessonId._id === unitLesson._id && status.status === 'completed'
                                              ) ? (
                                                  <FaCheckCircle className="text-xs text-green-500" />
                                              ) : userProcessStatusData?.unitLessonStatus?.find(
                                                    (status: UnitLessonStatus) =>
                                                        status.unitLessonId._id === unitLesson._id && status.status === 'unlock'
                                                ) ? null : ( // Nếu điều kiện cho LockIcon được đáp ứng, không hiển thị gì cả
                                                  <FaLock className="text-xs text-gray-400" />
                                              )}
                                          </li>
                                      ) : (
                                          ''
                                      )
                                  )
                                : ''}
                        </ul>
                    </Accordion.Panel>
                ))}
        </Accordion>
    );
};

export default GrammarLessonCard;
