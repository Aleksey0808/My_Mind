import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Dimensions } from 'react-native';
import Card from '../components/Card';
import ShowModal from '../components/ShowModal';
import { saveData, getData, removeData } from '../utils/storageUtils';
import Header from '../components/Header';

const LevelScreen = ({ route, navigation }) => {
  const { backgroundImage, levelImages, levelNumber } = route.params;
  const STORAGE_KEY = `level_${levelNumber}`;

  const generateCards = (images) => {
    const pairs = [...images, ...images].sort(() => Math.random() - 0.5);
    return pairs.map((image, index) => ({
      id: index.toString(),
      image,
      flipped: false,
    }));
  };

  const [cards, setCards] = useState(generateCards(levelImages));
  const [selectedCards, setSelectedCards] = useState([]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
      setShowCards(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); 

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;

      if (cards[firstIndex].image === cards[secondIndex].image) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, flipped: true } : card
          )
        );

        if (cards.every(card => card.flipped || card.id === firstIndex.toString() || card.id === secondIndex.toString())) {
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

        const timer = setTimeout(() => {
          setCards(prevCards => prevCards.map((card, index) => {
            if (index === firstIndex || index === secondIndex) {
              return { ...card, flipped: false };
            }
            return card;
          }));
          setSelectedCards([]); 
        }, 1000);

        return () => clearTimeout(timer);
      }
      
      setSelectedCards([]);
    }
  }, [selectedCards, cards]);

  const handleCardPress = (index) => {
    if (selectedCards.length < 2 && !cards[index].flipped && !showCards) {

      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].flipped = true;
        return newCards;
      });
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

    const timer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
      setShowCards(false);
    }, 3000);

    await removeData(STORAGE_KEY);
    saveGameState();

    return () => clearTimeout(timer);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const home = () => {
    navigation.navigate('Home');
  };

  const guessedCards = cards.filter(card => card.flipped).length / 2;
  const totalCards = cards.length / 2;

  const numColumns = cards.length > 6 ? 3 : 2;

  const renderCard = ({ item }) => (
    <Card
      onPress={() => handleCardPress(parseInt(item.id))}
      flipped={item.flipped || selectedCards.includes(parseInt(item.id)) || showCards}
      image={item.image}
    />
  );

  return (
    <>
      <Header
        showBackButton={true}
        showInfoButton={false}
        lives={lives}
        totalCards={totalCards}
        guessedCards={guessedCards}
        onBackPress={onBackPress}
        showLogo={false}
      />

      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.container}>
          {isLoaded ? (
            <FlatList
              data={cards}
              renderItem={renderCard}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
              contentContainerStyle={styles.cardContainer}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>

        <ShowModal
          visible={gameOver}
          message="Game over!"
          onClose={handleRestart}
          buttonText="Start again"
          onBackPress={onBackPress}
          home={home}
        />

        <ShowModal
          visible={gameWon}
          message="Congratulations! You won!"
          onClose={handleRestart}
          buttonText="Start again"
          onBackPress={onBackPress}
          home={home}
        />
      </ImageBackground>
    </>
  );
};

const cardSize = Dimensions.get('window').width / 3 - 20;

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
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default LevelScreen;
