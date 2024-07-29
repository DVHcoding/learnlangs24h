import dayjs from 'dayjs';

function formatTimeAgo(timestamp: Date | string) {
    if (!timestamp) {
        return;
    }

    const now = dayjs();
    const targetTime = dayjs(timestamp);

    const secondsDiff = now.diff(targetTime, 'second');
    const minutesDiff = now.diff(targetTime, 'minute');
    const hoursDiff = now.diff(targetTime, 'hour');
    const daysDiff = now.diff(targetTime, 'day');
    const yearsDiff = now.diff(targetTime, 'year');

    if (secondsDiff < 60) {
        return `${secondsDiff} giây trước`;
    } else if (minutesDiff < 60) {
        return `${minutesDiff} phút trước`;
    } else if (hoursDiff < 24) {
        return `${hoursDiff} giờ trước`;
    } else if (daysDiff < 365) {
        return `${daysDiff} ngày trước`;
    } else {
        return `${yearsDiff} năm trước`;
    }
}

export { formatTimeAgo };
