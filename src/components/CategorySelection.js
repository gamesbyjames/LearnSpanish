// src/components/CategorySelection.js
import React from 'react';

const CategorySelection = ({ categories, onCategorySelect }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className="category-oval" onClick={() => onCategorySelect(category)}>
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategorySelection;
