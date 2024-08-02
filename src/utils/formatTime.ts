const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours} hours ${remainingMinutes}p`;
    } else if (minutes > 0) {
        return `${minutes} minutes`;
    } else {
        return '0 minutes';
    }
};

const formatHour = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours} hours`;
    } else {
        return `${remainingMinutes} minutes`;
    }
};

export { formatTime, formatHour };
