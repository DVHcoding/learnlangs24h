import React, { useEffect } from 'react';

const DesktopNotification: React.FC = () => {
    useEffect(() => {
        const notificationInterval = 30 * 60 * 1000; // Thời gian 30 phút tính bằng milliseconds

        const interval = setInterval(() => {
            showNotification();
        }, notificationInterval);

        return () => {
            clearInterval(interval); // Cleanup khi component unmount
        };
    }, []);

    const showNotification = () => {
        if (!('Notification' in window)) {
            alert('Trình duyệt của bạn không hỗ trợ Notification API!');
        } else if (Notification.permission === 'granted') {
            createNotification();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    createNotification();
                }
            });
        }
    };

    const createNotification = () => {
        new Notification('Từ vựng mới!', {
            body: `Clever (n) \nEx: You are clever! \nTrans: Bạn rất thông minh!`,
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMihwtp4kSYsVLiWiHw05okZDReG5wZjGrQ&s',
        });
    };

    return null;
};

export default DesktopNotification;
