
import { useNavigate } from "react-router-dom";
import Profilepic from "../assets/profile.png";

function Profile({ width = "70%" }) {
  const navigate = useNavigate();

  return (
    <button>
      <img
        src={Profilepic}
        style={{ width }}
        className="rounded-full cursor-pointer"
        alt="profile"
      />
    </button>
  );
}
export default Profile;
