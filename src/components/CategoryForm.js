import React, { useState, useEffect } from "react";
import { addCategory, updateCategory, getCategoryById } from "../services/apiService";

const CategoryForm = ({ categoryId, onSave }) => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (categoryId) {
      getCategoryById(categoryId)
        .then((response) => setCategory(response.data))
        .catch((error) => console.error("Error fetching category:", error));
    }
  }, [categoryId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryId) {
      updateCategory(category)
        .then(() => onSave())
        .catch((error) => console.error("Error updating category:", error));
    } else {
      addCategory(category)
        .then(() => onSave())
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={category.title}
        onChange={(e) => setCategory({ ...category, title: e.target.value })}
        placeholder="Category Title"
        required
      />
      <input
        type="text"
        value={category.description}
        onChange={(e) => setCategory({ ...category, description: e.target.value })}
        placeholder="Category Description"
        required
      />
      <button type="submit">{categoryId ? "Update" : "Add"} Category</button>
    </form>
  );
};

export default CategoryForm;
