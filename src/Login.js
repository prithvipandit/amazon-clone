import React ,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {auth} from './firebase';
import loginlogo from './images/loginlogo.png';
import './Login.css';

function Login() {
    const history=useHistory();
    const[email,setEmail] = useState('');
    const[password,setPassword]=useState('');

    const signIn=e=>{
        e.preventDefault();
        //fancy firebase stuff
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{history.push('/')})
        .catch(error=>alert(error.message));
    }

   

    return (
        
        <div className='login'>
           <Link to='/'><img className='login__logo'src={loginlogo} alt='Amazon Login Page logo'/></Link>
           <div className='login__container'>
               <h1>Sign-In</h1>
               <form>
                   <h5>Email</h5>
                   <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>
                   <h5>Password</h5>
                   <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                   
                   <button className='login__signIn' onClick={signIn}>Sign-In</button>
               </form>
               <p>
                   By Sign-In you agreed to AMAZON"S FAKE CLONE conditionos of use and sale. Please see our privacy Notice, our Cookies Notice and our Internet based ads Notice
               </p>
               <button className='login__register' onClick={e=>{history.push('/sign-up')}}>Create your Amazon account</button>
           </div>


        </div>
        
    )
}

export default Login
