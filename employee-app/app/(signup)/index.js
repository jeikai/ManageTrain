import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL} from '@env'
const Signup = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const response = await axios.post( API_URL + 'employees', {
                name,
                age: parseInt(age, 10),
                gender,
                phone,
                password
            });
            if (response.status === 201) {
                Alert.alert('Signup Successful', 'Your account has been created');
                router.push('/(login)/');
            } else {
                Alert.alert('Signup Failed', 'An error occurred during registration');
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Signup Error', 'An error occurred during registration');
        }
    };

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    };

    return (
        <ImageBackground source={{ uri: 'https://th.bing.com/th/id/R.6e9cc83438b9c54755aefa382d69c849?rik=mVhNTHlAM22vSg&pid=ImgRaw&r=0' }} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Train Management System Signup</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    placeholderTextColor="#888"
                />
                <Text style={styles.label}>Gender</Text>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, gender === 'male' && styles.checkboxSelected]}
                        onPress={() => handleGenderChange('male')}>
                        <Text style={styles.checkboxText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.checkbox, gender === 'female' && styles.checkboxSelected]}
                        onPress={() => handleGenderChange('female')}>
                        <Text style={styles.checkboxText}>Female</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(login)/')}>
                    <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Signup;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
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
    label: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
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
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
    },
    checkboxText: {
        color: '#000',
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
    backButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
