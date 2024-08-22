import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './MCQTestPage.css';

const MCQTestPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is C++?', options: ['Programming Language', 'Library', 'Framework'], answer: null },
    { id: 2, text: 'What is a class in C++?', options: ['A user-defined data type', 'A standard library function', 'A keyword'], answer: null },
    { id: 3, text: 'What is the use of the "public" keyword in C++?', options: ['Specifies access level', 'Defines a variable', 'Declares a function'], answer: null },
    { id: 4, text: 'Which of the following is a C++ constructor?', options: ['A special member function', 'A function for input/output', 'A type of loop'], answer: null },
    { id: 5, text: 'What does the "virtual" keyword do in C++?', options: ['Enables runtime polymorphism', 'Declares a constant', 'Defines a data type'], answer: null },
    { id: 6, text: 'What is inheritance in C++?', options: ['A way to create new classes from existing ones', 'A method to manage memory', 'A function for input/output'], answer: null },
    { id: 7, text: 'Which keyword is used to define a constant in C++?', options: ['const', 'static', 'volatile'], answer: null },
    { id: 8, text: 'What is the purpose of the "namespace" keyword in C++?', options: ['Organizes code into logical groups', 'Handles memory allocation', 'Manages file I/O'], answer: null },
    { id: 9, text: 'Which operator is used to access members of a class in C++?', options: ['.', '->', '::'], answer: null },
    { id: 10, text: 'What is a destructor in C++?', options: ['A function that cleans up resources', 'A function that initializes objects', 'A keyword for dynamic memory'], answer: null }
]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const cameraStream = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        cameraStream.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error('Error accessing media devices:', err));

    return () => {
      const tracks = cameraStream.current?.getTracks();
      tracks?.forEach(track => track.stop());
    };
  }, []);

  const toggleCamera = () => {
    if (isCameraOn) {
      const tracks = cameraStream.current?.getVideoTracks();
      tracks?.forEach(track => track.stop());
      setIsCameraOn(false);
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          cameraStream.current = stream;
          setIsCameraOn(true);
        })
        .catch(err => console.error('Error accessing media devices:', err));
    }
  };

  const handleOptionChange = (questionId, option) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, answer: option } : q
    ));
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/finish-test');
  };

  return (
    <div className="mcq-container">
      <div className="mcq-header">
        <h1>MCQ Test</h1>
      </div>
      <div className="mcq-content">
        <div className="mcq-video-section">
          <video
            autoPlay
            playsInline
            muted
            ref={videoRef}
          />
          <button onClick={toggleCamera} title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}>
            <FontAwesomeIcon icon={isCameraOn ? faCamera : faVolumeMute} />
          </button>
        </div>
        <div className="mcq-question-section">
          <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p>{questions[currentQuestionIndex].text}</p>
          <div className="mcq-options">
            {questions[currentQuestionIndex].options.map(option => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name="options"
                  checked={questions[currentQuestionIndex].answer === option}
                  onChange={() => handleOptionChange(questions[currentQuestionIndex].id, option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <div className="mcq-navigation">
            <button onClick={() => handleNavigation('prev')} disabled={currentQuestionIndex === 0}>Previous</button>
            <button onClick={() => handleNavigation('next')} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
          </div>
          <div className="mcq-submit-container">
          <button className="mcq-submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQTestPage;
