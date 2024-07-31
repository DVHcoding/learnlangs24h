export interface NotificationResponseTypes {
    success: boolean;
    notification: Notification[];
}

export interface Notification {
    _id: string;
    sender: Sender;
    receiver: string;
    content: string;
    type: string;
    relatedId: string;
    isRead: boolean;
    createdAt: Date;
}

export interface Sender {
    photo: Photo;
    _id: string;
    username: string;
    nickname: string;
}

export interface Photo {
    public_id: string;
    url: string;
}
