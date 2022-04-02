import { useContext, useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './auth_context';


export const useMessages = ({ id }) => {
  const messagesRef = useRef([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [ authToken ] = useContext(AuthContext);
  

  useEffect(() => {
    const socket = io({
      auth: {
        token: authToken
      },
      query: {
        chatRoomId: id,
      },
    });
    setSocket(socket);
    socket.on('message', (message) => {
      messagesRef.current.push(message);
      console.log(message);
      setMessages([...messagesRef.current]);
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    }
  }, []);

  const sendMessage = (contents, user) => {
    socket.emit('message', {
      contents,
      userName: `${user.firstName} ${user.lastName}`,
      id: user.id,
    });
  };

  return [messages, sendMessage];
}