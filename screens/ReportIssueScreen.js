import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import RNPickerSelect from "react-native-picker-select";
import { uploadComplaint } from "../utils/storage"; // Function to upload complaint
import { useAuth } from "../context/AuthContext"; // Get user authentication info

const ReportIssueScreen = ({ navigation }) => {
  const { user } = useAuth(); // Get logged-in user
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [issueType, setIssueType] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ensure user is defined before proceeding
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>Loading user data...</Text>
      </View>
    );
  }

  // Function to fetch the user's current location **AFTER** capturing an image
  const getLocation = async () => {
    try {
      setLoading(true);

      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please allow location access in Settings.");
        setLoading(false);
        return;
      }

      // Check if location services are enabled
      let isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        Alert.alert("Location Services Disabled", "Enable location services in Settings.");
        setLoading(false);
        return;
      }

      // Fetch location with high accuracy
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);
      console.log("Fetched Location:", loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      Alert.alert("Error Fetching Location", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to capture an image using the camera & THEN fetch location
  const captureImage = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera access is required to take pictures.");
        return;
      }

      // Launch the camera
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      // If user captures an image, fetch the location
      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        await getLocation(); // Wait for location before proceeding
      }
    } catch (error) {
      Alert.alert("Camera Error", error.message);
    }
  };

  // Function to handle complaint submission
  const handleSubmit = async () => {
    if (!description || !image || !issueType || !severity || !location) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const result = await uploadComplaint(user.id, image, description, issueType, severity, location);

      if (result.success) {
        Alert.alert("Success", "Complaint submitted successfully!");
        navigation.navigate("ComplaintHistory");
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Submission Failed", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>Report an Issue</Text>

      <Text style={{ color: "white", marginTop: 10 }}>Description:</Text>
      <TextInput
        style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={{ color: "white", marginTop: 10 }}>Click an Image:</Text>
      <TouchableOpacity onPress={captureImage}>
        <Text style={{ color: "blue" }}>Capture with Camera</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 }} />}

      <Text style={{ color: "white", marginTop: 10 }}>Issue Type:</Text>
      <RNPickerSelect
        onValueChange={setIssueType}
        placeholder={{ label: "Select Issue Type", value: null }}
        items={[
          { label: "Garbage", value: "Garbage" },
          { label: "Spitting", value: "Spitting" },
          { label: "Potholes", value: "Potholes" },
        ]}
      />

      <Text style={{ color: "white", marginTop: 10 }}>Severity:</Text>
      <RNPickerSelect
        onValueChange={setSeverity}
        placeholder={{ label: "Select Severity", value: null }}
        items={[
          { label: "Mild", value: "Mild" },
          { label: "Moderate", value: "Moderate" },
          { label: "Severe", value: "Severe" },
        ]}
      />

      <Text style={{ color: "white", marginTop: 10 }}>Location:</Text>
      <TextInput
        style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
        value={
          loading
            ? "Fetching location..."
            : location
            ? `Lat: ${location.split(",")[0]} | Long: ${location.split(",")[1]}`
            : "(Auto-filled)"
        }
        editable={false}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{ marginTop: 20, padding: 10, backgroundColor: "white", borderRadius: 5 }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportIssueScreen;
