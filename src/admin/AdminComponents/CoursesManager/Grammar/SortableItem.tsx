// ##########################
// #      IMPORT NPM        #
// ##########################
import { LessonItemsType, LessonsType } from 'types/types';

// ##########################
// #    IMPORT Components   #
// ##########################
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Accordion } from 'rsuite';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

interface SortableItemProps {
    lesson: LessonsType;
}

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

const SortableItem: React.FC<SortableItemProps> = (props) => {
    // attributes: Thuộc tính này chứa các thuộc tính HTML được sinh ra tự động bởi thư viện DNDKit
    // để hỗ trợ tính năng kéo và thả. Các thuộc tính này bao gồm các thuộc tính như draggable, aria-grabbed

    // listeners: Đây là các sự kiện người nghe được kích hoạt trong quá trình kéo và thả, như onDragStart,
    //onDragMove, onDragEnd, v.v. Các sự kiện này được kích hoạt khi người dùng thực hiện các hành động kéo và thả.

    // setNodeRef: Đây là một hàm được cung cấp bởi hook useSortable từ thư viện DNDKit. Hàm này được sử dụng để gán một
    //tham chiếu tới phần tử DOM mà bạn muốn kích hoạt tính năng kéo và thả
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.lesson.id,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const handleRedirect = (lessonItemIndex: string) => {
        navigate(`/admin/grammar?id=${lessonItemIndex}`);
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-start justify-between">
            <Accordion.Panel
                header={headerSidebar({
                    title: props.lesson.title,
                    process: props.lesson.process,
                    totalTime: props.lesson.totalTime,
                })}
                className="flex-1"
            >
                <ul className="flex flex-col gap-2">
                    {props.lesson.lessonItems.map(
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
                                        <p className="text-xs text-textCustom">{lessonItem.time}</p>
                                    </div>
                                </div>

                                {<CheckCircleIcon className="text-sm text-green-500" />}
                            </li>
                        )
                    )}
                </ul>
            </Accordion.Panel>

            <button
                {...listeners}
                {...attributes}
                className="mt-3 rounded-md bg-[#f1f5f9] px-2 py-4"
            >
                ⣿
            </button>
        </div>
    );
};

export default SortableItem;
