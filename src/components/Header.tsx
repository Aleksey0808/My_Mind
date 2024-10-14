import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({
  showBackButton,
  showInfoButton,
  lives,
  totalCards,
  guessedCards,
  onBackPress,
  onInfoPress,
  showLogo,
}) => {
  return (
    <LinearGradient
      colors={['#43BCF0', '#571280']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.header}>
        {/* Кнопка "Назад" */}
        {showBackButton && (
          <TouchableOpacity 
            onPress={onBackPress} 
            style={styles.backButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
          >
            <Image source={require('../../assets/images/back.png')} style={styles.image} />
          </TouchableOpacity>
        )}

        <View style={styles.centerContainer}>
          {showLogo ? (
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/miniLogo.png')} 
                style={styles.logo}
              />
            </View>
          ) : (
            <>
              <View style={styles.livesContainer}>
                <Image source={require('../../assets/images/heart.png')} style={styles.image} />
                <Text style={styles.livesText}>{lives}</Text>
              </View>
              <View style={styles.guessedContainer}>
                <Text style={styles.guessedText}>{guessedCards}/{totalCards}</Text>
              </View>
            </>
          )}
        </View>

        {showInfoButton && (
          <TouchableOpacity onPress={onInfoPress} style={styles.infoButton}>
            <Image source={require('../../assets/images/info.png')} style={styles.image} />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    padding: 10,
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  livesText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  },
  guessedContainer: {
    backgroundColor: '#43BCF0',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  guessedText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  infoButton: {
    padding: 10,
  },
});

export default Header;
