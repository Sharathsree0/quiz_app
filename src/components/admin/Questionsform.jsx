import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Questionsform() {
  const[data,setdata]=useState([])

    useEffect(()=>{
    const fetchdata=async()=>{
        try{
            const res= await axios.get('http://localhost:5001/datas')
            setdata(res.data)
        }catch(err){console.error(err)

        }
        fetchdata();
    }},[]);
  return (
    <>
     

    </>
  )
}
