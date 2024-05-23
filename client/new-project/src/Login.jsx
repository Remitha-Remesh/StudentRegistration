import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
    const[email,SetEmail]=useState()
    const[password,setPassword]=useState()
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/login",{email,password})
        .then(res=>{
            navigate('/')
        }).catch(err=>console.log(err))
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
    <div>
      <div style={{textAlign:"center",marginTop:"10rem"}}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
           
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
                <Link to="register">Register</Link>
            </div>
        </form>
      
  
      
    </div>
    </div>
  )
}

export default Login
