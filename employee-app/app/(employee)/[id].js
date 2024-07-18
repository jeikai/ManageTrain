import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter, useSearchParams } from 'expo-router';
import { API_URL } from '@env';

const EditEmployee = () => {
  const { id } = useSearchParams();
  const [employee, setEmployee] = useState({ name: '', age: '', gender: '', phone: '', password: '', station: '' });
  const [stations, setStations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
    fetchStations();
  }, [id]);

  const fetchEmployee = async (employeeId) => {
    try {
      const response = await axios.get(`${API_URL}employees/${employeeId}`);
      setEmployee(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${API_URL}stations`);
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}employees/${id}`, employee);
      router.push('/(employee)/');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleStationChange = (stationId) => {
    console.log(stationId)
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
        value={employee.age.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setEmployee({ ...employee, age: Number(text) })}
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
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setEmployee({ ...employee, password: text })}
      />
      <Text style={styles.label}>Station</Text>
      {stations.map((station) => (
        <View key={station._id} style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, employee?.station?._id === station._id && styles.checkboxSelected]}
            onPress={() => handleStationChange(station._id)}>
            <Text style={styles.checkboxLabel}>{station.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Pressable onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update Employee</Text>
      </Pressable>
    </View>
  );
};

export default EditEmployee;

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
