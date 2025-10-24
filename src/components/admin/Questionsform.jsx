import axios from 'axios';
import React, {  useState } from 'react'

export default function Questionsform() {
  const[data,setdata]=useState({question:"",options:["","","",""],answer:""})

const handlequestionchange=(e)=>{
setdata({...data,[e.target.name]:e.target.value})
}

const handleoption =(e,index)=>{
  const newoption=[...data.options];
 newoption[index]=e.target.value;
 setdata({...data,options:newoption})
}

    const handledsub=async(e)=>{
      e.preventDefault();
        try{
            const res= await axios.post('http://localhost:5001/datas',data)
            console.log("successfully added",res.data)
            setdata({question:"",options:["","","",""],answer:""})
        }catch(err){console.error(err)

        }
    }
  return (
    <>
    <form onSubmit={handledsub}>
      <label htmlFor="">Question</label>
    <input type="text" value={data.question} onChange={handlequestionchange} /> <br />
    <hr />
    <label htmlFor="">option 1</label>
    <input type="text" value={data.options[0]} onChange={(e)=>handleoption(e,0)} />
    <label htmlFor="">option 2</label>
    <input type="text" value={data.options[1]} onChange={(e)=>handleoption(e,1)} /> <br />
    <label htmlFor="">option 3</label>
    <input type="text" value={data.options[2]} onChange={(e)=>handleoption(e,2)}  />
    <label htmlFor="">option 4</label>
    <input type="text" value={data.options[3]} onChange={(e)=>handleoption(e,3)} /> <br />
    <label htmlFor="">Answer :</label>
    <input type="text" value={data.answer} onChange={handlequestionchange} /> <br />
      <button type='submit' >Save</button>
    </form>
    </>
  )
}
