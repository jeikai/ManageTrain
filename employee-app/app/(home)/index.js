import { StyleSheet, Text, View, ScrollView, Pressable, StatusBar } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      router.push("/(login)");
    } catch (error) {
      console.error('Failed to remove user from AsyncStorage', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={styles.gradient}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={styles.headerText}>Train Management System</Text>
            <Pressable onPress={handleLogout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable onPress={() => router.push("/(train)/")} style={styles.pressableButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-train" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Manage Trains</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(home)/trips")} style={styles.pressableButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-bus" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Manage Trips</Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable onPress={() => router.push("/(station)/")} style={styles.pressableButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-business" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Manage Stations</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(home)/employees")} style={styles.pressableButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-people-sharp" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Manage Employees</Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable onPress={() => router.push("/(home)/customers")} style={styles.pressableButton}>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-person" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>View Customers</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutText: {
    color: 'red',
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pressableButton: {
    backgroundColor: "#D3CCE3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600",
    textAlign: "center",
  },
});
