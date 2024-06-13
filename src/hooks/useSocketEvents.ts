// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

/**
 * Giả sử bạn có một đối tượng đơn giản như sau:
 *
 * const person = {
 *   name: "John",
 *   age: 30,
 *   city: "New York"
 * };
 *
 * Bạn có thể sử dụng Object.entries để lấy các cặp [key, value] từ đối tượng person:
 * const entries = Object.entries(person);
 * console.log(entries);
 *
 * Kết quả sẽ là một mảng chứa các mảng con, mỗi mảng con là một cặp [key, value]:
 * [
 *   ["name", "John"],
 *   ["age", 30],
 *   ["city", "New York"]
 * ]
 */

interface Handlers {
    [key: string]: (...args: any[]) => void;
}

const useSocketEvents = (socket: Socket, handlers: Handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([event, handler]) => {
            /**
             * Lắng nghe sự kiện và nhận dữ liệu từ server khi sự kiện đó xảy ra.
             * Khi sự kiện được phát từ server, hàm handler sẽ được gọi với dữ liệu nhận được.
             *
             * Hoặc ta có thể làm trực tiếp như ví dụ dưới đây (Không khuyến khích vì không tái sử dụng được handler):
             * socket.on(event, (data) => {
             *    console.log(data);
             * });
             */
            socket.on(event, handler);
        });

        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                socket.off(event, handler);
            });
        };
    }, [socket, handlers]);
};

export default useSocketEvents;
