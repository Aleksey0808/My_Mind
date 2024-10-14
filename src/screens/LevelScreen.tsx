import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Card from '../components/Card';
import ShowModal from '../components/ShowModal'; 
import { saveData, getData, removeData } from '../utils/storageUtils';

const LevelScreen = ({ route }) => {
  const { backgroundImage, levelImages, levelNumber } = route.params;
  const STORAGE_KEY = `level_${levelNumber}`;

  const generateCards = (images) => {
    const pairs = [...images, ...images].sort(() => Math.random() - 0.5);
    return pairs.map((image, index) => ({
      id: index,
      image,
      flipped: false,
    }));
  };

  const [cards, setCards] = useState(generateCards(levelImages));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

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
        setLives(lives);
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

  useEffect(() => {
    if (showCards) {
      const timer = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({
            ...card,
            flipped: false,
          }))
        );
        setShowCards(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showCards]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      if (cards[first].image === cards[second].image) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === first || index === second ? { ...card, flipped: true } : card
          )
        );

        if (cards.every(card => card.flipped || card.id === first || card.id === second)) {
          setGameWon(true); 
        }
      } else {
        setLives((prevLives) => {
          const newLives = Math.max(prevLives - 1, 0);
          if (newLives === 0) {
            setGameOver(true);
          }
          return newLives;
        });

        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }

      setSelectedCards([]);
    }
  }, [selectedCards, cards]);

  const handleCardPress = (index: number) => {
    if (selectedCards.length < 2 && !cards[index].flipped && !showCards) {
      setSelectedCards((prev) => [...prev, index]);
    }
  };

  const handleRestart = async () => {
    const newCards = generateCards(levelImages);
    setCards(newCards);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setSelectedCards([]);
    setShowCards(true);

    setTimeout(() => {
      setShowCards(false);
    }, 3000);

    await removeData(STORAGE_KEY);
    saveGameState();
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Level {levelNumber}</Text>
        <Text style={styles.lives}>Lives: {lives}</Text>
        {isLoaded ? (
          <View style={styles.cardContainer}>
            {cards.map((card) => (
              <Card
                key={card.id}
                onPress={() => handleCardPress(card.id)}
                flipped={card.flipped || selectedCards.includes(card.id) || showCards}
                image={card.image}
              />
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      <ShowModal
        visible={gameOver}
        message="Game over!"
        onClose={handleRestart}
        buttonText="Start again"
      />

      <ShowModal
        visible={gameWon}
        message="Congratulations! You won!"
        onClose={handleRestart}
        buttonText="Start again"
      />
    </ImageBackground>
  );
};

export default LevelScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  lives: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
