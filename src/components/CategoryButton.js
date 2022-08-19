import React from 'react';

const CategoryButton = ({ selected, category, onPress }) => (
  <button
    onClick={onPress}
    style={{
      border: selected === `${category}` ? "2px solid black" : null,
      textTransform: "capitalize",
    }}
  >
    {category}
  </button>
);

export default CategoryButton;