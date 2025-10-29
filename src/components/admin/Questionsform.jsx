import axios from 'axios';
import React, { useState } from 'react';

export default function Questionsform() {
    const [data, setdata] = useState({ question: "", options: ["", "", "", ""], answer: "" });

    const handlequestionchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const handleoption = (e, index) => {
        const newoption = [...data.options];
        newoption[index] = e.target.value;
        setdata({ ...data, options: newoption });
    };

    const handledsub = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/datas', data);
            console.log("Successfully added:", res.data);
            setdata({ question: "", options: ["", "", "", ""], answer: "" });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handledsub}>
            <h2 style={{ textAlign: "center", color: "#7a5cf1", marginBottom: "15px" }}>Add a New Question 📝</h2>

            <label>Question</label>
            <input
                type="text"
                name="question"
                value={data.question}
                onChange={handlequestionchange}
                placeholder="Enter your question"
            />

            <hr />

            {data.options.map((opt, i) => (
                <div key={i}>
                    <label>Option {i + 1}</label>
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleoption(e, i)}
                        placeholder={`Enter option ${i + 1}`}
                    />
                </div>
            ))}

            <label>Answer</label>
            <input
                type="text"
                name="answer"
                value={data.answer}
                onChange={handlequestionchange}
                placeholder="Enter correct answer"
            />

            <button type="submit">💾 Save Question</button>
        </form>
    );
}
