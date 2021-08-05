import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ClearIcon from '@material-ui/icons/Clear';
import DehazeIcon from '@material-ui/icons/Dehaze';
import amazonlogo from './images/amazonlogo.png';
import "./NavBar.css";
import { Link } from 'react-router-dom';
import {useStateValue} from './StateProvider';
import { auth } from './firebase';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';


function NavBar() {
  const [{basket,user},dispatch]=useStateValue();
  const [click, setClick] = useState(false);

  const handleAuth=()=>{
    // console.log(user.email);
     if(user){
         auth.signOut();
     }
 }

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
      
        <div className="nav-container">
        
        <div className="nav-icon" onClick={handleClick}>
            {click ? <ClearIcon/> : <DehazeIcon/>}
          </div>
          <NavLink exact to="/" className="nav-logo">
          
            <img src={amazonlogo} className='img__AmazonLogo'/>
          
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            
            <li className="nav-item">
              <NavLink
                exact
                to="/orders"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <div className="header__option">
                    <span className="header__optionLineOne">Home</span>
                    <span className="header__optionLineTwo">Page</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to={!user && '/login'}
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <div onClick={handleAuth} className="header__option">
                    <span className="header__optionLineOne">Hello {user ? user?.displayName : 'Guest'}</span>
                    <span className="header__optionLineTwo">{user ? 'Sign-Out':'Sign-In'}</span>
                </div>
              </NavLink>
            </li>
                     
          </ul>
          <Link to='/checkout'>
                <div className="header__optionBasket">
                   <span className=" header__basketCount">{basket?.length}</span> 
                   <LocalGroceryStoreIcon fontSize="large"/>  
               </div></Link>
          
        </div>
      </nav>
    </>
  );
}

export default NavBar;

