import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;


export const useSocket = (token) => {
  const socketRef = useRef();

  useEffect(() => {
    if (token) {
      socketRef.current = io(SOCKET_URL, {
        auth: { token }
      });

      return () => socketRef.current?.disconnect();
    }
  }, [token]);

  return socketRef.current;
};
