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
        position: 'absolute', // Позволяет наложить логотип на фон
        top: '30%', // Положение логотипа по вертикали
        alignItems: 'center', // Центрирование логотипа
      },
      logo: {
        width: 250, // Ширина логотипа
        height: 250, // Высота логотипа
      },
      buttonContainer: {
        marginBottom: 50, // Отступ от нижней части экрана
      },
      gradientBorder: {
        borderWidth: 2,
        borderRadius: 50, // Овальная форма
        padding: 5, // Отступ для создания эффекта градиентной рамки
        marginBottom: 60,
      },
      button: {
        backgroundColor: '#6EBCF7', // Однотонный цвет фона кнопки
        borderRadius: 50, // Овальная форма
        paddingVertical: 15,
        paddingHorizontal: 50,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white', // Цвет текста
        textAlign: 'center', // Центрирование текста
      },
    });