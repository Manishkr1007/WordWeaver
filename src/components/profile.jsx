import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profilepic from '../assets/profile.png';


function Profile({ width = '70%' }) {
    const navigate = useNavigate();

    

    return (
      <div>
      
        <img

            src={Profilepic}
            style={{ width }}
            className="rounded-full cursor-pointer"
            alt="profile"
           
        />
</div>

    );
}
export default Profile;
