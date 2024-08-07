import { Attachments } from './chatApi-types';

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

export interface GetUnitLessonIdByUserProcessPayload {
    userId: string | undefined;
    unitLessonId: string | undefined;
}

export interface LastMessageStatusType {
    sender: string | undefined;
    seen: boolean | undefined;
}

export interface MessageSocketResponse {
    _id: string;
    chat: string;
    attachments?: Attachments[];
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

export type FileType = 'file' | 'image' | 'video' | 'audio';

export enum LectureType {
    videoLecture = 'videoLecture',
    grammarExercise = 'grammarExercise',
    vocaExercise = 'vocaExercise',
    listenExercise = 'listenExercise',
}

export enum GrammarExerciseTypes {
    FillBlankExercise = 'FillBlankExercise',
    MultipleChoice = 'MultipleChoice',
}

export enum ListenExerciseTypes {
    Conversation = 'Conversation',
    PicturesTest = 'PicturesTest',
    MatchingTest = 'MatchingTest',
    GapFill = 'GapFill',
}
export enum IconType {
    VideoLecture = 'videoLecture',
    Exercise = 'exercise',
    ListenExercise = 'listenExercise',
    Test = 'test',
}
