import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Navbar = () => {

  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  const [err,setErr] = useState(null);
  const navigate = useNavigate()

  const handleLogout = (e) =>{
     e.preventDefault();
   try{
      makeRequest.post("http://localhost:8800/api/auth/logout");
       navigate("/login")
   }catch(err){
     setErr(err.response.data)
   }
  }

  return (
    <div className="navbar">
        <div className="left">
        <Link to="/" style={{textDecoration:"none"}}> 
            <span>Facebook</span>
            </Link>
            <HomeOutlinedIcon/>
            {darkMode ? <WbSunnyOutlinedIcon onClick={toggle}/> : <DarkModeOutlinedIcon onClick={toggle}/>}
            <GridViewOutlinedIcon/>
            <div className="search">
              <SearchOutlinedIcon/>
              <input type="text" placeholder="Search..."/>
            </div>
         </div>
        <div className="right">
         <PersonOutlinedIcon/>
         <EmailOutlinedIcon/>
         <NotificationsOutlinedIcon/>
         <div className="user">
          <img src={currentUser.profilePic}/>
          <span>{currentUser.name}</span>
         </div>
         <button onClick={handleLogout}>Logout</button>
        </div>

    </div>
  )
}

export default Navbar