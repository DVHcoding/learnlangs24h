export type MessageResponse = {
    success: boolean;
    message: string;
};

export interface APIResponse {
    success: boolean;
    message?: string;
    user: RegisterUserType;
}

export interface LoginUserType {
    email: string;
    password: string;
}

export interface RegisterUserType {
    username: string;
    email: string;
    password: string;
    photo: {
        public_id: string;
        url: string;
    };
    roles?: string;
}

export interface LoginGoogleType {
    username: string | null;
    email: string | null;
    photo: {
        public_id: string | null;
        url: string | null;
    };
    googleId: string | null;
    roles?: string;
}

export interface NewCoursePayloadType {
    unitName: string;
    courseImage: File;
}

export interface NewCourseStateType {
    loading: boolean;
    error: string | null;
    data: MessageResponse | null;
}

export interface AllCoursesResponseType {
    success: boolean;
    courses: CourseType[];
}

export interface CourseType {
    _id: string;
    name: string;
    image: {
        url: string;
    };
    createAt: Date;
    rating: number;
}
