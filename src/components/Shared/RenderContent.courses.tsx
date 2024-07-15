import VocaExercise from '@components/Courses/Listening/VocaExercise';
import { Spin } from 'antd';
import { UnitLessonType } from 'types/api-types';

const renderContent = (unitLesson: UnitLessonType | undefined) => {
    switch (unitLesson?.lectureType) {
        case 'vocaExercise':
            return <VocaExercise />;
        default:
            return (
                <div className="">
                    <Spin />
                </div>
            );
    }
};

export default renderContent;
