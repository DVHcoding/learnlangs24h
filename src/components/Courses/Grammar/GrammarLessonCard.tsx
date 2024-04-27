// ##################################
// #       IMPORT Components
// ##################################
import { useGetAllUnitLessonsByCourseIdQuery, useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';
import { LessonType, UnitLessonType } from 'types/api-types';

// ##################################
// #       IMPORT Npm
// ##################################
import { Accordion } from 'rsuite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useParams, useSearchParams } from 'react-router-dom';

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

const GrammarLessonCard: React.FC<{ handleToggleLesson: () => void }> = ({ handleToggleLesson }) => {
    //  Get id from url
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
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
        navigate(`/grammar/${id}?id=${unitLessonId}`);
        handleToggleLesson();
    };

    const handleGetProcess = (lessonId: string) => {
        let process = 0;

        if (dataUnitLesson) {
            dataUnitLesson.unitLessons.forEach((unitLesson: UnitLessonType) => {
                if (unitLesson.lesson === lessonId) {
                    process += 1;
                }
            });
        }

        return `0/${process}`;
    };

    const handleGetTotalTime = (lessonId: string) => {
        let totalHours = 0;
        let totalMinutes = 0;
        let totalSeconds = 0;

        if (dataUnitLesson) {
            dataUnitLesson.unitLessons.forEach((unitLesson: UnitLessonType) => {
                if (unitLesson.lesson === lessonId) {
                    const timeParts = unitLesson.time.split(':');
                    const hours = parseInt(timeParts[0]);
                    const minutes = parseInt(timeParts[1]);
                    const seconds = parseInt(timeParts[2]);

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

    return (
        <Accordion>
            {!isLoading &&
                data?.lessons.map((lesson: LessonType) => (
                    <Accordion.Panel
                        header={headerSidebar({
                            title: lesson.name,
                            process: handleGetProcess(lesson._id),
                            totalTime: handleGetTotalTime(lesson._id),
                        })}
                        key={lesson._id}
                    >
                        <ul className="flex flex-col gap-2">
                            {dataUnitLesson &&
                                dataUnitLesson?.unitLessons?.map((unitLesson: UnitLessonType) =>
                                    unitLesson.lesson === lesson._id ? (
                                        <li
                                            className={`flex items-center justify-between 
                                            ${unitLesson._id === unitLessonIdUrl ? 'bg-bgHoverGrayDark' : ''} 
                                            cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-bgHoverGrayDark`}
                                            key={unitLesson._id}
                                            onClick={() => handleRedirect(unitLesson._id)}
                                        >
                                            <div>
                                                <h4 className="mb-2 text-sm font-semibold text-textCustom">{unitLesson.title}</h4>
                                                <div className="flex items-center gap-2">
                                                    {unitLesson.icon === 'videoLecture' ? (
                                                        <PlayCircleFilledIcon className="text-xs text-orange-400" />
                                                    ) : (
                                                        <CreateIcon className="text-xs text-orange-400" />
                                                    )}
                                                    <p className="text-xs text-textCustom">{unitLesson.time}</p>
                                                </div>
                                            </div>

                                            {<CheckCircleIcon className="text-sm text-green-500" />}
                                        </li>
                                    ) : (
                                        ''
                                    )
                                )}
                        </ul>
                    </Accordion.Panel>
                ))}
        </Accordion>
    );
};

export default GrammarLessonCard;
