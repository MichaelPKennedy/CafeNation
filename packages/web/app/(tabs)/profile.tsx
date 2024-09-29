import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://randomuser.me/api/portraits/men/20.jpg" }}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>Coffee enthusiast | Nature Lover | Tech</Text>

      <View style={styles.infoContainer}>
        <InfoItem icon="map-marker" text="New York, NY" />
        <InfoItem icon="calendar" text="Joined March 2023" />
        <InfoItem icon="coffee" text="47 orders" />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </View>
    </View>
  );
}

function InfoItem({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.infoItem}>
      <FontAwesome name={icon} size={16} color="#666" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "green", // Changed to green
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
