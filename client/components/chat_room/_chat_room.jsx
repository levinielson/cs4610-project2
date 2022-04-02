import { useMessages } from '../../utils/use_messages';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../common/input';
import { Message } from './message';
import { Button } from '../common/button';
import { TopBar } from '../common/top_bar';
import { ApiContext } from '../../utils/api_context';
import { useNavigate } from 'react-router';

export const ChatRoom = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [messages, sendMessage] = useMessages(id, user);
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const api = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(async () => {
    const { user } = await api.get('/users/me');
    setUser(user);
    const { chatRoom } = await api.get(`/chatRooms/${id}`);
    setRoomName(chatRoom.name);
  }, [])

  const goHome = () => {
    navigate('/#')
  }

  return (
    <>
      <TopBar leftSide="Back to Home" center={roomName} click={goHome}/>
      <div className="chat-container">
        <div className="messages">
          {[...messages].reverse().map((message, i) => (
            <Message key={i} message={message} id={user.id}  />
          ))}
        </div>
        <div className="chat-input align-bottom bottom-0">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => {
		  sendMessage(input, user);
		  setInput('');}}>Send</Button>
        </div>
      </div>
    </>
  );
}
