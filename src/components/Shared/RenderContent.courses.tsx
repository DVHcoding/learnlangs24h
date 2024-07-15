import VocaExercise from '@components/Courses/Listening/VocaExercise';
import { Spin } from 'antd';
import { UnitLessonType } from 'types/api-types';

const renderContent = (unitLesson: UnitLessonType | undefined) => {
    switch (unitLesson?.lectureType) {
        case 'vocaExercise':
            return <VocaExercise />;
        default:
            return (
                <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
                    <Spin />
                </div>
            );
    }
};

export default renderContent;
