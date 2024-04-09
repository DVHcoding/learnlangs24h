export interface UserType {
    name: string;
    email: string;
    photo: string;
    roles: string;
    _id: string;
}

export interface LessonsType {
    id: number;
    title: string;
    process: string;
    totalTime: string;
    lessonItems: LessonItemsType[];
}
export interface LessonItemsType {
    id: string;
    title: string;
    time: string;
    icon: string;
    lessonCategory: string;
    dateCreated: string;
}

export interface LectureVideoType {
    lessonId: string;
    videoUrl: string;
}

export interface BlankQuestionType {
    lessonId: string;
}

export interface Question {
    sentence: string;
    correctAnswers: string[];
    otherAnswers?: string[];
}
