import axios from 'axios'
import React, { useState } from 'react'

function Adminlog() {
    const[formdata,setformdata]=useState({name:"",email:"",password:""})
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
        <input type="email" /> <br />
        <label htmlFor="">Password :</label>
        <input type="password" /> <br />
        <button type='submit' >Submit</button>
    </form>

    </>
  )
}

export default Adminlog