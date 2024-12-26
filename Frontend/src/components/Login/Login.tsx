import { Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link, redirect } from 'react-router-dom'
import './Login.css'
import { GlobalStateContext } from '../ContextApi/GlobalStateProvide';
import Cookies from 'js-cookie';

const Login = () => {
    const [phone,setPhone] =React.useState<string>("");
    const [password,setPassword] =React.useState<string>("")


    const context = useContext(GlobalStateContext)
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }

    const {setIsAuthenticated , isAuthenticated, login} =context;

    const loginHandler = async (e:any)=>{
        e.preventDefault();
        console.log("kgjhjgjhg")
       const response =  await axios.post('http://localhost:8000/api/v1/user/login',{phone,password},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true // Allows cookies to be sent and received
        })
        console.log("done")
        console.log(response.data)
        // const { token } = response.data;

        const {token} = response.data
        
        if (token) {
            // Set the token in cookies for future requests
           await setIsAuthenticated(true); // Update your authentication state
            console.log(isAuthenticated)
            // Redirect the user to the home page
            redirect('../'); // Adjust according to your routing library
        }

    }
    useEffect(() => {
        console.log("Authentication status changed:", isAuthenticated);
      }, [isAuthenticated]);

  return (
    <div className='login'>
    <form className='loginForm' onSubmit={loginHandler}>

        <Typography variant='h3' style={{padding:"2vmax"}}>
            Social Aap
        </Typography>

        <input type='phone' placeholder='Phone' required value={phone} onChange={(e)=>setPhone(e.target.value)}/>

        <input type="password" placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <Link to="/forgot/password">
            <Typography>Forgot Password?</Typography>
        </Link>

        <Button type='submit' >Login</Button>

        <Link to="/register">
            <Typography>New User?</Typography>
        </Link>

    </form>
  
</div>
  )
}

export default Login