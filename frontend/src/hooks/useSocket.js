import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (token) => {
  const socketRef = useRef();

  useEffect(() => {
    if (token) {
      socketRef.current = io('http://localhost:5050', {
        auth: { token }
      });
      
      return () => socketRef.current?.disconnect();
    }
  }, [token]);

  return socketRef.current;
};