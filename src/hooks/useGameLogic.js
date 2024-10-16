import { useState, useEffect } from 'react';
import { saveData, getData, removeData } from '../utils/storageUtils';

export const useGameLogic = (levelImages, levelNumber) => {
  const STORAGE_KEY = `level_${levelNumber}`;

  const generateCards = (images) => {
    const pairs = [...images, ...images].sort(() => Math.random() - 0.5);
    return pairs.map((image, index) => ({
      id: index.toString(),
      image,
      flipped: false,
      matched: false,
    }));
  };

  const [cards, setCards] = useState(generateCards(levelImages));
  const [selectedCards, setSelectedCards] = useState([]);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 

  useEffect(() => {
    if (isLoaded) {
      saveGameState();
    }
  }, [lives, cards]);

  const saveGameState = async () => {
    try {
      const gameState = { lives, cards };
      await saveData(STORAGE_KEY, gameState);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadGameState = async () => {
    try {
      const savedState = await getData(STORAGE_KEY);
      if (savedState) {
        const { lives, cards } = savedState;
        setLives(lives > 0 ? lives : 3);
        setCards(cards);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadGameState();
  }, []);

  const handleCardPress = (index) => {
    if (!isProcessing && selectedCards.length < 2 && !cards[index].flipped && !showCards) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].flipped = true;
        return newCards;
      });
      setSelectedCards((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.matched ? card : { ...card, flipped: false }
          )
        );
        setShowCards(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setIsProcessing(true); 
  
      const [firstIndex, secondIndex] = selectedCards;
      const isMatch = cards[firstIndex].image === cards[secondIndex].image;
  
      if (isMatch) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, flipped: true, matched: true }
              : card
          )
        );
        setSelectedCards([]);
        setIsProcessing(false);
  
        if (cards.every(card => card.matched || card.id === firstIndex.toString() || card.id === secondIndex.toString())) {
          setGameWon(true);
        }
      } else {

        const timer = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstIndex || index === secondIndex
                ? { ...card, flipped: false }
                : card
            )
          );
          setSelectedCards([]);
          setIsProcessing(false);
  
          setLives((prevLives) => {
            const newLives = prevLives - 1;
            if (newLives <= 0) {
              setGameOver(true);
              return 0; 
            }
            return newLives;
          });
        }, 1000); 
        return () => clearTimeout(timer);
      }
    }
  }, [selectedCards, cards]);
  
  

  const handleRestart = async () => {
    const newCards = generateCards(levelImages);
    setCards(newCards);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setSelectedCards([]);
    setShowCards(true);
    setIsProcessing(false);

    const timer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
      setShowCards(false);
    }, 3000);

    await removeData(STORAGE_KEY);
    return () => clearTimeout(timer);
  };

  return {
    cards,
    lives,
    gameOver,
    gameWon,
    showCards,
    isLoaded,
    handleCardPress,
    handleRestart,
  };
};
