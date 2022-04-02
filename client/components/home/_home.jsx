import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';
import { Input } from '../common/input';
import mapboxgl from 'mapbox-gl';
import { TopBar } from '../common/top_bar';
mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aW5pZWxzb24iLCJhIjoiY2wxYmUwcDFsMDJkOTNpcDFneHQ0MmNyNCJ9.kkuzXsGq6n7pShT7TebTUw';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const [coordinates, setCoordinates] = useState({});
  const [roomName, setRoomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [localRooms, setLocalRooms] = useState([]);
  const [map, setMap] = useState(null);
  
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user)  {
      const res = api.get('/users/me');
      res.then(res => {
        setUser(res.user);
        setLoading(false);
      });
    }
    api.get('/chatRooms')
      .then(res => {
        let rooms = res.chatRooms;
        const locate = navigator.geolocation.getCurrentPosition((location) => {
          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
          setCoordinates({latitude, longitude});
          rooms = rooms.filter(room => {
            const distance = getDistance(latitude, longitude, room.yCoordinate, room.xCoordinate);
            return distance < 50;
          });
          const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [longitude, latitude], // starting position [lng, lat]
            zoom: 12 // starting zoom
          });
          rooms.forEach((room) => {
            const marker = new mapboxgl.Marker()
              .setLngLat([room.xCoordinate, room.yCoordinate])
            marker.getElement().onclick = () => {
              navigate(`/chatRooms/${room.id}`);
            }
            marker.addTo(map);
            setLocalRooms(rooms);
            setMap(map);
          });
        }, (error) => {
          console.log(`Got this geolocation error: ${error}`);
        })
        return () => {
          navigator.geolocation.clearWatch(locate);
        };
      });
  }, []);

  function getDistance(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const createRoom = async () => {
    if (roomName) {
      const res = await api.post('/chatRooms', {xCoordinate: coordinates.longitude, yCoordinate: coordinates.latitude, name: roomName});
      setLocalRooms([...localRooms, res.chatRoom]);
      const marker = new mapboxgl.Marker()
        .setLngLat([coordinates.longitude, coordinates.latitude])
      marker.getElement().onclick = () => {
        navigate(`/chatRooms/${res.chatRoom.id}`);
      }
      marker.addTo(map);
    }
    else {
      alert("Please enter a room name");
    }
  }

  return (
    <>
      <TopBar leftSide="Logout" click={logout} center="Geolocation Chat"/>
      <div className="p-4">
        <Input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
        <Button type="button" onClick={() => createRoom()}>Create Room</Button>
        <p>{errorMessage}</p>
        <div id="map"/>
      </div>
    </>
  );
};
