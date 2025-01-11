import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarComponent = () => {
  const [isQuizDropdownOpen, setQuizDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isAttemptQuizDropdownOpen, setAttemptQuizDropdownOpen] = useState(false);
  const role = localStorage.getItem('role');

  const toggleQuizDropdown = () => setQuizDropdownOpen(!isQuizDropdownOpen);
  const toggleCategoryDropdown = () => setCategoryDropdownOpen(!isCategoryDropdownOpen);
  const toggleAttemptQuizDropdown = () => setAttemptQuizDropdownOpen(!isAttemptQuizDropdownOpen);

  return (
    <aside style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px', height: '100vh' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <button
            onClick={toggleQuizDropdown}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Quizzes {isQuizDropdownOpen ? '▲' : '▼'}
          </button>
          {isQuizDropdownOpen && (
            <ul style={{ listStyle: 'none', paddingLeft: '20px', marginTop: '10px' }}>
              <li>
                <Link to="/quiz-list" style={{ textDecoration: 'none', color: '#333' }}>
                  All Quizzes
                </Link>
              </li>
              {role === 'ADMIN' && (
                <li>
                  <Link to="/create-quiz" style={{ textDecoration: 'none', color: '#333' }}>
                    Create Quiz
                  </Link>
                </li>
              )}
              {role === 'USER' && (
                <li>
                  <Link to="/my-quizzes" style={{ textDecoration: 'none', color: '#333' }}>
                    My Quizzes
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>

        {/* Categories Section */}
        <li>
          <button
            onClick={toggleCategoryDropdown}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Categories {isCategoryDropdownOpen ? '▲' : '▼'}
          </button>
          {isCategoryDropdownOpen && (
            <ul style={{ listStyle: 'none', paddingLeft: '20px', marginTop: '10px' }}>
              <li>
                <Link to="/categories" style={{ textDecoration: 'none', color: '#333' }}>
                  All Categories
                </Link>
              </li>
              {role === 'ADMIN' && (
                <li>
                  <Link to="/category-form" style={{ textDecoration: 'none', color: '#333' }}>
                    Create Category
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>

        {/* Attempt Quiz Section */}
        <li>
          <button
            onClick={toggleAttemptQuizDropdown}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Attempt Quiz {isAttemptQuizDropdownOpen ? '▲' : '▼'}
          </button>
          {isAttemptQuizDropdownOpen && (
            <ul style={{ listStyle: 'none', paddingLeft: '20px', marginTop: '10px' }}>
              <li>
                <Link to="/quiz-list" style={{ textDecoration: 'none', color: '#333' }}>
                  Available Quizzes
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default SidebarComponent;
