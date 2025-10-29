import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questionsform from './Questionsform';

function AdminDashboard() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5001/datas');
        setQuestions(res.data);
      } catch (err) { console.error("Error fetching data:", err); }
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async (newQuestionData) => {
    try {
      const res = await axios.post('http://localhost:5001/datas', newQuestionData);
      setQuestions([...questions, res.data]); 
    } catch (err) { console.error("Error adding question:", err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:5001/datas/${id}`);
        setQuestions(questions.filter(q => q.id !== id));
      } catch (err) { console.error("Error deleting question:", err); }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <Questionsform onSave={handleAddQuestion} />

      <hr />

      <h2>Existing Questions ({questions.length})</h2>
      <div className="question-list">
        {questions.map(q => (
          <div key={q.id} className="question-manage-item">
            <p>{q.question}</p>
            <button onClick={() => handleDelete(q.id)} className="btn-delete">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
