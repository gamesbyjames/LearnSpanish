// src/components/WordOval.js
import React, { useEffect, useState } from 'react';

const WordOval = ({ word, onSelectWord }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const maxWidth = window.innerWidth - 50; // 50 or the width of the oval
    const maxHeight = window.innerHeight - 50; // 50 or the height of the oval
  
    const top = Math.random() * maxHeight;
    const left = Math.random() * maxWidth;
  
    setPosition({ top, left });
  }, [word]); // Recalculate position when the word changes

  return (
    <div 
  className="word-oval" 
  style={{ top: position.top + 'px', left: position.left + 'px' }} 
  onClick={() => onSelectWord(word)}
>
  {word}
</div>
  );
};

export default WordOval;
