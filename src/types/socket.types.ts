export interface NotificationResponse {
    _id: string;
    content: string;
    relatedId: string;
    sender: {
        photo: {
            public_id: string;
            url: string;
        };
    };
    type: string;
    created: string;
}
