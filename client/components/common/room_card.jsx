import { useNavigate } from "react-router"

export const RoomCard = ({room}) => {

  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/chatRooms/${room.id}`);
  }

  return (
    <div onClick={redirect}>
      <p>{room.name}</p>
    </div>
  )
}