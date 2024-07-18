import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.age}</Text>
      <Text style={styles.text}>{item.gender}</Text>
      <Text style={styles.text}>{item.phone}</Text>
      <Pressable onPress={() => router.push(`/(employee)/${item._id}`)}>
        <Text style={styles.link}>Edit</Text>
      </Pressable>
      <Pressable onPress={() => handleDelete(item._id)}>
        <Text style={styles.link}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      <Pressable onPress={() => router.push('/(employee)/create-employee')} style={styles.button}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </Pressable>
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  link: {
    color: 'blue',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
