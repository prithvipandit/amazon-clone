import React,{useEffect} from "react"; 
import './App.css';
import Login from './Login';
import Home from "./Home";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Checkout from "./Checkout";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Signup from "./Signup";
import Orders from "./Orders";
import NavBar from "./NavBar";
import Address from "./Address";




function App() {

  const[{user},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      if(authUser){dispatch({type:'SET_USER',user : authUser})}
      else {dispatch({type:'SET_USER',user : null})}})
  }, [])

  return (
    <Router>  
    <>
    <Switch>
      <Route path='/your-account'>
        <NavBar/>
        <Address/>  
      </Route>
      <Route path='/payment'>
        <NavBar/>
        <Payment/>  
      </Route>
      <Route path='/orders'>
        <NavBar/>
        <Orders/>
      </Route>
      <Route path='/sign-up'>  
        <Signup/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/checkout'>
        <NavBar/>
        <Checkout/>
      </Route>
      <Route path='/'>
        <NavBar/>
        <Home/>   
      </Route>
    </Switch>
    </>
    </Router>
  );
}

export default App;

