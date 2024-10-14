import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Не забудьте установить expo-vector-icons

const Header = ({ title, onBackPress, onNextPress, lives, totalCards, guessedCards }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {title === 'Game' ? (
        <>
          <Text style={styles.title}>MyGame</Text>
          <TouchableOpacity onPress={onNextPress} style={styles.nextButton}>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.gameInfo}>
          <View style={styles.livesContainer}>
            <Ionicons name="heart" size={24} color="white" />
            <Text style={styles.lives}>{lives}</Text>
          </View>
          <Text style={styles.guessed}>{guessedCards}/{totalCards}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333', // Цвет фона
  },
  title: {
    fontSize: 24,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
  },
  nextButton: {
    padding: 10,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  lives: {
    color: 'white',
    marginLeft: 5,
  },
  guessed: {
    color: 'white',
  },
});

export default Header;
