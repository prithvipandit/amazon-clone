import React from 'react';
import "./Header.css";


import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import { Link } from 'react-router-dom';
import {useStateValue} from './StateProvider';

import { auth } from './firebase';
import amazonlogo from './images/amazonlogo.png';
import SearchProducts from './SearchProducts';


function Header() {
    const [{basket,user},dispatch]=useStateValue();
    

    const handleAuth=()=>{
       // console.log(user.email);
        if(user){
            auth.signOut();
        }
    }
   


    
    return (
        
        <div className="header">
            <Link to='/'>
            <img className="header_logo" src={amazonlogo} alt="Amazon Logo"/></Link>
           
            {/* logo */}
            <div className="header_nav">
                <Link to={!user && '/login'}>
                <div onClick={handleAuth} className="header__option">
                    <span className="header__optionLineOne">Hello {user ? user.displayName : 'Guest'}</span>
                    <span className="header__optionLineTwo">{user ? 'Sign-Out':'Sign-In'}</span>
                </div>
                </Link>
                <Link to='/orders'>
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div></Link>
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
                <div className="header__option">
                <Link to='/checkout'>
                <div className="header__optionBasket">
                   <span className=" header__basketCount">{basket?.length}</span> 
                   <LocalGroceryStoreIcon fontSize="large"/>  
               </div></Link>
                </div>
            </div>
        </div>
        
        
    )
}

export default Header
