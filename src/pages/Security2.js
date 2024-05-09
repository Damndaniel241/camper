import React, { useState } from "react";

function Security2() {
  const [userQuestions, setUserQuestions] = useState([]); // Array for user questions & answers
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
  }); // State for currently entered question & answer
  const [errors, setErrors] = useState({}); // State for errors

  const validateForm = () => {
    const newErrors = {}; // Initialize empty errors object

    if (!currentQuestion.question) {
      newErrors.question = "Please enter a security question.";
    }
    if (!currentQuestion.answer) {
      newErrors.answer = "Please enter an answer for the question.";
    }

    // Check if any user-defined questions are empty
    userQuestions.forEach((question, index) => {
      if (!question.answer) {
        newErrors[`userQuestion${index + 1}`] =
          "Please answer all security questions.";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    const isValid = validateForm();

    if (!isValid) {
      return; // Prevent adding question if validation fails
    }

    setUserQuestions([...userQuestions, currentQuestion]);
    setCurrentQuestion({ question: "", answer: "" }); // Reset current question & answer
  };

  const handleChange = (event, field) => {
    setCurrentQuestion({ ...currentQuestion, [field]: event.target.value });
  };

  const handleAnswerQuestions = () => {
    const isValid = validateForm();

    if (!isValid) {
      alert("Please fill in all required fields.");
      return; // Prevent form submission if validation fails
    }

    // Submit the form logic here (assuming you have one)
    console.log("Submitted Answers:", userQuestions); // Replace with your submission logic
  };

  return (
    <div className="container">
      <div className="form-label">Define your 5 security questions.</div>
      <div className="mb-3">
        <label className="mb-3" for="question">
          Security Question:
        </label>
        <input
          type="text"
          className="form-control"
          name="question"
          id="question"
          placeholder="Enter your security question"
          value={currentQuestion.question}
          onChange={(e) => handleChange(e, "question")}
        />
        {errors.question && <p style={{ color: "red" }}>{errors.question}</p>}
      </div>
      <div className="mb-3">
        <label className="mb-3" for="answer">
          Answer:
        </label>
        <input
          type="text"
          className="form-control"
          name="answer"
          id="answer"
          placeholder="Enter your answer"
          value={currentQuestion.answer}
          onChange={(e) => handleChange(e, "answer")}
        />
        {errors.answer && <p style={{ color: "red" }}>{errors.answer}</p>}
      </div>
      <button className="btn btn-primary" onClick={handleAddQuestion}>
        Add Question
      </button>

      {userQuestions.map((question, index) => (
        <div key={index} className="mt-3">
          <label>Question {index + 1}:</label>
          <p>{question.question}</p>
          <label>Answer:</label>
          <input
            type="text"
            className="form-control"
            name={`userAnswer${index + 1}`}
            id={`userAnswer${index + 1}`}
            placeholder="Enter your answer"
            value={question.answer}
            onChange={(e) => {
              const newUserQuestions = [...userQuestions];
              newUserQuestions[index].answer = e.target.value;
              setUserQuestions(newUserQuestions);
            }}
          />
          {errors[`userQuestion${index + 1}`] && (
            <p style={{ color: "red" }}>{errors[`userQuestion${index + 1}`]}</p>
          )}
        </div>
      ))}

      <button className="btn btn-primary mt-3" onClick={handleAnswerQuestions}>
        Submit Answers
      </button>
    </div>
  );
}

export default Security2;
