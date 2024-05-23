import React, { useState } from 'react'
import axios from "axios"
import {Link,useNavigate} from 'react-router-dom'

const Register = () => {
    const[name,SetName]=useState('')
    const[email,SetEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/register',{name,email,password})
        .then(res=>{
            navigate('/login')
        }).catch(err=>console.log(err))
    }





    const handleName=(e)=>{
        SetName(e.target.value)
        console.log(e.target.value)
    }
    const handleEmail=(e)=>{
        SetEmail(e.target.value)
        console.log(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
        console.log(e.target.value)

    }

    
    

  return (
    <div style={{textAlign:"center",marginTop:"10rem"}}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" id="name" placeholder='Enter your name' onChange={handleName} />
            </div>
            <br />
            <div>
                <input type="email" id="email" placeholder='Enter your email' onChange={handleEmail} />
            </div>
            <br />
            <div>
                <input type="password" id="password" placeholder='Enter your password' onChange={handlePassword}/>
            </div>
            <br />
            <div style={{display:'flex',textAlign:"center",gap:"1rem",justifyContent:"center"}}>
                <button type='submit'>Submitt</button>
                <Link to="login">Login</Link>
            </div>
        </form>
      
    </div>
  )
}

export default Register
