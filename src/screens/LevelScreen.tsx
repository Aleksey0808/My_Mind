import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Dimensions } from 'react-native';
import Card from '../components/Card';
import ShowModal from '../components/ShowModal';
import Header from '../components/Header';
import { useGameLogic } from '../hooks/useGameLogic';

const LevelScreen = ({ route, navigation }) => {
  const { backgroundImage, levelImages, levelNumber } = route.params;

  const {
    cards,
    lives,
    gameOver,
    gameWon,
    showCards,
    isLoaded,
    handleCardPress,
    handleRestart,
  } = useGameLogic(levelImages, levelNumber);

  const onBackPress = () => {
    navigation.goBack();
  };

  const home = () => {
    navigation.navigate('Home');
  };

  const guessedCards = cards.filter(card => card.matched).length / 2;
  const totalCards = cards.length / 2;

  const numColumns = cards.length > 6 ? 3 : 2;

  const renderCard = ({ item }) => {
    return (
      <Card
        onPress={() => handleCardPress(parseInt(item.id))}
        flipped={item.flipped || showCards}
        image={item.image}
      />
    );
  };

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
              extraData={cards}
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
