const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours} hours ${remainingMinutes} minutes`;
    } else if (minutes > 0) {
        return `${minutes} minutes`;
    } else {
        return '0 minutes';
    }
};

export { formatTime };
