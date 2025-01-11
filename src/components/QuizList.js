import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, getAllQuizzes, getQuizzesByCategory} from '../services/apiService'; // Importă serviciile pentru quizuri
import '../styles/QuizList.css'; // Stiluri pentru lista de quizuri

const QuizListComponent = () => {
  const [quizzes, setQuizzes] = useState([]);  // Starea pentru quiz-uri
  const [categories, setCategories] = useState([]);  // Starea pentru categorii
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);  // Starea pentru quiz-urile filtrate
  const [selectedCategoryId, setSelectedCategoryId] = useState('');  // Starea pentru categoria selectată
  const [loading, setLoading] = useState(true);  // Starea pentru încărcare
  const navigate = useNavigate();


  useEffect(() => {
    // Încarcă quiz-urile și categoriile
    const fetchData = async () => {
      try {
        const [quizResponse, categoryResponse] = await Promise.all([
          getAllQuizzes(),
          getAllCategories(),
        ]);
        setQuizzes(quizResponse.data);
        setCategories(categoryResponse.data);
        setFilteredQuizzes(quizResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        if (error.response) {
          // Detalii suplimentare despre eroare
          console.error('Response error:', error.response.data);
          if (error.response.status === 401) {
            alert('You are not authorized. Please log in again.');
            // Poți face logout automat sau redirecționare către pagina de logare
          }
        } else {
          console.error('Error message:', error.message);
        }
      }
    };
    
    fetchData();
  }, []);  // Apelul se face doar o dată la montarea componentei
   // Apelul se face doar o dată la montarea componentei

   const handleCategoryChange = async (categoryId) => {
    setSelectedCategoryId(categoryId);
  
    if (categoryId === '') {
      // Dacă nu este selectată nicio categorie, afișează toate quiz-urile
      setFilteredQuizzes(quizzes);
    } else {
      // Filtrează quiz-urile pe baza categoriei selectate
      const filtered = await getQuizzesByCategory(categoryId);
      setFilteredQuizzes(filtered.data); // Actualizează quiz-urile filtrate
    }
  };
  

  const handleAttempt = (quizId) => {
    navigate(`/quiz/${quizId}`);  // Navighează la pagina pentru a încerca quiz-ul
  };

  return (
    <div className="quiz-list-container">
      <h1>Quiz List</h1>

      {/* Dropdown pentru filtrare după categorii */}
      <div>
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={selectedCategoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.cid} value={category.cid}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>  // Afișează "Loading..." dacă datele sunt încărcate
      ) : (
        <div className="quiz-grid">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.qid} className="quiz-card">
              <h3>Title: {quiz.title || 'No title available'}</h3>
              <p>Description: {quiz.description || 'No description available'}</p>
              <p>
                <strong>Category:</strong> {quiz.category ? quiz.category.title : 'No category assigned'}
              </p>
              <button
                onClick={() => handleAttempt(quiz.qid)}
                className="attempt-button"
              >
                Attempt Test
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizListComponent;
