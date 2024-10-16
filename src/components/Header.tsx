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
        {showBackButton && (
          <TouchableOpacity 
            onPress={onBackPress} 
            style={styles.backButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
          >
            <Image source={require('../../assets/images/back.png')} style={styles.image} />
          </TouchableOpacity>
        )}

        {showLogo && (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/miniLogo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        )}

        {showInfoButton && (
          <TouchableOpacity onPress={onInfoPress} style={styles.infoButton}>
            <Image source={require('../../assets/images/info.png')} style={styles.image} />
          </TouchableOpacity>
        )}

        {!showLogo && (
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    height: 100, 
    position: 'relative', 
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20, 
    top: 40,  
    zIndex: 1, 
  },
  logoContainer: {
    position: 'absolute',
    top: 30, 
    left: '50%', 
    transform: [{ translateX: -25 }], 
  },
  logo: {
    width: 62,
    height: 40,
  },
  infoButton: {
    position: 'absolute',
    right: 20, 
    top: 40,  
    zIndex: 1, 
  },
  livesContainer: {
    position: 'absolute',
    left: '45%', 
    top: 40,  
    flexDirection: 'row',
    alignItems: 'center',
  },
  guessedContainer: {
    position: 'absolute',
    right: 20, 
    top: 40,  
    backgroundColor: '#43BCF0',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  livesText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  },
  guessedText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Header;
