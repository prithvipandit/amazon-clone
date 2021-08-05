import React,{useEffect, useState} from 'react'
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
//import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import {useStateValue} from './StateProvider'
import { Link, useHistory } from 'react-router-dom';
import axios from './axios';
import {db,auth} from './firebase';
import firebase from 'firebase';


function Payment() {
  // const d = new Date();
  // console.log(d.toLocaleTimeString(),d.toDateString());
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
      // console.log("Data Aaya");
       bask.map(item=>{addToBasket(item)});
    }
  },[])

  useEffect(()=>{
   // console.log("Data Upload Hua")
    localStorage.setItem("My Basket",JSON.stringify(basket))
  },[basket]); 

    
    //const stripe = useStripe();
    const history = useHistory();
    //const elements=useElements();
    const [succeeded, setSucceded] = useState(false);
    const [processing, setProcessing] = useState("");
   // const [clientSecret,setClientSecret] = useState(true);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(authUser=>{
          if(authUser){dispatch({type:'SET_USER',user : authUser})}
          else {dispatch({type:'SET_USER',user : null})}})
      }, [])
    

    
    

    // useEffect(()=>{
    //     //generate the special stripe secret which allows us to charge the client
    //     const getclientSecret=async()=>{
    //         const response = await axios({
    //             method:'post',
    //             // Stripe Expects a total in Currency subunits
    //             url:`/payments/create?total=${totalAmount(basket)*100}`
    //         })
    //         setClientSecret(response.data.clientSecret)
    //     }
    //     getclientSecret();

       

    // },[basket])

   /// console.log("This is Client Secret",clientSecret);

 

    const handleChange=e=>{
        //Listen for changes in Card Details
        // and display any errors as coustomer types in their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    const handleSubmit=async(event)=>{
        // do all the fancy stripe stuff 
        event.preventDefault();
        setProcessing(true);

       if(user){

        db.collection('users')
            .doc(user.uid)
            .collection('orders')
            .doc(generateId())
            .set({
                basket : basket,
               name : user.displayName,
                amount : totalAmount(basket),
                created : new Date()
                
                
            }).catch((error)=>console.log("Error in Fetching",error));
      
            localStorage.setItem("My Basket",[])
        dispatch({
            type : "EMPTY_BASKET"
        })
    }
        history.replace('/orders');
    }
    

    return (
        <div className='payment'>
            
            <div className='payment__container'>
                {/* Payment Section Delivery Address */}
                <h1>Buy(<Link to='/checkout'>{basket.length} {totalProduct(basket) ? "item" :"*items"}</Link>)</h1>

                <div className='payment__section'>

                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>

                    <div className='payment__address'>
                        <p><strong>{user ? user.displayName : 'Guest'}</strong></p>

                        <p>Olympus Mons,Mars <br/>Sun Milky-Way Galaxy  </p>

                    </div>

                </div>

                 {/* Payment Section Review Items */}
                 <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items for Delivery</h3>
                    </div>
                    <div className='payment__items'>

                    {basket.map(item=>(<CheckoutProduct key={item.id}
                id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} cart={item.cart}
                />))}
                    </div>




                 </div>


                 {/* Payment Section Card details */}
                 <div className='payment__section'>

                     <div className='payment__title'>
                         <h3>Payment Method</h3>
                     </div>
                     <div className='payment__details'>
                         <p>This buy now button will simply push your order details in firestore db </p>
                         {/* Stripe Magic will go here */}

                         <form >
                             

                             <div className='price__container'>
         <p ><strong>Total Amount-({basket.length} {basket.length<=1 ? "item" : "items"})</strong><strong>{update(totalAmount(basket))}</strong></p>


                             </div>
                             <button onClick={handleSubmit}>
                                 Buy Now
                             </button>
                         </form>
                         
                     </div>
                     {error && <div>{error}</div>}


                 </div>

            </div>
            
        </div>
    )
}

function generateId( ){
    const d = new Date();

    let s = d.toDateString()+" "+d.toLocaleTimeString();

    return s;
    
}

function totalProduct(basket){
    let res=0;
    basket.map(item=>(res+=item.cart));
    if(res>1)return false;
    return true;
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
    return  "   ₹"+s+"/-";
}




{/*   const handleSubmit=async(event)=>{
        // do all the fancy stripe stuff 
        event.preventDefault();
        setProcessing(true);
        

        const payload = await stripe.confirmCardPayment(clientSecret,{
            
            payment_method : {card:elements.getElement(CardElement)}
        }).then(({paymentIntent})=>{
            //Payment Intent == payment confirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket : basket,
                name : user.displayName,
                amount : totalAmount(basket),
                created : paymentIntent.created
            }).catch((error)=>console.log("Error in Fetching",error));


            setSucceded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type : "EMPTY_BASKET"
            })

            history.replace('/orders');
        })
    } */}

export default Payment
