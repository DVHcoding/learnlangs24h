export interface GetStudyTimeStatsResponse {
    success: boolean;
    stats: Stats;
}

export interface Stats {
    daily: number;
    monthly: number;
    yearly: number;
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
    monthlyDuration: number;
    yearlyDuration: number;
    user: string;
}
