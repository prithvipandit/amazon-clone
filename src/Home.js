import React from 'react';
import './Home.css';
import SearchIcon from "@material-ui/icons/Search";
import Product from './Product';
import {useStateValue} from './StateProvider';
import background from './images/background.jpeg';
import cotmask from './images/cotmask.jpeg';
import fridge from './images/fridge.jpeg';
import ppekit from './images/ppekit.jpeg';
import surmask from './images/surmask.jpeg';
import tab from './images/tab.jpeg';
import tv from './images/tv.jpeg';
import watch from './images/watch.jpeg';
import { useState } from 'react';
import SearchProducts from './SearchProducts';




function Home() {
    const [state,dispatch]=useStateValue();

    React.useEffect(()=>{
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
    
      React.useEffect(()=>{
       // console.log("Data Upload Hua")
        localStorage.setItem("My Basket",JSON.stringify(state.basket))
      },[state.basket]); 

    const [ search,setSearch]=useState('');
    return (
        <>
        <div className="search__div">
           <h3>Search Your Products here</h3>
        <div className="header__search">
           
           <input placeholder='Search Products' className="header__searchInput" type="text" onChange={(e)=>{setSearch(e.target.value)}}/>
               <SearchIcon className="header__searchIcon"/>
       </div>
        </div>
         
        {search.length>0 ? <SearchProducts s={search}/>:<>
        
        
        
        <div className="home">
           
            <div className="home__container">
                <img className="home__img" src={background} alt="Amazon Background" />
            

                <div className="home__row">
                    <Product id={1} title="New Apple Watch SE (GPS, 40mm) - Space Grey Aluminium Case with Black Sport Band" image={watch}
                    price={29900} rating={"4.5⭐"} cart={isInCart(state.basket,1)} heading={"Watch"}/>
                    <Product heading={"Touchscreen Laptop"} id={2} title='HP Pavilion x360 (2021) 14" (35.56cms) FHD Touchscreen Laptop, 11th Gen Core i7, 8 GB RAM, 512GB SSD, 2-in-1 Convertible, Windows 10, MS Office, Finger Print Reader (14-dw1040TU)' image={tab} price={79990} rating={'4.7⭐'} cart={isInCart(state.basket,2)}/>
                   
                </div>
                <h2 className='home__heading'>Covid19 Essentials</h2>
                <div className="home__row">
                    <Product id={3} heading={"Surgical Mask"}  title="Bildos Non-Woven Fabric Disposable Surgical Mask (Blue, Without Valve, Pack of 100) for Unisex" image={surmask} price={349} rating ={'3.7⭐'} cart={isInCart(state.basket,3)}/>
                    <Product id={4} heading={"Cotton Mask"} title='E-Tex Kawach Cotton Reuseable Mask (Grey, Without Valve, Pack of 10) for Unisex' image={cotmask} price={399} rating={'3.9⭐'} cart={isInCart(state.basket,4)}/>
                    <Product id={5} heading={"PPE-Kit"} title='Antson PPE Safety Kit for Full Body Protection- Non-Suffocating+Comfortable for Travelling- 90 GSM- Polyproplyene Material, Free Size for Men and Women' image={ppekit} price={496} rating ={'4.6⭐'} cart={isInCart(state.basket,5)}/>
                </div>
                <h2 className='home__heading'>Electronics</h2>
                <div className="home__row">
                <Product id={6} heading={"Refridgerator"} title="LG 471L 3 Star Wi-Fi Inverter Frost-Free Double Door Refrigerator (GL-T502XPZ3, Shiny Steel, Convertible)" image={fridge} price={58990} rating ={'4.2⭐'} cart={isInCart(state.basket,6)}/>
                <Product id={7} heading={"Smart-TV"} title="OnePlus 138.8 cm (55 inches) U Series 55U1 Series 4K Ultra HD LED Smart Android TV 55UA0A01 (Black) (2020 Model)" image={tv} price={52999} rating ={'4.2⭐'} cart={isInCart(state.basket,7)}/>     
                </div>
            </div>
            
        </div></>}

        </>
        
    )
}

function isInCart(basket,x){
    for(let item of basket){
        if(item.id===x)return 0;
    }
    return 1;
}

export default Home
