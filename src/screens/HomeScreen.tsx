import React from 'react';
import { 
  View, 
  Text,
   Button, 
   StyleSheet, 
   ImageBackground, 
   TouchableOpacity, 
   Image, 
  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background/bg1.jpg')} 
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain" 
        />
      </View>
      <View style={styles.buttonContainer}>
        <LinearGradient
        colors={['#43BCF0', '#541896', '#711280']} 
        style={styles.gradientBorder} 
      >
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectLevelScreen')}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
    </ImageBackground>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end', 
      alignItems: 'center',
      },
      logoContainer: {
        position: 'absolute', 
        top: '30%', 
        alignItems: 'center', 
      },
      logo: {
        width: 250, 
        height: 250, 
      },
      buttonContainer: {
        marginBottom: 50,
      },
      gradientBorder: {
        borderWidth: 2,
        borderRadius: 50, 
        padding: 5, 
        marginBottom: 60,
      },
      button: {
        backgroundColor: '#6EBCF7',
        borderRadius: 50, 
        paddingVertical: 15,
        paddingHorizontal: 50,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white', 
        textAlign: 'center', 
      },
    });