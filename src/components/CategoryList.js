import React, { useState, useEffect } from 'react';
import { getAllCategories, addCategory, deleteCategory } from '../services/apiService'; // Import funcțiile relevante

const CategoryListComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  // Fetch categories on component load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCategory(newCategory);
      setCategories([...categories, response.data]); // Add new category to the list
      setNewCategory({ title: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter((category) => category.id !== categoryId)); // Remove deleted category
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newCategory.title}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Create Category</button>
      </form>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <strong>{category.title}</strong>: {category.description}
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryListComponent;
