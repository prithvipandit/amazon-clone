import React,{useEffect} from 'react';
import moment from "moment";
import './Order.css';
//import './OrderMob.css';
import OrderProduct from './OrderProduct';



function Order({order}) {
   // console.log(order);
  /*  useEffect(() => {
       // console.log(">>Change")
        if (window.innerWidth < 750) {
            require('./OrderMob.css')
          }else{
            require('./Order.css')
          }
        
    }, [window.innerWidth])*/
    return (
        <div className='order'>
            <h2 className='order__h2'>Order</h2>

            <p className='order__date'>{orderDate(order.data.created)}</p>
            <p className='order__id'>
                
            </p>
           <div className='order__container'> {order.data.basket?.map(item=>
            <OrderProduct key ={item.id}id={item.id} title={item.title} image={item.image} price={item.price}
            rating={item.rating} heading={item.heading} cart={item.cart} 
            />
            )}</div>

           <p className='order__total'>Order Total : { update(order.data.amount) }</p> 
            
        </div>
    )
}


function tConvert (time) {
    

    
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

function orderDate(dateObj){
   

    let s = dateObj.toDate().toString();

    //s.substring(16,24)
    return s.substring(0,15)+" "+tConvert(s.substring(16,24));

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
    return "₹"+s+ "/-";
};




export default Order
