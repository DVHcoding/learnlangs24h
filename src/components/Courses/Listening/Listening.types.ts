import { UserProcessStatusResponse } from 'types/api-types';

export interface HeaderSidebarProps {
    title: string;
    process: string;
    totalTime: string;
}

export interface ListeningLessonCardProps {
    handleToggleLesson: () => void;
    userProcessStatusData: UserProcessStatusResponse | undefined;
}
