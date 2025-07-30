import { io, Socket } from 'socket.io-client';

const socket: Socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: true,
  transports: ['polling'] 
});


export default socket; 