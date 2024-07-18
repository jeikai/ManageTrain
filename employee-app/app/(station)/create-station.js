import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const CreateStation = () => {
  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const router = useRouter();

  const handleCreateStation = async () => {
    try {
      const response = await axios.post(`${API_URL}stations`, {
        name: stationName,
        address: stationLocation,
      });
      if (response.status === 201) {
        Alert.alert('Success', 'Station created successfully');
        router.push('/(station)');
      } else {
        Alert.alert('Error', 'Failed to create station');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while creating the station');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Station</Text>
      <TextInput
        style={styles.input}
        placeholder="Station Name"
        value={stationName}
        onChangeText={setStationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Station Location"
        value={stationLocation}
        onChangeText={setStationLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateStation}>
        <Text style={styles.buttonText}>Create Station</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateStation;

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
