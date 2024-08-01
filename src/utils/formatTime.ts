const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minutes`;
    } else {
        const hours = Math.floor(minutes / 60);
        return `${hours} hours`;
    }
};

export { formatTime };
