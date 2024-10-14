import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Header from '../components/Header';
import backgroundImage from '../../assets/images/background/bg.jpg'; 

const RulesScreen = ({ navigation }: { navigation: any }) => {
  const onBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  return (
    <>
    <Header showBackButton={true} onBackPress={onBackPress} />
     <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Rules</Text>
        <Text style={styles.rulesText}>
          Lorem ipsum dolor sit amet consectetur. A ut sit pellentesque vel. 
          Sit tincidunt praesent adipiscing in magna erat enim nec urna. 
          Aliquet volutpat id arcu fames varius mus ultricies mollis. 
          Adipiscing blandit cursus faucibus vel ullamcorper dignissim at...
        </Text>
      </View>
    </ImageBackground>
    </>
   
  );
};

export default RulesScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  rulesText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20, 
  },
});
