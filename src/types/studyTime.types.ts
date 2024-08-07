export interface GetStudyTimeStatsResponse {
    success: boolean;
    stats: Stats;
}

export interface Stats {
    daily: number;
}

export interface UpdateStudyTimeResponse {
    success: boolean;
    studyTime: StudyTime;
}

export interface StudyTime {
    _id: string;
    date: Date;
    day: number;
    month: number;
    year: number;
    dailyDuration: number;
    user: string;
}

export interface GetStudyTimeByMonthResponse {
    success: boolean;
    monthlyDuration: number;
}

export interface GetTopUserByStudyTimeResponse {
    success: boolean;
    data: Datum[];
}

export interface Datum {
    totalDuration: number;
    userDetails: UserDetails;
    user: string;
    avatarFrameDetails: IAvatarFrame;
}

export interface UserDetails {
    _id: string;
    username: string;
    photo: Photo;
    nickname: string;
    level: number;
    avatarFrame: string | null;
}

interface IAvatarFrame {
    _id: string;
    photo: {
        public_id: string;
        url: string;
    };
    name: string;
    expiryType: string;
    expiryDate: Date;
    owner: string;
    createdAt: Date;
}

export interface Photo {
    public_id: string;
    url: string;
}

export interface GetStudyTimeCalendarResponse {
    success: boolean;
    calendar: Calendar[];
}

export interface Calendar {
    _id: string;
    date: Date;
    day: number;
    month: number;
    year: number;
    dailyDuration: number;
    user: string;
}
