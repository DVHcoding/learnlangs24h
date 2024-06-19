export interface ChatDetailsResponse {
    success: boolean;
    chat: Chat;
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
