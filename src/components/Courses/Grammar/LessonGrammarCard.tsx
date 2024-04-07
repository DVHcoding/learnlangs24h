// ##################################
// #       IMPORT Components
// ##################################
import GrammarData from './Grammar.json';
import { LessonItemsType, LessonsType } from 'types/types';

// ##################################
// #       IMPORT Npm
// ##################################
import { Accordion } from 'rsuite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

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

const LessonGrammarCard: React.FC<{ handleToggleLesson: () => void }> = ({
    handleToggleLesson,
}) => {
    //  Get id from url
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const handleRedirect = (lessonItemIndex: string) => {
        navigate(`/grammar?id=${lessonItemIndex}`);
        handleToggleLesson();
    };

    return (
        <Accordion>
            {GrammarData.lessons.map((lesson: LessonsType, lessonIndex: number) => (
                <Accordion.Panel
                    header={headerSidebar({
                        title: lesson.title,
                        process: lesson.process,
                        totalTime: lesson.totalTime,
                    })}
                    key={lessonIndex}
                >
                    <ul className="flex flex-col gap-2">
                        {lesson.lessonItems.map(
                            (lessonItem: LessonItemsType, lessonItemIndex: number) => (
                                <li
                                    className={`flex items-center justify-between 
                                    ${lessonItem.id === id ? 'bg-bgHoverGrayDark' : ''} 
                                    cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-bgHoverGrayDark`}
                                    key={lessonItemIndex}
                                    onClick={() => handleRedirect(lessonItem.id)}
                                >
                                    <div>
                                        <h4 className="mb-2 text-sm font-semibold text-textCustom">
                                            {lessonItem.title}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            {lessonItem.icon === 'PlayCircleFilledIcon' ? (
                                                <PlayCircleFilledIcon className="text-xs text-orange-400" />
                                            ) : (
                                                <CreateIcon className="text-xs text-orange-400" />
                                            )}
                                            <p className="text-xs text-textCustom">
                                                {lessonItem.time}
                                            </p>
                                        </div>
                                    </div>

                                    {<CheckCircleIcon className="text-sm text-green-500" />}
                                </li>
                            )
                        )}
                    </ul>
                </Accordion.Panel>
            ))}
        </Accordion>
    );
};

export default LessonGrammarCard;
