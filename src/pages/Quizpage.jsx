import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quizpage() {
const [question,setquestion]=useState([])
  const [index,setindex]=useState(0)
  const [score,setscore]=useState(0)
const navi=useNavigate()
useEffect(()=>{
    const fetchdata=async()=>{
        try{
            const res= await axios.get('http://localhost:5001/datas')
            setquestion(res.data)
        }catch(err){console.error(err)
        }        
    }
    fetchdata()
},[])

const handleanswer=(selectedoptions)=>{
    const currentquestion =question[index]

    if(selectedoptions===currentquestion.answer){
       setscore(score+1);
       alert("correct!")
    }else{alert("wrong!")}

    setindex(index+1)
}

if(question.length===0){return <div>Loding...</div>};

if(index>=question.length){
    return(
        <>
        <h2>Quiz completed </h2>
        <p>your final score is {score} out of {question.length} </p>
        <button onClick={()=>navi("/")} >Back</button>
        </>
    )
}

const currentquestions=question[index];
  return (
    <div>
        <h3>Question {index+1} of {question.length}</h3>
        <h2>{currentquestions.question}</h2>
        <div>
            {currentquestions.options.map((options,i)=>{
               return <button key={i} onClick={()=>handleanswer(options)}>{options}</button>
            })}
        </div>
      
    </div>
  );
}

