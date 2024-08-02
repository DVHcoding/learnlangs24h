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
}

export interface UserDetails {
    _id: string;
    username: string;
    photo: Photo;
    nickname: string;
    level: number;
}

export interface Photo {
    public_id: string;
    url: string;
}
