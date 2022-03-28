import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Ping } from './ping';
import { RoomCard } from '../common/room_card';
import { Input } from '../common/input';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);
  const [localRooms, setLocalRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    const rooms = await api.get('/chatRooms');
    setAllRooms(rooms.rooms);
    setUser(res.user);
    setLoading(false);
  }, []);

  const distance = (lon1, lon2, lat1, lat2) => {
    if (x1 === x2 && y1 === y2) {
      return 0;
    }
    else {
      latitude1InRadians = Math.PI * lat1 / 180;
      latitude2InRadians = Math.PI * lat2 / 180;
      theta = lon1-lon2;
      radTheta = Math.PI * theta / 180;
      dist = Math.sin(latitude1InRadians) * Math.sin(latitude2InRadians) + Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) * Math.cos(radTheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }

  useEffect(() => {
    if (allRooms) {
      const locate = navigator.geolocation.getCurrentPosition((location) => {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        console.log(latitude, longitude);
        setCoordinates([latitude, longitude]);
        for (let i = 0; i < allRooms.length; i++) {
          roomDistance = distance(longitude, allRooms[i].longitude, latitude, allRooms[i].latitude)
          if (roomDistance <= 50) {
            setLocalRooms([...localRooms, allRooms[i]])
          }
        }
      }, (error) => {
        console.log(error);
      })

      return () => {
        navigator.geolocation.clearWatch(locate);
      };
    }
    else {
      return () => {}
    }
  }, [allRooms]);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const createRoom = async () => {
    if (roomName) {
      await api.post('chatRooms', {xCoordinate: coordinates[0], yCoordinate: coordinates[1], roomName: roomName})
    }
  }

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
      <Input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
      <Button type="button" onClick={() => createRoom()}>Create Room</Button>
      {localRooms.map((room) => (
        <RoomCard key={room.id} room={room}/>
      ))}
      <section>
        <Ping />
      </section>
    </div>
  );
};
