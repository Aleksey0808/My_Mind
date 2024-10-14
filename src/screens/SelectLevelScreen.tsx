import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { levels } from '../helpers/levels';
import { loadImages } from '../helpers/loadImages';
import Header from '../components/Header';
import backgroundImage from '../../assets/images/background/bg.jpg';

const SelectLevelScreen = ({ navigation }: { navigation: any }) => {
  const handlePress = (level: any) => {
    navigation.navigate('LevelScreen', {
      backgroundImage: level.backgroundImage,
      levelImages: level.levelImages,
      levelNumber: level.levelNumber,
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(item)} 
    >
      {loadImages[item.levelNumber - 1] && ( 
        <Image source={loadImages[item.levelNumber - 1]} style={styles.buttonImage} />
      )}
      <Text style={styles.buttonText}>Level {item.levelNumber}</Text>
    </TouchableOpacity>
  );

  const onBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  const onInfoPress = () => {
    console.log('Info button pressed');
    navigation.navigate('RulesScreen')
  };

  return (
    <>
   <Header 
      showBackButton={false} 
      showInfoButton={true}
      onInfoPress={onInfoPress}
      showLogo={true}
    />

    <ImageBackground source={backgroundImage} style={styles.background}>
       <View style={styles.container}>
      <FlatList
        data={levels} 
        renderItem={renderItem}
        keyExtractor={(item) => item.levelNumber.toString()} 
        numColumns={2} 
      />
    </View>
    </ImageBackground>
    </>
   
  );
};

export default SelectLevelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '45%', 
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#6EBCF7',
  },
  buttonImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
