import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import axios from 'axios';
import { useRouter, useSearchParams } from 'expo-router';
import { API_URL } from '@env';

const EditStation = () => {
  const { id } = useSearchParams();
  const [station, setStation] = useState({ name: '', address: '' });
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchStation(id);
    }
  }, [id]);

  const fetchStation = async (stationId) => {
    try {
        console.log(stationId)
      const response = await axios.get(`${API_URL}stations/${stationId}`);
      setStation(response.data);
    } catch (error) {
      console.error('Error fetching station:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}stations/${id}`, station);
      router.push('/(station)/');
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Station Name</Text>
      <TextInput
        style={styles.input}
        value={station.name}
        onChangeText={(text) => setStation({ ...station, name: text })}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={station.address}
        onChangeText={(text) => setStation({ ...station, address: text })}
      />
      <Pressable onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Station</Text>
      </Pressable>
    </View>
  );
};

export default EditStation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
