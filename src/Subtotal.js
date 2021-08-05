import React from 'react'
import './Subtotal.css'
import { useHistory } from 'react-router-dom';
import {useStateValue} from './StateProvider'
 

function Subtotal() {
    const history = useHistory();
    const [{basket},dispatch]=useStateValue();
    return (
        <div className='subtotal'>
        {basket.map(item=>(<p className="subtotal__items"><p> {item.heading}</p> <span><strong>{item.cart}</strong>&nbsp;*&nbsp;{update(item.price)} </span>    </p>))}
         <p className='sub_itemDashline'>__________________________________</p>
         <p className='sub_itemRes'><strong>Total Amount</strong><strong>{update(totalAmount(basket))}</strong></p>

        <small className='subtotal__gift'>
                    <input type='checkbox'/>This Order contains a gift
                </small>

            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
            
        </div>
        
        
        
    )
}

function totalAmount(basket){
    let res=0;
    basket.map(item=>(res+=item.cart*item.price));
    return res;
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
    return  "₹ "+s+"/-";
    }

export default Subtotal
