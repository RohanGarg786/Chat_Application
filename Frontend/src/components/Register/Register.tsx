import React , {useContext} from 'react'
import { Avatar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css'
import { GlobalStateContext } from '../ContextApi/GlobalStateProvide';

const Register = () => {
    const [name,setName] = React.useState<string>("");
    const [email,setEmail] =React.useState<string>("");
    // const [avatar,setAvatar] = React.useState<string>("");
    const [password,setPassword] = React.useState<string>("");

    const context = useContext(GlobalStateContext);
    if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  const {avatar , setAvatar} = context;

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
    
        if (!file) {
            console.error("No file selected"); // Optional: Log or handle the error
            return; // Exit if no file is selected
          }      
        const Reader = new FileReader();
    
        Reader.onload =()=>{
          if(Reader.readyState == 2){
            const result = Reader.result;
            if (typeof result === 'string') {
                setAvatar(result); // Only call setAvatar if result is a string
              }
          }   
        };
        Reader.readAsDataURL(file);
      }

      const submitHandler = async ()=>{
        await axios.post("/api/v1/register",{name,email,password,avatar},{
            headers:{
                'Content-Type' : "application/json"
            }
        })
      }

  return (
    <div className='register'>
        <form className='registerForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>
                Chatter
            </Typography>

            <Avatar src={avatar} alt='User' sx ={{height:"10vmax" ,width:"10vmax"}} />

            <input type="file" accept='image/*' onChange={handleImageChange} />

            <input type='text' className='registerInputs' placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)}/>

            <input type='email' className='registerInputs' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <input type="password" className='registerInputs' placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <Link to='/'><Typography>Already Signed Up? Login Now</Typography></Link>

            <Button type='submit' >Sign Up</Button>

        </form>
      
    </div>
  )
}

export default Register