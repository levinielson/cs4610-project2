import { useNavigate } from "react-router"

export const RoomCard = ({room}) => {

  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/rooms/${room.id}`);
  }

  return (
    <div onClick={redirect}>
      <p>{room.roomName}</p>
    </div>
  )
}