
import React, { useState } from 'react';
import {Link,useNavigate} from  "react-router-dom";
import axios from 'axios';

function Security2() {
 const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [errors, setErrors] = useState({}); // State for errors

  const questions = { // Pre-defined security questions
    question1: "What is your favourite color?",
    question2: "What highschool did you go to last?",
    question3: "What's your mother's maiden name?",
    question4: "Who's your favourite artiste?",
    question5: "What's your favourite sport?",
  };

  const validateForm = () => {
    const newErrors = {}; // Initialize empty errors object

    // Check if any answer is empty
    Object.keys(answers).forEach((questionKey) => {
      if (!answers[questionKey]) {
        newErrors[questionKey] = "This field is required.";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: event.target.value });
  };

  const securityQuestions = Object.keys(answers).map((questionKey, index) => ({
    question: questions[questionKey],
    answer: answers[questionKey],
  }));


  const handleAnswerQuestions = () => {
    const isValid = validateForm();

    if (!isValid) {
      alert("Please fill in all required fields.");
      return; // Prevent form submission if validation fails
    }

    console.log(securityQuestions)
    axios.post('https://camper-5tkx.onrender.com/api/security-questions/', { security_questions: securityQuestions }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log("Submitted Answers:", response.data);
      alert("Successfully submitted");
      navigate("/passkey");
    })
    .catch(error => {
      console.error("There was an error submitting the answers!", error);
    });
  };
  

  return (
    <div className="container">
      <div className="form-label text-center mb-5">Answer these 5 security questions.</div>
      {Object.keys(questions).map((questionKey, index) => (
        <div key={questionKey} className="mb-5">
          <label className="mb-3" for={questionKey}>{questions[questionKey]}</label>
          <input
            type="text"
            className="form-control"
            name={questionKey}
            id={questionKey}
            aria-describedby="helpId"
            placeholder=""
            value={answers[questionKey]}
            onChange={handleChange}
          />
          {errors[questionKey] && <p style={{ color: 'red' }}>{errors[questionKey]}</p>}
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleAnswerQuestions}>
        Submit Answers
      </button>
    </div>
  );
}

export default Security2;
















// import React, { useState } from "react";

// function Security2() {
//   const [userQuestions, setUserQuestions] = useState([]); // Array for user questions & answers
//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: "",
//     answer: "",
//   }); // State for currently entered question & answer
//   const [errors, setErrors] = useState({}); // State for errors

//   const validateForm = () => {
//     const newErrors = {}; // Initialize empty errors object

//     if (!currentQuestion.question) {
//       newErrors.question = "Please enter a security question.";
//     }
//     if (!currentQuestion.answer) {
//       newErrors.answer = "Please enter an answer for the question.";
//     }

//     // Check if any user-defined questions are empty
//     userQuestions.forEach((question, index) => {
//       if (!question.answer) {
//         newErrors[`userQuestion${index + 1}`] =
//           "Please answer all security questions.";
//       }
//     });

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleAddQuestion = () => {
//     const isValid = validateForm();

//     if (!isValid) {
//       return; // Prevent adding question if validation fails
//     }

//     setUserQuestions([...userQuestions, currentQuestion]);
//     setCurrentQuestion({ question: "", answer: "" }); // Reset current question & answer
//   };

//   const handleChange = (event, field) => {
//     setCurrentQuestion({ ...currentQuestion, [field]: event.target.value });
//   };

//   const handleAnswerQuestions = () => {
//     const isValid = validateForm();

//     if (!isValid) {
//       alert("Please fill in all required fields.");
//       return; // Prevent form submission if validation fails
//     }

//     // Submit the form logic here (assuming you have one)
//     console.log("Submitted Answers:", userQuestions); // Replace with your submission logic
//   };

//   return (
//     <div className="container">
//       <div className="form-label">Define your 5 security questions.</div>
//       <div className="mb-3">
//         <label className="mb-3" for="question">
//           Security Question:
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           name="question"
//           id="question"
//           placeholder="Enter your security question"
//           value={currentQuestion.question}
//           onChange={(e) => handleChange(e, "question")}
//         />
//         {errors.question && <p style={{ color: "red" }}>{errors.question}</p>}
//       </div>
//       <div className="mb-3">
//         <label className="mb-3" for="answer">
//           Answer:
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           name="answer"
//           id="answer"
//           placeholder="Enter your answer"
//           value={currentQuestion.answer}
//           onChange={(e) => handleChange(e, "answer")}
//         />
//         {errors.answer && <p style={{ color: "red" }}>{errors.answer}</p>}
//       </div>
//       <button className="btn btn-primary" onClick={handleAddQuestion}>
//         Add Question
//       </button>

//       {userQuestions.map((question, index) => (
//         <div key={index} className="mt-3">
//           <label>Question {index + 1}:</label>
//           <p>{question.question}</p>
//           <label>Answer:</label>
//           <input
//             type="text"
//             className="form-control"
//             name={`userAnswer${index + 1}`}
//             id={`userAnswer${index + 1}`}
//             placeholder="Enter your answer"
//             value={question.answer}
//             onChange={(e) => {
//               const newUserQuestions = [...userQuestions];
//               newUserQuestions[index].answer = e.target.value;
//               setUserQuestions(newUserQuestions);
//             }}
//           />
//           {errors[`userQuestion${index + 1}`] && (
//             <p style={{ color: "red" }}>{errors[`userQuestion${index + 1}`]}</p>
//           )}
//         </div>
//       ))}

//       <button className="btn btn-primary mt-3" onClick={handleAnswerQuestions}>
//         Submit Answers
//       </button>
//     </div>
//   );
// }

// export default Security2;
