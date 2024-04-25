// ##################################
// #       IMPORT Components
// ##################################
import {
    useGetAllUnitLessonsByCourseIdQuery,
    useGetAllLessonsByCourseIdQuery,
} from '@store/api/courseApi';
import { LessonType, UnitLessonType } from 'types/api-types';

// ##################################
// #       IMPORT Npm
// ##################################
import { Accordion } from 'rsuite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useParams } from 'react-router-dom';

const headerSidebar: React.FC<{ title: string; process: string; totalTime: string }> = ({
    title,
    process,
    totalTime,
}) => {
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

const GrammarLessonCard: React.FC<{ handleToggleLesson: () => void }> = ({
    handleToggleLesson,
}) => {
    //  Get id from url
    const navigate = useNavigate();
    const { id } = useParams();
    const handleRedirect = (unitLessonId: string) => {
        navigate(`/grammar/${id}?id=${unitLessonId}`);
        handleToggleLesson();
    };

    const { data, isLoading } = useGetAllLessonsByCourseIdQuery(id || '');
    const { data: dataUnitLesson } = useGetAllUnitLessonsByCourseIdQuery(id || '');

    return (
        <Accordion>
            {!isLoading &&
                data?.lessons.map((lesson: LessonType) => (
                    <Accordion.Panel
                        header={headerSidebar({
                            title: lesson.name,
                            process: '20/20',
                            totalTime: '5:00:00',
                        })}
                        key={lesson._id}
                    >
                        <ul className="flex flex-col gap-2">
                            {dataUnitLesson &&
                                dataUnitLesson?.unitLessons?.map((unitLesson: UnitLessonType) =>
                                    unitLesson.lesson === lesson._id ? (
                                        <li
                                            className={`flex items-center justify-between 
                                            ${unitLesson._id === id ? 'bg-bgHoverGrayDark' : ''} 
                                            cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-bgHoverGrayDark`}
                                            key={unitLesson._id}
                                            onClick={() => handleRedirect(unitLesson._id)}
                                        >
                                            <div>
                                                <h4 className="mb-2 text-sm font-semibold text-textCustom">
                                                    {unitLesson.title}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    {unitLesson.icon === 'videoLecture' ? (
                                                        <PlayCircleFilledIcon className="text-xs text-orange-400" />
                                                    ) : (
                                                        <CreateIcon className="text-xs text-orange-400" />
                                                    )}
                                                    <p className="text-xs text-textCustom">
                                                        {unitLesson.time}
                                                    </p>
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
