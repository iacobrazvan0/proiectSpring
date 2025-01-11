import axios from 'axios';

const BASE_URL = 'http://localhost:9090';  // Modificați acest URL în funcție de backend-ul vostru

// Funcție pentru a obține token-ul din localStorage
const getAuthToken = () => {
  return localStorage.getItem('token'); // Obținem token-ul din localStorage
};

// Funcție pentru a adăuga quizuri
export const addQuiz = (quiz) => {
  const token = getAuthToken();  // Obținem token-ul din localStorage

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}` // Corectăm dublarea Bearer
    }
  };

  return axios.post(`${BASE_URL}/quiz/add`, quiz, config);  // Trimitem cererea POST cu token-ul
};

export const getQuestionsForQuiz = (quizId) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`,
    },
  };

  return axios.get(`${BASE_URL}/question/${quizId}`, config);
};

export const evaluateQuiz = (answeredQuestions) => {
  const token = getAuthToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`,
    },
  };

  return axios.post(`${BASE_URL}/question/evaluate-quiz`, answeredQuestions, config);
};

export const getAllQuizzes = () => {
  const token = getAuthToken(); // Verificăm dacă token-ul există
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };

  return axios.get(`${BASE_URL}/quiz/getAllQuiz`, config); // Trimitem cererea GET cu token-ul
};

export const getQuizzesByCategory = (categoryId) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.get(`${BASE_URL}/quiz/Bycategory/${categoryId}`, config);
};

export const getQuizById = (quizId) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.get(`${BASE_URL}/quiz/${quizId}`, config);
};

export const getAllCategories = () => {
  const token = getAuthToken();  // Obținem token-ul din localStorage
  console.log("Token from localStorage:", token);  // Verifică dacă tokenul este valid

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}` // Corectăm dublarea Bearer
    }
  };

  return axios.get(`${BASE_URL}/category/getAllCategory`, config);  // Trimitem cererea GET cu token-ul
};

export const getQuestionsByQuizId = (quizId) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.get(`${BASE_URL}/question/${quizId}`, config);
};

export const addCategory = (category) => {
  const token = getAuthToken(); // Get the token

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };

  return axios.post(`${BASE_URL}/category/add-category`, category, config); // POST request with token
};

export const addQuestion = (question) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.post(`${BASE_URL}/question/add-questions`, question, config);
};

export const updateQuiz = (quiz) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.put(`${BASE_URL}/quiz/updateQuiz`, quiz, config);
};

export const updateCategory = (category) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.put(`${BASE_URL}/category/updateCategory`, category, config);
};

export const updateQuestion = (question) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.put(`${BASE_URL}/question/update-questions`, question, config);
};

export const deleteQuiz = (quizId) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.delete(`${BASE_URL}/quiz/${quizId}`, config);
};

export const deleteCategory = (categoryId) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.delete(`${BASE_URL}/category/${categoryId}`, config);
};

export const deleteQuestion = (questionId) => {
  const token = getAuthToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token.replace('Bearer ', '')}`, // Corectăm dublarea Bearer
    },
  };
return axios.delete(`${BASE_URL}/question/${questionId}`, config);
};
