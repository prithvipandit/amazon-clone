
//import { Update } from '@material-ui/icons';
import React from 'react';
import './CheckoutProduct.css';
import SetStateCart from './SetStateCart';
import {useStateValue} from './StateProvider'


function CheckoutProduct({id,image,title,price,rating,cart}) {
    const [state,dispatch]=useStateValue();
    const remove_from_basket=()=>{
        dispatch({
            type : "REMOVE_TO_BASKET",
            id : id,
        });
    }
   
    
    
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt='Product image'/>
            <div className='checkoutProduct__info'>
               <strong> <p className='checkoutProduct__title'>{title}</p></strong>
                <p className='checkoutProduct__price'>
                    <small>₹</small>
                    <strong>{update(price)}</strong>
                </p>
                
            <div className='checkoutProduct__rating'>{rating}</div>
             <div className='xcvbiiiiiiids'>  <SetStateCart  id={id} cart={cart}/> 
                {/* <button  className='checkoutProduct__infoSmallButton'>-</button><span className='cart__value'><setStateCart/></span><button  className='checkoutProduct__infoSmallButton'>+</button> */}

                <button onClick={remove_from_basket} className='checkoutProduct__infoButton'>Remove from Cart</button>
                </div>  </div>
        </div>
    )
}   

function update(x){
    let s = x.toString();
    let three=0;
    let two=0;
    for(let i=s.length-1;i>0;--i){
        ++three;
        if(three===3){s=s.substring(0,i)+","+s.substring(i,s.length);}
        if(three>3){++two;}
        if(two===2){s=s.substring(0,i)+","+s.substring(i,s.length);two=0;}
    }
    return s;
    };

export default CheckoutProduct 
