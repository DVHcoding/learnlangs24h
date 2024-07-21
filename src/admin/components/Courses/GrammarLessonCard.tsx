// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Accordion } from 'rsuite';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
// @ts-ignore
import { LessonsType } from '@types/types';
import GrammarData from '@components/Courses/Grammar/Grammar.json';
import SortableItem from './SortableItem';

const GrammarLessonCard: React.FC = () => {
    const [items, setItems] = useState(GrammarData.lessons.map((lesson: LessonsType) => lesson));
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <>
            <Accordion>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        {items.map((lesson: LessonsType) => (
                            <SortableItem key={lesson.id} lesson={lesson} />
                        ))}
                    </SortableContext>
                </DndContext>
            </Accordion>
        </>
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        console.log('Drag end');
    }
};

export default GrammarLessonCard;
