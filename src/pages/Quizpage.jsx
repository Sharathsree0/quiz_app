import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quizpage() {
  const [question, setquestion] = useState([]);
  const [index, setindex] = useState(0);
  const [score, setscore] = useState(0);
  const [feedback, setfeedback] = useState(null);
  const [quiztimer, setquiztimer] = useState(10);
  const navi = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:5001/datas");
        setquestion(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchdata();
  }, []);

  const handleanswer = (selectedoptions) => {
    if (feedback) return;
    const currentquestion = question[index];
    if (selectedoptions === currentquestion.answer) {
      setscore(score + 1);
      setfeedback("correct!");
    } else {
      setfeedback("wrong!");
    }
    setTimeout(() => {
      setfeedback(null);
      setindex(index + 1);
    }, 1000);
  };

  useEffect(() => {
    const endtimers = setInterval(() => {
      setquiztimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(endtimers);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(endtimers);
  }, []);

  if (question.length === 0) return <div>Loading...</div>;

  if (quiztimer <= 0 || index >= question.length) {
  const percentage = Math.round((score / question.length) * 100);
  const message =
    percentage === 100
      ? "🎯 Perfect score! You nailed it!"
      : percentage >= 70
      ? "🔥 Great job! You did awesome!"
      : percentage >= 40
      ? "👍 Not bad! Keep practicing!"
      : "💪 Don’t worry! Try again and you’ll improve!";

  return (
    <div className="result-container">
      <div className="result-card">
        <h2 className="result-title">Quiz Completed!</h2>

        <div className="score-circle">
          <span>{percentage}%</span>
        </div>

        <p className="result-text">{message}</p>

        <p className="score-details">
          You scored <strong>{score}</strong> out of {question.length}
        </p>

        <div className="result-buttons">
          <button className="btn" onClick={() => window.location.reload()}>
            🔄 Try Again
          </button>
          <button className="btn btn-secondary" onClick={() => navi("/")}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
  const currentquestions = question[index];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Question {index + 1} of {question.length}</h2>
        <p>Remaining time: {Math.floor(quiztimer / 60)}:{('0' + quiztimer % 60).slice(-2)}</p>
      </div>

      <h3 className="question">{currentquestions.question}</h3>
      {feedback && <h3 className="feedback">{feedback}</h3>}

      <div className="options">
        {currentquestions.options.map((options, i) => (
          <button
            key={i}
            className={`option ${feedback && options === currentquestions.answer ? "selected" : ""}`}
            onClick={() => handleanswer(options)}
            disabled={feedback !== null}
          >
            {options}
          </button>
        ))}
      </div>
    </div>
  );
}
