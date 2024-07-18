import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const CustomerList = () => {
  const [customers, setcustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchcustomers();
  }, []);

  const fetchcustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}customers`);
      setcustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.age}</Text>
      <Text style={styles.text}>{item.gender}</Text>
      <Text style={styles.text}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CustomerList;

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
