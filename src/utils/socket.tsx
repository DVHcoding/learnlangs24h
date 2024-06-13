// ##########################
// #      IMPORT NPM        #
// ##########################
import { createContext, useMemo, useContext, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

// ##########################
// #    IMPORT Components   #
// ##########################
const SocketContext = createContext<Socket | null>(null);

//Sử dụng useContext
const useSocket = (): Socket => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

// Tạo contextProvider
const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true }), []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, useSocket };
