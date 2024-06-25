export interface ChatDetailsResponse {
    success: boolean;
    chat: Chat;
}

export interface GetMessageResponse {
    success: boolean;
    messages: Message[];
    totalPages: number;
}

export interface ChatUserStatusResponse {
    success: boolean;
    userStatus: UserStatus;
}

export interface UserStatus {
    _id: string;
    userId: string;
    lastOnline: Date;
    __v: number;
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
    lastSeen?: string;
}

export interface NewMessageSocketResponse {
    chatId: string;
    message: MessageSocketResponse;
    sender: string;
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
