import React from 'react'
import Product from './Product';
import './SearchProduct.css'
import {useStateValue} from './StateProvider';
import cotmask from './images/cotmask.jpeg';
import fridge from './images/fridge.jpeg';
import ppekit from './images/ppekit.jpeg';
import surmask from './images/surmask.jpeg';
import tab from './images/tab.jpeg';
import tv from './images/tv.jpeg';
import watch from './images/watch.jpeg';


function isInCart(basket,x){
    for(let item of basket){
        if(item.id===x)return 0;
    }
    return 1;
}

//cart:{isInCart(state.basket,2)},

function SearchProducts({s}) {
    const [state,dispatch]=useStateValue();
    const data=[
        {id:1 ,title:"New Apple Watch SE (GPS, 40mm) - Space Grey Aluminium Case with Black Sport Band", image: watch, price:29900 ,rating:"4.5⭐",  heading:"Watch"},
        {id:2 ,title:'HP Pavilion x360 (2021) 14" (35.56cms) FHD Touchscreen Laptop, 11th Gen Core i7, 8 GB RAM, 512GB SSD, 2-in-1 Convertible, Windows 10, MS Office, Finger Print Reader (14-dw1040TU)', image:tab ,price:79990 ,rating:'4.7⭐', heading:"Touchscreen Laptop"},
        {id:3 ,title:"Bildos Non-Woven Fabric Disposable Surgical Mask (Blue, Without Valve, Pack of 100) for Unisex", image:surmask,price:'349' ,rating :'3.7⭐',heading:"Surgical Mask"},
        {id:4,title:'E-Tex Kawach Cotton Reuseable Mask (Grey, Without Valve, Pack of 10) for Unisex',image:cotmask,price:399 ,rating:'3.9⭐', heading:"Cotton Mask"},
        {id:5, title:'Antson PPE Safety Kit for Full Body Protection- Non-Suffocating+Comfortable for Travelling- 90 GSM- Polyproplyene Material, Free Size for Men and Women',image:ppekit,price:496,rating :'4.6⭐',heading:"PPE-Kit"},
        {id:6, heading:"Refridgerator", title:"LG 471L 3 Star Wi-Fi Inverter Frost-Free Double Door Refrigerator (GL-T502XPZ3, Shiny Steel, Convertible)",image:fridge,price:58990 ,rating :'4.2⭐'},
        {id:7, heading:"Smart-TV", title:"OnePlus 138.8 cm (55 inches) U Series 55U1 Series 4K Ultra HD LED Smart Android TV 55UA0A01 (Black) (2020 Model)" ,image:tv ,price:52999 ,rating :'4.2⭐', }         
    ]

    return (
        <div className='seachProducts'>
            {data.filter((item)=>/*item.title.toLowerCase().includes(s.toLowerCase()) || */ item.heading.toLowerCase().includes(s.toLowerCase())).map(item=><Product  id={item.id} title={item.title} image={item.image} heading={item.heading} price={item.price} rating={item.rating} cart={isInCart(state.basket,item.id)}/>)}
            
        </div>
    )
}





export default SearchProducts
