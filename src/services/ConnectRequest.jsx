import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ConnectRequest = ({ request, onAccept, onReject }) => {

  const handleAccept = async () => {
    try {
      // Update connect request status to 'accepted'
      await firestore().collection('connectRequests').doc(request.id).update({
        status: 'accepted'
      });

      // Add each other's UID to connections array in users collection
      await firestore().collection('users').doc(request.senderUid).update({
        connections: firestore.FieldValue.arrayUnion(request.receiverUid)
      });

      await firestore().collection('users').doc(request.receiverUid).update({
        connections: firestore.FieldValue.arrayUnion(request.senderUid)
      });

      Alert.alert('Request Accepted', 'You are now connected with this user.');
      onAccept();
    } catch (error) {
      console.error('Error accepting connect request:', error);
      Alert.alert('Error', 'Failed to accept connect request. Please try again later.');
    }
  };

  const handleReject = async () => {
    try {
      // Update connect request status to 'rejected'
      await firestore().collection('connectRequests').doc(request.id).update({
        status: 'rejected'
      });

      Alert.alert('Request Rejected', 'You have rejected the connect request.');
      onReject();
    } catch (error) {
      console.error('Error rejecting connect request:', error);
      Alert.alert('Error', 'Failed to reject connect request. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{request.senderUid} sent you a connect request.</Text>
      <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonReject} onPress={handleReject}>
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonAccept: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginTop: 5,
  },
  buttonReject: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ConnectRequest;
