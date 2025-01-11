import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/NavbarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import DashboardComponent from './components/DashboardComponent';
import CategoryListComponent from './components/CategoryList';
import QuizList from './components/QuizList';
import QuizAttempt from './components/QuizAttempt';
import CreateQuizComponent from './components/CreateQuizComponent';
import SidebarComponent from './components/SidebarComponent';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MainLayout />
        </div>
      </Router>
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <div style={{ marginTop: '60px', width: '200px', position: 'fixed', top: '0', left: '0' }}>
          <SidebarComponent />
        </div>
      )}
      <div
        style={{
          marginTop: isAuthenticated ? '60px' : '0',
          marginLeft: isAuthenticated ? '200px' : '0',
          flex: 1,
          padding: '20px',
        }}
      >
        <Routes>
          {/* Redirecționează utilizatorul autentificat către dashboard și pe cei neautentificați către login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          
          {/* Rute publice */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

          {/* Rute accesibile pentru toți utilizatorii */}
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/create-quiz" element={<CreateQuizComponent />} />
          <Route path="/categories" element={<CategoryListComponent />} />
          <Route path="/quiz-list" element={<QuizList />} />
          <Route path="/quiz/:quizId" element={<QuizAttempt />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
