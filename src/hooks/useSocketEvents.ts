// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

// ##########################
// #    IMPORT Components   #
// ##########################

interface Handlers {
    [key: string]: (...args: any[]) => void;
}

const useSocketEvents = (socket: Socket, handlers: Handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([event, handler]) => {
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
