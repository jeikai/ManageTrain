import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({ name: '', age: '', gender: '', phone: '', password: '', station: '' });
  const [stations, setStations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${API_URL}stations`);
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API_URL}employees`, employee);
      router.push('/(employee)');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleStationChange = (stationId) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      station: prevEmployee.station === stationId ? '' : stationId,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={employee.name}
        onChangeText={(text) => setEmployee({ ...employee, name: text })}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={employee.age}
        keyboardType="numeric"
        onChangeText={(text) => setEmployee({ ...employee, age: text })}
      />
      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={employee.gender}
        onChangeText={(text) => setEmployee({ ...employee, gender: text })}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={employee.phone}
        onChangeText={(text) => setEmployee({ ...employee, phone: text })}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={employee.password}
        secureTextEntry
        onChangeText={(text) => setEmployee({ ...employee, password: text })}
      />
      <Text style={styles.label}>Station</Text>
      {stations.map((station) => (
        <View key={station._id} style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, employee.station === station._id && styles.checkboxSelected]}
            onPress={() => handleStationChange(station._id)}>
            <Text style={styles.checkboxLabel}>{station.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Pressable onPress={handleCreate} style={styles.button}>
        <Text style={styles.buttonText}>Create Employee</Text>
      </Pressable>
    </View>
  );
};

export default CreateEmployee;

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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkbox: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#007BFF',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
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
