import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quizpage() {
    const [question, setquestion] = useState([])
    const [index, setindex] = useState(0)
    const [score, setscore] = useState(0)
    const [feedback, setfeedback] = useState(null)
    const [quiztimer, setquiztimer] = useState(100)
    const navi = useNavigate()

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get('http://localhost:5001/datas')
                setquestion(res.data)
            } catch (err) { console.error(err) }
        }
        fetchdata()
    }, [])

    const handleanswer = (selectedoptions) => {
        if (feedback) return;
        const currentquestion = question[index]
        if (selectedoptions === currentquestion.answer) {
            setscore(score + 1);
            setfeedback("correct!")
        } else {
            setfeedback("wrong!")
        }
        setTimeout(() => {
            setfeedback(null);
            setindex(index + 1)
        }, 1000) 
    }
    useEffect(() => {
        const endtimers = setInterval(() => {
            setquiztimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(endtimers); 
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        return () => clearInterval(endtimers);
    }, []);
    if (question.length === 0) { return <div>Loding...</div> };
    if (quiztimer <= 0 || index >= question.length) {
        return (
            <>
                <h2>Quiz completed</h2>
                <p>Your final score is {score} out of {question.length}</p>
                <button onClick={() => navi("/")} >Back</button>
            </>
        )
    }
    const currentquestions = question[index];
    return (
        <div>
            <h3>Question {index + 1} of {question.length}</h3> <h3>Remaining time: {Math.floor(quiztimer / 60)}:{('0' + quiztimer % 60).slice(-2)}</h3>
            <h2>{currentquestions.question}</h2>
            {feedback && <h3>{feedback}</h3>}
            <div>
                {currentquestions.options.map((options, i) => {
                    return <button key={i} onClick={() => handleanswer(options)} disabled={feedback !== null}>{options}</button>
                })}
            </div>
        </div>
    );
}   