import React, { useState, useEffect } from 'react';
import { addQuiz, getAllCategories, addQuestion } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const CreateQuizComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [setCategoryId] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', option1: '', option2: '', option3: '', option4: '', answer: '' },
  ]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [maxMarks, setMaxMarks] = useState(100); // Max marks total setat de utilizator
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        console.log(response.data); // Verifică structura datelor
        setCategories(response.data); // Actualizează lista de categorii
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  
  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId);  // Setează ID-ul categoriei selectate
    
    // Afișează ID-ul categoriei selectate în consola browser-ului
    console.log("Selected category ID:", selectedId);
  };
  

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', option1: '', option2: '', option3: '', option4: '', answer: '' },
    ]);
  };

  const distributeMarks = () => {
    const distributedMarks = maxMarks / questions.length;
    const updatedQuestions = questions.map((q) => ({
      ...q,
      maxMarks: distributedMarks.toFixed(2), // Distribuim punctajul în mod egal
    }));
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      setMessage('You must be logged in to create a quiz!');
      return;
    }
  
    try {
      // Pregătește datele quiz-ului pentru a fi trimise
      const quizData = {
        title: title,  // Obține valorile din formular
        description: description,
        max_marks: maxMarks.toString(),
        number_of_questions: questions.length.toString(),
        category: { cid: selectedCategoryId }, // Trimite categoria ca obiect, nu doar ID-ul
      };
      // Trimite cererea de creare a quiz-ului
      const response = await addQuiz(quizData); 
      
      if (response.status === 200) {
        const quizId = response.data.qid; // Obține ID-ul quiz-ului din răspuns
  
        // Trimite întrebările și opțiunile asociate quiz-ului
        for (const question of questions) {
          const questionData = {
            content: question.questionText,
            quiz: { qid: quizId }, // Asigură-te că se trimite corect ID-ul quiz-ului
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            answer: question.answer,
            maxMarks: question.maxMarks.toString(), // Stochează opțiunea corectă
          };
  
          // Trimite fiecare întrebare
          const questionResponse = await addQuestion(questionData); 
          
          if (questionResponse.status !== 200) {
            // Dacă există o eroare la trimiterea întrebării, afișează un mesaj de eroare
            setMessage('Error creating question. Please try again.');
            return;
          }
        }
  
        // Dacă toate întrebările au fost trimise cu succes, afișează mesajul de succes
        setMessage('Quiz created successfully!');
        
        // Resetează câmpurile formularului
        setTitle('');
        setDescription('');
        setCategoryId('');
        setMaxMarks('');
        setQuestions([{ questionText: '', option1: '', option2: '', option3: '', option4: '', answer: '' }]);
  
        // Navighează către dashboard după succes
        navigate('/dashboard');
      } else {
        // Dacă nu se obține un răspuns 200 de la server
        setMessage('Unexpected server response while creating quiz.');
      }
    } catch (error) {
      // Dacă apare o eroare neașteptată, afișează un mesaj corespunzător
      setMessage('Error creating quiz! Please try again.');
      console.error(error); // Afișează detalii despre eroare în consolă pentru debugging
    }
    console.log("Quiz Data:", {
      title, 
      description, 
      category_cid: selectedCategoryId
    });
  };


  return (
    <div style={{ padding: '20px' }}>
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Quiz Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: '10px', margin: '10px', width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="maxMarks">Total Marks:</label>
          <input
            type="number"
            id="maxMarks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
            required
            style={{ padding: '10px', margin: '10px' }}
          />
          <button type="button" onClick={distributeMarks} style={{ marginLeft: '10px' }}>
            Distribute Marks
          </button>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category_cid"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.cid} value={category.cid}>
                {category.title || 'Unnamed Category'} {/* Afișează titlul, sau un text default */}
              </option>
            ))}
          </select>

    </div>
        <div>
          <h3>Questions:</h3>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} style={{ marginBottom: '20px' }}>
              <div>
                <label htmlFor={`question-${questionIndex}`}>Question Text:</label>
                <input
                  type="text"
                  id={`question-${questionIndex}`}
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                  required
                  style={{ padding: '10px', margin: '10px' }}
                />
              </div>
              <div>
                <label htmlFor={`option1-${questionIndex}`}>Option 1:</label>
                <input
                  type="text"
                  id={`option1-${questionIndex}`}
                  value={question.option1}
                  onChange={(e) => handleQuestionChange(questionIndex, 'option1', e.target.value)}
                  required
                  style={{ padding: '10px', margin: '10px' }}
                />
                <label>
                  Correct:
                  <input
                    type="radio"
                    name={`correct-${questionIndex}`}
                    checked={question.answer === 'option1'}
                    onChange={() => handleQuestionChange(questionIndex, 'answer', 'option1')}
                  />
                </label>
              </div>
              <div>
                <label htmlFor={`option2-${questionIndex}`}>Option 2:</label>
                <input
                  type="text"
                  id={`option2-${questionIndex}`}
                  value={question.option2}
                  onChange={(e) => handleQuestionChange(questionIndex, 'option2', e.target.value)}
                  required
                  style={{ padding: '10px', margin: '10px' }}
                />
                <label>
                  Correct:
                  <input
                    type="radio"
                    name={`correct-${questionIndex}`}
                    checked={question.answer === 'option2'}
                    onChange={() => handleQuestionChange(questionIndex, 'answer', 'option2')}
                  />
                </label>
              </div>
              <div>
                <label htmlFor={`option3-${questionIndex}`}>Option 3:</label>
                <input
                  type="text"
                  id={`option3-${questionIndex}`}
                  value={question.option3}
                  onChange={(e) => handleQuestionChange(questionIndex, 'option3', e.target.value)}
                  required
                  style={{ padding: '10px', margin: '10px' }}
                />
                <label>
                  Correct:
                  <input
                    type="radio"
                    name={`correct-${questionIndex}`}
                    checked={question.answer === 'option3'}
                    onChange={() => handleQuestionChange(questionIndex, 'answer', 'option3')}
                  />
                </label>
              </div>
              <div>
                <label htmlFor={`option4-${questionIndex}`}>Option 4:</label>
                <input
                  type="text"
                  id={`option4-${questionIndex}`}
                  value={question.option4}
                  onChange={(e) => handleQuestionChange(questionIndex, 'option4', e.target.value)}
                  required
                  style={{ padding: '10px', margin: '10px' }}
                />
                <label>
                  Correct:
                  <input
                    type="radio"
                    name={`correct-${questionIndex}`}
                    checked={question.answer === 'option4'}
                    onChange={() => handleQuestionChange(questionIndex, 'answer', 'option4')}
                  />
                </label>
              </div>
              <div>
                <label>Marks for this question:</label>
                <input
                  type="number"
                  value={question.maxMarks}
                  onChange={(e) => handleQuestionChange(questionIndex, 'maxMarks', Number(e.target.value))}
                  required
                  min="0"
                  max="100"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          Create Quiz
        </button>
      </form>
      {message && <p>{message}</p>}

    </div>
  );
};

export default CreateQuizComponent;
