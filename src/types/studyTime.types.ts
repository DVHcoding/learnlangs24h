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
