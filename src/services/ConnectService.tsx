import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ConnectService = ({ currentUserUid, otherUserUid }) => {

  const sendConnectRequest = async () => {
    try {
      // Check if a request already exists
      const existingRequest = await firestore().collection('connectRequests')
        .where('senderUid', '==', currentUserUid)
        .where('receiverUid', '==', otherUserUid)
        .get();

      if (!existingRequest.empty) {
        Alert.alert('Request already sent', 'You have already sent a request to this user.');
        return;
      }

      // Add new connect request
      await firestore().collection('connectRequests').add({
        senderUid: currentUserUid,
        receiverUid: otherUserUid,
        status: 'pending',
        timestamp: firestore.FieldValue.serverTimestamp()
      });

      Alert.alert('Request sent', 'Your connect request has been sent successfully.');
    } catch (error) {
      console.error('Error sending connect request:', error);
      Alert.alert('Error', 'Failed to send connect request. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={sendConnectRequest}>
        <Text style={styles.buttonText}>Send Connect Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConnectService;
