import { io, Socket } from 'socket.io-client';

const socket: Socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
  withCredentials: true,
  autoConnect: true,
});

export default socket; 