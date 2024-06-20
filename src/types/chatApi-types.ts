export interface ChatDetailsResponse {
    success: boolean;
    chat: Chat;
}

export interface GetMessageResponse {
    success: boolean;
    messages: Message[];
}

export interface Chat {
    _id: string;
    name: string;
    groupChat: boolean;
    creator: string;
    members: Member[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface Member {
    photo: {
        public_id: string;
        url: string;
    };
    _id: string;
    username: string;
}

export interface AddMemberSocketResponse {
    userId: string;
    socketId: string;
}

export interface NewMessageSocketResponse {
    chatId: string;
    message: Message;
}

export interface Message {
    content: string;
    _id: string;
    sender: Sender;
    chat: string;
    attachments: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Sender {
    _id: string;
    name: string;
}
