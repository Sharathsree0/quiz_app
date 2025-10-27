import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quizpage() {
const [question,setquestion]=useState([])
  const [index,setindex]=useState(0)
  const [score,setscore]=useState(0)
  const[feedback,setfeedback]=useState(null)
  const[quiztimer,setquiztimer]=useState(100)
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
if(feedback)return;
    if(selectedoptions===currentquestion.answer){
       setscore(score+1);
       setfeedback("correct!")
    }else{
        setfeedback("wrong!")}
        setTimeout(()=>{
            setfeedback(null);
            setindex(index+1)
        },1000)
}
useEffect(()=>{
    if(quiztimer <= 0 || (question.length > 0 && index >= question.length))return;
        const endtimers =setInterval(()=>{
            setquiztimer(pre=>pre-1)
        },1000)
    return ()=>clearInterval(endtimers)
},[quiztimer,index,question])


if(question.length===0){
    return <div>Loding...</div>};
    const timetaken = 100 -quiztimer;
    const minute= Math.floor(timetaken/60)
    const second = timetaken%60

if(quiztimer<=0 || index>=question.length){
    return(
        <>
        <h2>Quiz completed </h2>
        <h3>Time taken :{minute} minute and {second} seconds</h3>
        <p>your final score is {score} out of {question.length} </p>
        <button onClick={()=>navi("/")} >Back</button>
        </>
    )
}

const currentquestions=question[index];
  return (
    <div>
        <h3>Question {index+1} of {question.length}</h3> <h3>Remining time :{Math.floor(quiztimer/60)}:{quiztimer % 60}</h3>
        <h2>{currentquestions.question}</h2>
        {feedback && <h3>{feedback}</h3> }
        <div>
            {currentquestions.options.map((options,i)=>{
               return <button key={i} onClick={()=>handleanswer(options)}>{options}</button>
            })}
        </div>
      
    </div>
  );
}