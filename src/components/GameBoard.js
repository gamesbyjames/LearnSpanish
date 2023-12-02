// src/components/GameBoard.js
import React, { useState, useEffect } from 'react';
import WordOval from './WordOval';
import CategorySelection from './CategorySelection';
import phrasesByCategory from '../data/phrases';

// Function to shuffle the words
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  
  return array;
};

const GameBoard = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (currentCategory && phrasesByCategory[currentCategory]) {
      const phrases = phrasesByCategory[currentCategory];
      if (currentPhraseIndex < phrases.length) {
        const spanishWords = phrases[currentPhraseIndex].spanish.split(' ');
        setShuffledWords(shuffleArray(spanishWords));
        setSelectedWords([]);
      } else {
        clearInterval(intervalId); // Stop the timer
        setGameOver(true);
      }
    }
  }, [currentPhraseIndex, currentCategory, intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
    setCurrentPhraseIndex(0);
    setGameOver(false);
    setTimer(0); // Reset timer
    const id = setInterval(() => {
        setTimer(oldTimer => oldTimer + 1);
    }, 1000); // Update timer every second
  setIntervalId(id);
  };

  const handleSelectWord = (word) => {
    const correctOrder = phrasesByCategory[currentCategory][currentPhraseIndex].spanish.split(' ');
    if (word === correctOrder[selectedWords.length]) {
      const newSelectedWords = [...selectedWords, word];
      setSelectedWords(newSelectedWords);
  
      // Check if the user has selected all words correctly
      if (newSelectedWords.length === correctOrder.length) {
        setCurrentPhraseIndex(currentPhraseIndex + 1); // Move to the next phrase
      } else {
        // Update shuffledWords to remove the word that was just selected
        setShuffledWords(shuffledWords.filter(w => w !== word));
      }
    } else {
      // Optionally reset the current phrase on incorrect selection
      setSelectedWords([]);
      setShuffledWords(shuffleArray(correctOrder));
    }
  };

  const handleRestart = () => {
    setCurrentCategory(null);
    setCurrentPhraseIndex(0);
    setSelectedWords([]);
    setShuffledWords([]);
    setGameOver(false);
    clearInterval(intervalId); // Stop the timer
    setTimer(0); // Reset timer
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentCategory) {
    return (
      <CategorySelection
        categories={Object.keys(phrasesByCategory)}
        onCategorySelect={handleCategorySelect}
      />
    );
  }

  /*if (gameOver) {
    return (
      <div>
        Category complete! Select a new category.
        <button onClick={handleRestart}>Back to Categories</button>
      </div>
    );
  }*/

  // This check prevents the error when all phrases are completed
  if (gameOver) {
    const timeTaken = formatTime(timer);
    return (
        <div>
        <div>Category complete! Time taken: {timeTaken}.</div>
        <div>Select a new category.</div>
      <button onClick={handleRestart}>Back to Categories</button>
      </div>
    );
  }

  // Check if there are no more phrases in the current category
  if (!currentCategory || currentPhraseIndex >= phrasesByCategory[currentCategory].length) {
    return null; // or handle this scenario appropriately
  }

  const currentPhrase = phrasesByCategory[currentCategory][currentPhraseIndex];
  
  return (
    <div className="game-container">
        <div>Time: {formatTime(timer)}</div>
      {shuffledWords.map((word, index) => (
        <WordOval key={index} word={word} onSelectWord={handleSelectWord} />
      ))}
      <div className="translation">{currentPhrase.english}</div>
    </div>
  );
};

export default GameBoard;
