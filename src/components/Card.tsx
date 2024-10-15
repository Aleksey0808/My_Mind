import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

interface CardProps {
  onPress: () => void;
  flipped: boolean;
  image: any; 
}

const Card: React.FC<CardProps> = ({ onPress, flipped, image }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {flipped ? (
        <View style={styles.defaultBackground}>
          <Image source={image} style={styles.image} resizeMode="contain" /> 
        </View>
      ) : (
        <Image source={require('../../assets/images/default.png')} style={styles.image} resizeMode="contain" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '30%', 
    aspectRatio: 1, 
    margin: '2%', 
    maxWidth: 120, 
    maxHeight: 120,
    borderWidth: 4,
    borderColor: '#6EBCF7',  
    borderRadius: 10,  
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  defaultBackground: {
    backgroundColor: '#2E2B42',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
  },
});

export default Card;
