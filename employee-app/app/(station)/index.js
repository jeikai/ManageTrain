import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native';
import axios from 'axios';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_URL } from '@env';

const StationList = () => {
    const [stations, setStations] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axios.get(API_URL + 'stations');
            setStations(response.data);
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    const handleEdit = (id) => {
        router.push(`/(station)/${id}`);
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Station',
            'Are you sure you want to delete this station?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(API_URL + `stations/${id}`);
                            fetchStations();
                        } catch (error) {
                            console.error('Error deleting station:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleCreateNewStation = () => {
        router.push('/(station)/create-station');
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} ({item.address})</Text>
            <View style={styles.buttonGroup}>
                <Pressable onPress={() => handleEdit(item._id)} style={styles.editButton}>
                    <Ionicons name="md-create" size={24} color="white" />
                </Pressable>
                <Pressable onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
                    <Ionicons name="md-trash" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={stations}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
            <Pressable onPress={handleCreateNewStation} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create New Station</Text>
            </Pressable>
        </View>
    );
};

export default StationList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    listContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
    },
    createButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    createButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
