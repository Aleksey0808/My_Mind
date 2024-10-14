import * as Location from 'expo-location';

export const getUserGeo = async (): Promise<{ latitude: number; longitude: number }> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const { coords } = await Location.getCurrentPositionAsync({});
  console.log('coords', coords);
  return { latitude: coords.latitude, longitude: coords.longitude };
};

export const determineCountry = (latitude: number, longitude: number): string => {

  const ukraineBounds = {
    north: 52.389,
    south: 44.383,
    east: 40.218,
    west: 22.144,
  };

  if (
    latitude >= ukraineBounds.south &&
    latitude <= ukraineBounds.north &&
    longitude >= ukraineBounds.west &&
    longitude <= ukraineBounds.east
  ) {
    return 'Ukraine';
  }
  return 'Other';
};
