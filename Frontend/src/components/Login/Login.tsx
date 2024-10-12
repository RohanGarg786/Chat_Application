import { Button, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
    const [email,setEmail] =React.useState<string>("");
    const [password,setPassword] =React.useState<string>("")

    const loginHandler = async ()=>{
        await axios.post('/api/v1/login',{email,password},{
            headers:{
                'Content-Type':'applicatio/json'
            }
        })
    }

  return (
    <div className='login'>
    <form className='loginForm' onSubmit={loginHandler}>

        <Typography variant='h3' style={{padding:"2vmax"}}>
            Social Aap
        </Typography>

        <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>

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