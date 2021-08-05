import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import './Product.css';
import {useStateValue} from './StateProvider'

function OrderProduct({id,title,image,price,rating,cart,heading}) {

    const history = useHistory();
   
    
        const [{basket,user},dispatch]=useStateValue();
        const addToBasket =()=>{
            //dispatch the item into the data layer
            
            dispatch({
                type : 'ADD_TO_BASKET',
                item :{
                id : id,
                title : title,
                image : image,
                price : price,
                rating :rating,
                cart : 1,heading : heading},
            });
          //  if(dispatch.cart===0){history.push('/checkout');}
        };

    return (
        <div className='product'>
            <div className='product__info'>
                <p className='product__title'>{title}</p>
                <p className='product__price'>
                    <small>₹</small>
                    <strong>{update(price)}</strong>
                </p>
                <div className='product__rating'>
                    {rating}
                </div>
            </div>
            <img src={image} alt='product-image'/>

            <p> <strong>No of items : {cart}</strong></p>
            <button onClick={addToBasket}>{ isInCart(basket,id)===0 ?<Link className='linkAttachment' to='/checkout'>Go to Cart</Link> : "Buy Again"}</button>  
        </div>
    )
}

function isInCart(basket,x){
    for(let item of basket){
        if(item.id===x)return 0;
    }
    return 1;
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



export default OrderProduct;
