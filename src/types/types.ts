export interface UserType {
    name: string;
    email: string;
    photo: string;
    roles: string;
    _id: string;
}

export interface GetChatByIdResponse {
    success: boolean;
    chatId: string;
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

export interface UserProcessStatus {
    userId: string;
    unitLessonId: string;
    status: 'unlock' | 'completed' | 'lock';
    completedAt?: Date;
}

export interface GetUnitLessonIdByUserProcessResponseType {
    success: boolean;
    userProcessStatus?: UserProcessStatus;
    message?: string;
}

export interface LastMessageStatusType {
    sender: string | undefined;
    seen: boolean | undefined;
}

export interface MessageSocketResponse {
    _id: string;
    chat: string;
    content: string;
    createdAt: Date;
    sender: {
        name: string;
        _id: string;
    };
}

export interface NewMessageSocketResponse {
    chatId: string;
    message: MessageSocketResponse;
    sender: string;
}

export interface SeenMessageSocketResponse {
    chatId: string;
    lastMessage: {
        _id: string;
        sender: string;
        seen: boolean;
    };
}
