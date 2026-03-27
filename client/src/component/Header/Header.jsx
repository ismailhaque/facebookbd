import React from "react";
import "./Header.css";
import { Link } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { GoVideo } from "react-icons/go";
import { CgMenuGridR } from "react-icons/cg";
import { GrGamepad, GrGroup } from "react-icons/gr";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/Auth/AuthSlice";

function Header() {
  // get login user
  const user = useSelector(selectCurrentUser)
  
  // Header icon  
  const addActiveClass = (e) => {
    const head = document.getElementsByClassName('nav-icon')
    e.preventDefault()
    for (let index = 0; index < head.length; index++) {
      head[index].classList.remove('active')                   
    }
    
    e.target.classList.add('active')    
  }
  
  return (
  <>
    <div className="header-container">
      <div className="row">
        <div className="col-1">
          <div className="logo">
            <h1>f</h1>
          </div>
          <div className="sarch-box">
            <input placeholder="Search Facebook" type="text" />
          </div>
        </div>
        <div className="col-2">
          <Link to='/' className="active"><GoHomeFill/></Link>
          <Link to='/'><RxDashboard/></Link>
          <Link><GoVideo/></Link>
          <Link><GrGroup/></Link>
          <Link><GrGamepad/></Link>
        </div>
        <div className="col-3">
          <div className="menu">
            <Link><CgMenuGridR/></Link>
            <Link><FaFacebookMessenger/></Link>
            <Link><IoMdNotifications/></Link>
            <img src="https://www.bbc.co.uk/news/technology-43085053" alt="" />
          </div>
          <div className="profile">
            <img src="https://unsplash.com/s/photos/image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Header;


