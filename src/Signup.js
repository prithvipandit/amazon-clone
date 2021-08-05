import React ,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {auth} from './firebase';
import loginlogo from './images/loginlogo.png';
import './Signup.css';



function updateUser(x) {
    
    const user = auth.currentUser;
  
    user.updateProfile({
      displayName: x
    //  photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });  
    // [END auth_update_user_profile]
  }

function Signup() {
    const history=useHistory();
    const[email,setEmail] = useState('');
    const[password,setPassword]=useState('');
    const[userName,setUserName]=useState('');

   

    const register=e=>{
        // user.displayName = userName;
        // console.log(user.displayName);
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{if(auth){updateUser(userName);history.push('/login');}})
        .catch(error=>alert(error.message));
    }

    return (
        
        <div className='login'>
           <Link to='/'><img className='login__logo'src={loginlogo} alt='Amazon Login Page logo'/></Link>
           <div className='login__container'>
               <h1>Sign-up</h1>
               <form>
                   <h5>Email</h5>
                   <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>
                   <h5>Password</h5>
                   <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                   <h5>User Name</h5>
                   <input type='text' value={userName} onChange={e=>setUserName(e.target.value)}/>

               </form>
               <p>
                   By Sign-Up you agreed to AMAZON"S FAKE CLONE conditionos of use and sale. Please see our privacy Notice, our Cookies Notice and our Internet based ads Notice
               </p>
               <button className='login__register' onClick={register}>Create your Amazon account</button>
           </div>


        </div>
        
    )
}

export default Signup