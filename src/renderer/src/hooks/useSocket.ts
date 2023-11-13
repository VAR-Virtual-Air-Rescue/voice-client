import { useRef } from 'react';
import { Socket, io } from 'socket.io-client';

export const useSocket = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZThjZjQyNTJiYmU2Mzg5NjhjYzE1ZSIsImlhdCI6MTY5OTgxODI1NCwiZXhwIjoxNzAyNDEwMjU0fQ.ltOWolYkzNI6sUqHZMVJUFDPPaK1SsxVIlUpUR9HSFI';
    const socketRef = useRef<Socket>();

    return {
        socketRef,
        connect: (namespace: string, extraHeaders = {}) => {
            socketRef.current = io(`http://pxlloewe.ddns.net:3001/${namespace}`, {
                autoConnect: true,
                auth: { token },
                extraHeaders
            });
            return socketRef.current;
        },
        disconnect: () => socketRef.current?.disconnect()
    };
};