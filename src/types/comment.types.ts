export interface GetParentCommentsResponse {
    success: boolean;
    comments: CommentType[];
}

export interface GetRepliesByIdResponse {
    success: boolean;
    replies: CommentType[];
}

export interface CommentType {
    _id: string;
    message: string;
    parentId: string | null;
    user: User;
    createdAt: string;
    replyCount?: number;
    replies?: CommentType[];
}

export interface User {
    photo: {
        public_id: string;
        url: string;
    };
    _id: string;
    username: string;
    nickname: string;
    level: number;
    avatarFrame: IAvatarFrame | null;
}

interface IAvatarFrame {
    photo: {
        public_id: string;
        url: string;
    };
    _id: string;
    name: string;
    expiryType: 'permanent' | 'temporary';
    expiryDate: Date | null;
    owner: string;
    createdAt: Date;
}

/* -------------------------------------------------------------------------- */
/*                                 NEW COMMENT                                */
/* -------------------------------------------------------------------------- */
export interface NewCommentPayloadTypes {
    message: string;
    parentId: string | null;
    userId: string;
    unitLesson: string;
}

export interface NewCommentResponseTypes {
    success: boolean;
    newComment: Comment[];
}
