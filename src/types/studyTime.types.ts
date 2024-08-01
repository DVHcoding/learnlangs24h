export interface GetStudyTimeStatsResponse {
    success: boolean;
    stats: Stats;
}

export interface Stats {
    daily: number;
    monthly: number;
    yearly: number;
}
