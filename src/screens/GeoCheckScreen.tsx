import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native'; 
import * as Location from 'expo-location';
import { getUserGeo, determineCountry } from '../utils/geoUtils';

const GeoCheckScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const checkGeoLocation = async () => {
      try {
        const { latitude, longitude } = await getUserGeo();
        const country = determineCountry(latitude, longitude);

        if (country === 'Ukraine') {
          navigation.navigate('Home'); 
        } else {
          const url = 'https://uk.wikipedia.org';
          Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkGeoLocation();
  }, [navigation]);

  return (
    <View>
      <Text>Geolocation determination...</Text>
    </View>
  );
};

export default GeoCheckScreen;
