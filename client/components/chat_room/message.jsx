export const Message = ({ message, id }) => {

  if (message.id === id) {
    return (
      <div className="flex message justify-end">
        <div className="">
          <p>{message.contents}</p>
        </div>
      </div>
    );
  }
  else { 
    return (
      <div className="flex message justify-start">
        <div className="">
          <p>{message.sender}</p>
          <p>{message.contents}</p>
        </div>
      </div>
    );
  }


}