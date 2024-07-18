import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import axios from 'axios';
import { useRouter, useSearchParams } from 'expo-router';
import { API_URL } from '@env';

const EditTrain = () => {
  const { id } = useSearchParams();
  const [train, setTrain] = useState({ name: '', capacity: 0 });
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchTrain(id);
    }
  }, [id]);

  const fetchTrain = async (trainId) => {
    try {
      const response = await axios.get(`${API_URL}trains/${trainId}`);
      setTrain(response.data);
    } catch (error) {
      console.error('Error fetching train:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}trains/${id}`, train);
      router.push('/(train)/');
    } catch (error) {
      console.error('Error updating train:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Train Name</Text>
      <TextInput
        style={styles.input}
        value={train.name}
        onChangeText={(text) => setTrain({ ...train, name: text })}
      />
      <Text style={styles.label}>Capacity</Text>
      <TextInput
        style={styles.input}
        value={train.capacity.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setTrain({ ...train, capacity: Number(text) })}
      />
      <Pressable onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Train</Text>
      </Pressable>
    </View>
  );
};

export default EditTrain;

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
