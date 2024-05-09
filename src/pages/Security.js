import React,{ useState } from "react";
import {Link,useNavigate} from  "react-router-dom";
import Header from "../components/Header";


const Security = () => {
    const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    question1: "what is your favourite color?",
    question2: "what highschool did you go to last?",
    question3: "what's your mother's maiden name?",
    question4: "what's your favourite artiste?",
    question5: "what's your favourite sport?"
  })

  const [errors, setErrors] = useState({});

  const handleAnswerQuestions = async () => {
    // Perform validation logic for answers
    // Upon successful validation, generate passkey and redirect to PasskeyPage
    const formErrors = {};
    let hasErrors = false;

    Object.entries(answers).forEach(([question, answer]) => {
        if (!answer.trim()) { // trim() to remove leading/trailing whitespace
            formErrors[question] = 'This field is required';
            hasErrors = true;
          }
      });
      
      setErrors(formErrors);

      if (!hasErrors) {
        // Proceed with answer submission
        // For now, just navigate to the next page
        navigate('/passkey');
      }
    };
  
   
    // navigate('/passkey');
  
    const handleChange = (question, value) => {
        setAnswers({ ...answers, [question]: value });
        // Clear error message when the user starts typing
        setErrors({ ...errors, [question]: '' });
      };

  return (
    <>
    <Header/>
    <div className="form-label">Answer these 5 security questions. they serve as authentication basis for password access</div>
    <div className="d-flex height-100vh flex-column justify-content-center align-items-center ">
    
        <div className="mb-5">
        <label className="mb-3" for="">what is your favourite color?</label>
            <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
                // value=""
                onChange={(e) => handleChange('question1', e.target.value)}
            />
            {errors.question1 && <p style={{ color: 'red' }}>{errors.question1}</p>}
        </div>
        <div className="mb-5">
        <label className="mb-3" for="">what highschool did you go to last?</label>
           <input
               type="text"
               class="form-control"
               name=""
               id=""
               aria-describedby="helpId"
               placeholder=""
            //    value={answers.question2}
               onChange={(e) => handleChange('question2', e.target.value)}
           />
           {errors.question2 && <p style={{ color: 'red' }}>{errors.question2}</p>}
       </div>
       <div className="mb-5">
       <label className="mb-3" for="">what's your mother's maiden name?</label>
           <input
               type="text"
               class="form-control"
               name=""
               id=""
               aria-describedby="helpId"
               placeholder=""
            //    value={answers.question3}
               onChange={(e) => handleChange('question3', e.target.value)}
           />
           {errors.question3 && <p style={{ color: 'red' }}>{errors.question3}</p>}
       </div>
       <div className="mb-5">
       <label className="mb-3" for="">what's your favourite artiste?</label>
           <input
               type="text"
               class="form-control"
               name=""
               id=""
               aria-describedby="helpId"
               placeholder=""
            //    value={answers.question4}
               onChange={(e) => handleChange('question4', e.target.value)}
           />
           {errors.question4 && <p style={{ color: 'red' }}>{errors.question4}</p>}
       </div>
       <div className="mb-5">
       <label className="mb-3" for="">what's your favourite sport?</label>
           <input
               type="text"
               class="form-control"
               name=""
               id=""
               aria-describedby="helpId"
               placeholder=""
            //    value={answers.question5}
               onChange={(e) => handleChange('question5', e.target.value)}
           />
           {errors.question5 && <p style={{ color: 'red' }}>{errors.question5}</p>}
       </div>
        
     
      <button className="btn btn-primary " onClick={handleAnswerQuestions}>Submit Answers</button>
    </div>
    </>
  )
}

export default Security