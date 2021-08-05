import React,{useState,useEffect} from 'react';
import {db} from './firebase';
import {useStateValue} from './StateProvider'
import './Orders.css';
import Order from './Order';



function Orders() {

  /*  useEffect(() => {
        if (window.innerWidth < 750) {
            require('./OrdersMob.css')
          }else{
            require('./Orders.css')
          }
        
     }, window.innerWidth)*/

    const [{basket,user},dispatch]=useStateValue();
    const[orders,setOrders] = useState([])
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
          // console.log("Data Aaya");
           bask.map(item=>{addToBasket(item)});
        }
      },[])
    
      useEffect(()=>{
       // console.log("Data Upload Hua")
        localStorage.setItem("My Basket",JSON.stringify(basket))
      },[basket]); 
   
    
    useEffect(() => {
     
   

        if(user){  
            db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created','desc')
          .onSnapshot(snapshot=>(setOrders(snapshot.docs.map(doc=>({ 
                  
                  id : doc.id,
                  data : doc.data()
              })))
          ))
           
            }
        }, [user]);

    return (
        <div className='orders'>
            <h1> Orders history </h1>
            
            
            <div className='orders__order'>
              
                {orders?.map(order=>(<Order  order={order}/>))}
            </div>
        </div>
    )
}



/*


 db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created','desc')
          .onSnapshot(snapshot=>(setOrders(snapshot.docs.map(doc=>({ 
                  
                  id : doc.id,
                  data : doc.data()
              })))
          ))


* */



export default Orders
