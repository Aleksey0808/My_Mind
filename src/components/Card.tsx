import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface CardProps {
  onPress: () => void;
  flipped: boolean;
  image: any; 
}

const Card: React.FC<CardProps> = ({ onPress, flipped, image }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {flipped ? (
        <Image source={image} style={styles.image} />
      ) : (
        <Image source={require('../../assets/images/default.png')} style={styles.image} /> 
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%', 
    aspectRatio: 1, 
    margin: '1%', 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default Card;
