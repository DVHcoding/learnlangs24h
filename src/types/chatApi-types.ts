export interface ChatDetailsResponse {
    success: boolean;
    chat: Chat;
}

export interface Chat {
    _id: string;
    name: string;
    groupChat: boolean;
    creator: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
