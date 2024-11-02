
import {useDispatch} from "react-redux"
import {logout } from "../../store/authSlice.js"
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate(); // Define navigate

    const lougoutHandler = () => {
        
        localStorage.removeItem('userData');
    
        // Dispatch logout action to Redux
        dispatch(logout());
    
        // Optionally, redirect the user to the login page or home page
        navigate('/login'); // Or wherever you want to redirect
    
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full bg-red-500 text-white '
    onClick={lougoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn