import axios from 'axios'
import React, { useState } from 'react'

function Adminlog() {
    const[formdata,setformdata]=useState({name:"",email:"",password:""})
    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
const handlesub=async(e)=>{
 e.preventDefault()
try{
    const res= await axios.post('http://localhost:5001/users',formdata)
    console.log("successfully added",res.data)
    setformdata({name:"",email:"",password:""})
}catch(err){console.error(err)}
}
  return (
    <>
    <form onSubmit={handlesub}>
        <h2>Admin login</h2>
        <label htmlFor="">Email :</label>
        <input type="email" name='email' value={formdata.email} onChange={handlechange} /> <br />
        <label htmlFor="">Password :</label>
        <input type="password" name='password' value={formdata.password} onChange={handlechange} /> <br />
        <button type='submit' >Submit</button>
    </form>

    </>
  )
}

export default Adminlog