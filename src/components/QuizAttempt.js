import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsForQuiz, evaluateQuiz } from '../services/apiService';

const AttemptQuiz = () => {
  const { quizId } = useParams(); // ID-ul quiz-ului din URL
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // Rezultatele quiz-ului

  // Fetch întrebările quiz-ului
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionsForQuiz(quizId);
        console.log('Questions fetched:', response.data); // Verifică datele returnate
        if (response.data && response.data.length > 0) {
          setQuestions(response.data);  // Setează întrebările în stare
        } else {
          throw new Error('No questions found for this quiz.');
        }
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, [quizId]);
  
  
  

  // Gestionare răspunsuri
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption, // Salvează numele opțiunii (option1, option2, etc.)
    }));
  };
  

  // Trimite răspunsurile la backend și calculează punctajul
  const handleSubmit = async () => {
    setSubmitted(true);
  
    const answeredQuestions = questions.map((q) => ({
      quesId: q.quesId,
      givenAnswer: answers[q.quesId]?.trim() || '', // Trimite răspunsul utilizatorului
    }));
  
    console.log("Answered Questions being sent:", answeredQuestions);
  
    try {
      const response = await evaluateQuiz(answeredQuestions); // Funcția din apiService.js
      const { correctAnswers, attempted, marksObtained } = response.data;
  
      // Adăugăm răspunsurile utilizatorului la întrebările inițiale
      const updatedQuestions = questions.map((q) => {
        const userAnswer = answeredQuestions.find((a) => a.quesId === q.quesId)?.givenAnswer || "Not Attempted";
        return { ...q, givenAnswer: userAnswer };
      });
  
      // Setăm rezultatele și întrebările actualizate
      setResult({
        correctAnswers,
        attempted,
        marksObtained: (correctAnswers / questions.length) * 100, // Procentaj obținut
        questions: updatedQuestions,
      });
  
      console.log('Quiz results:', response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz. Please try again.');
    }
  };
  
  
  // Afișăm conținutul
  return (
    <div>
      <h1>Attempt Quiz</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : submitted && result ? (
        <div>
          <h2>Quiz Results</h2>
          <p>
            Marks Obtained: <strong>{result.marksObtained.toFixed(2)}%</strong>
          </p>
          <p>
            Correct Answers: {result.correctAnswers} / {questions.length}
          </p>
          <p>Attempted: {result.attempted}</p>
          <h3>Review Questions:</h3>
          {result.questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p>
                <strong>Question:</strong> {q.content || "No content available"}
              </p>
              <p>
                <strong>Correct Answer:</strong> {q.answer || "No correct answer"}
              </p>
              <p>
                <strong>Your Answer:</strong> {q.givenAnswer || "Not Attempted"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            {questions.map((question) => (
              <div key={question.quesId}>
                <p>{question.content}</p>
                {['option1', 'option2', 'option3', 'option4'].map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      name={`question_${question.quesId}`}
                      value={option}
                      checked={answers[question.quesId] === option}
                      onChange={() => handleAnswerChange(question.quesId, option)}
                    />
                    <label>{question[option]}</label>
                  </div>
                ))}
              </div>
            ))}
            <button type="button" onClick={handleSubmit}>Submit Answers</button>
          </form>
        </div>
      )}
    </div>
  );
  
  
  
};

export default AttemptQuiz;
