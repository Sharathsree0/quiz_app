import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Adminlog() {
    const[formdata,setformdata]=useState({email:"",password:""});
    const navigate = useNavigate(); 

    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    };
    const handlesub = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:5001/users');
            const users = response.data;
            const foundUser = users.find(user => 
                user.email === formdata.email && user.password === formdata.password
            );
            if (foundUser) {
                alert("Login successful!");
                navigate('/admindashboard'); 
            } else {
                alert("Invalid email or password.");
            }

        } catch (err) {
            console.error("Login failed:", err);
            alert("An error occurred during login.");
        }
    };

    return (
        <form onSubmit={handlesub}>
            <h2>Admin Login</h2>
            <label>Email :</label>
            <input type="email" name='email' value={formdata.email} onChange={handlechange} /> <br />
            <label>Password :</label>
            <input type="password" name='password' value={formdata.password} onChange={handlechange} /> <br />
            <button type='submit'>Submit</button>
        </form>
    );
}

export default Adminlog;