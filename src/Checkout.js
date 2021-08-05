import React,{useEffect} from 'react';
import './Checkout.css';
import Subtotal from './Subtotal.js';
import {useStateValue} from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import backBanner from './images/backBanner.jpeg'
import { auth } from "./firebase";


function Checkout() {
    const [{basket,user},dispatch]=useStateValue();

    useEffect(()=>{
      const addToBasket =(item)=>{
        dispatch({
            type : 'ADD_TO_BASKET',
            item :{
            id : item.id,
            title : item.title,
            image : item.image,
            price : item.price,
            rating :item.rating,
            cart : item.cart,heading : item.heading},
        });
    };

      const data = localStorage.getItem("My Basket");
      if(data){
        const bask = JSON.parse(data);
         console.log("Data Aaya");
         bask.map(item=>{addToBasket(item)});
      }
    },[])

    useEffect(()=>{
      console.log("Data Upload Hua")
      localStorage.setItem("My Basket",JSON.stringify(basket))
    },[basket]);

    

    useEffect(() => {
        auth.onAuthStateChanged(authUser=>{
          // will only run once when the app component loads
    
         // console.log("This is the User->>>>>>",auth);
          if(authUser){
            //the user just logged in /the user was loggged in
            dispatch({
              type:'SET_USER',
              user : authUser
            })
          }
          else {
            //the user is logged out
            dispatch({
              type:'SET_USER',
              user : null
            })
          }
        })
      }, [])
    return (
        <div>
            <img className='checkout__banner' src={backBanner} alt='Amazon Banner'/>
             <div className='checkout'>
           
                <div className='checkout__left'>
            

                <h2 className='checkout__title'>{user ? user.displayName : 'Guest'} Shopping Cart</h2>

                {basket.map(item=>(<CheckoutProduct
                id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} cart={item.cart}
                />))}
                </div>

              
            <div className='checkout__right'>
                {basket?.length===0?<div></div>:<Subtotal/>}
            
            </div>
            </div>

            
        </div>
    )
}


/*   pk_test_51JH1CxSCsmJLHendvKEX34FFzOWcItWaX6fRINgq04a5eerLJAo2hixHVrTRdK2PgcVNwHUIcYa7MgPiHNNagD4e00cjvOzTVA */

/*   sk_test_51JH1CxSCsmJLHenduWIfEuh7JlrYQOoOTbMRYcsnCsuZpTXFGnGFuad6Q7Ma0zHzkMPdml92ribNJbVysOJ9jZ9I00BOWvKtcn  */

export default Checkout
