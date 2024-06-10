import React, { createContext, useMemo, useContext, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
}
// Tạo một context mới để lưu dữ liệu
const SocketContext = createContext<SocketContextType | undefined>(undefined);

const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socket = useMemo(() => io('http://localhost:4000', { withCredentials: true }), []);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export { SocketProvider, useSocket };
