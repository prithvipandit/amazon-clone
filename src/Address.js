import React,{useEffect,useState} from 'react';
import {useStateValue} from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import profileImg from './images/profileImg.png';
import './Address.css';


function Address() {
    const [{basket,user},dispatch]=useStateValue();
    const[orders,setOrders] = useState([]);
    const history=useHistory();
    const[email,setEmail] = useState('');
    const[password,setPassword]=useState('');

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
          
           bask.map(item=>{addToBasket(item)});
        }
      },[])
    
      useEffect(()=>{
        localStorage.setItem("My Basket",JSON.stringify(basket))
      },[basket]);

  

    return (
       <div className='address'>
         <div className='address__left'>
           {/* Profile Information */}
          <div className='address__profileImg'>
          <div className='address__userName'>
               <p>Hi,<br/><span className='bigger__font'>{user ? user.displayName : "Guest"}</span></p>
             </div>
             <img className='address__profile' src={12}/>
             
          </div>
         </div>
         <div className='address__right'>
           {/* Firebase Storage*/}
         </div>
       </div>
    )
}

export default Address
