import React from 'react'
import './setStateCart.css';
import {useStateValue} from './StateProvider'

function SetStateCart({id,cart}) {
    const [state,dispatch]=useStateValue();
    const updateBasketInc=()=>{
        dispatch({
            type : "UPDATE_BASKET",
            id  : id,
            cart : cart+1,
        })
    }
    const updateBasketDec=()=>{
        if(cart===1){
            dispatch({
                type : "REMOVE_TO_BASKET",
                id : id,
            });
            dispatch({
                type : "UPDATE_BASKET",
                id  : id,
                cart : cart-1,
            })
        }
        else{
        dispatch({
            type : "UPDATE_BASKET",
            id  : id,
            cart : cart-1,
        })}
    }
    return (
        <div className='setStateCart'>
        <button onClick={updateBasketDec} className='setStateCart__button'>-</button>
        <span>{cart}</span>
        <button onClick={updateBasketInc} className='setStateCart__button'>+</button>
    </div>
    )
}

export default SetStateCart




 
 
 
 
 
 
 
 
 
 
 
 
 
 