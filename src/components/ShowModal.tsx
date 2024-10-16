import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const ShowModal = ({ visible, message, onClose, buttonText, onBackPress, home }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          
          <LinearGradient
            colors={['#2BD5E8', '#8864E8']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.modalContent}
          >
            <Text style={styles.modalText}>{message}</Text>

            <TouchableOpacity onPress={onClose} style={styles.buttonContainer}>
              <LinearGradient
                colors={['#43BCF0', '#541896', '#711280']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={home} style={styles.iconButton}>
              <Image source={require('../../assets/images/modalIcons/home.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
              <Image source={require('../../assets/images/modalIcons/back.png')} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 280,
    height: 180,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    width: 160,
    height: 70,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 300, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
});

export default ShowModal;
