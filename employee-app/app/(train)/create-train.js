import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const CreateTrain = () => {
  const [trainName, setTrainName] = useState('');
  const [capacity, setCapacity] = useState('');
  const router = useRouter();

  const handleCreateTrain = async () => {
    try {
      const response = await axios.post(`${API_URL}trains`, {
        name: trainName,
        capacity: Number(capacity),
        trip: []
      });
      if (response.status === 201) {
        Alert.alert('Success', 'Train created successfully');
        router.push('/(train)'); 
      } else {
        Alert.alert('Error', 'Failed to create train');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while creating the train');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Train</Text>
      <TextInput
        style={styles.input}
        placeholder="Train Name"
        value={trainName}
        onChangeText={setTrainName}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateTrain}>
        <Text style={styles.buttonText}>Create Train</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTrain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
