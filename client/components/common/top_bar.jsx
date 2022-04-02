import { useNavigate } from "react-router";

export const TopBar = ({ leftSide, center, click }) => {
  return (
    <div className="top-bar top-bar-content">
      <div className="left finger" onClick={click}>
        {leftSide}
      </div>
      <div className="center">
        {center}
      </div>
    </div>
  );
};