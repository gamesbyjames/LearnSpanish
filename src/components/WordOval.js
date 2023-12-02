// src/components/WordOval.js
import React from 'react';

const WordOval = ({ word, onSelectWord }) => {
  const handleSelect = () => {
    onSelectWord(word);
  };

  return (
    <div className="word-oval" onClick={handleSelect}>
      {word}
    </div>
  );
};

export default WordOval;