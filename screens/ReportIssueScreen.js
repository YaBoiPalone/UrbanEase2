import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { supabase } from '../services/supabase';
import 'react-native-url-polyfill/auto';
import mime from 'mime';

const ReportIssueScreen = ({ user }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('Potholes');
  const [selectedSeverity, setSelectedSeverity] = useState('Moderate');
  const [location, setLocation] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(`Lat: ${loc.coords.latitude} | Long: ${loc.coords.longitude}`);
    })();
  }, []);

  const pickImage = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToSupabase = async (uri, fileName) => {
    try {
      const fileExt = mime.getExtension(mime.getType(uri));
      const filePath = `${fileName}.${fileExt}`;
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { error } = await supabase.storage
        .from('complaint-images')
        .upload(filePath, Buffer.from(base64, 'base64'), {
          contentType: mime.getType(uri),
          upsert: true,
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      const { data: publicURL } = supabase
        .storage
        .from('complaint-images')
        .getPublicUrl(filePath);

      return publicURL.publicUrl;
    } catch (err) {
      console.error('Image upload failed:', err);
      return null;
    }
  };

  const submitComplaint = async () => {
    if (!description || !image || !location) {
      Alert.alert('Please fill all fields and select an image');
      return;
    }

    setUploading(true);

    try {
      const fileName = `complaint_${user?.email?.replace(/[@.]/g, '_')}_${Date.now()}`;
      const imageUrl = await uploadImageToSupabase(image, fileName);

      if (!imageUrl) {
        Alert.alert('Image upload failed');
        setUploading(false);
        return;
      }

      const { error } = await supabase.from('complaints').insert([
        {
          description,
          image_url: imageUrl,
          issue_type: selectedDepartment,
          severity: selectedSeverity,
          location,
          created_at: new Date(),
          user_email: user?.email || 'anonymous',
        },
      ]);

      if (error) {
        console.error('Submit error:', error);
        Alert.alert('Failed to submit complaint');
      } else {
        Alert.alert('Success', 'Complaint submitted successfully!');
        setDescription('');
        setImage(null);
        setSelectedDepartment('Potholes');
        setSelectedSeverity('Moderate');
      }
    } catch (err) {
      console.error('Submit failed:', err);
      Alert.alert('Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#000', flex: 1 }}>
      <Text style={{ color: 'white' }}>Description:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ backgroundColor: '#fff', marginVertical: 8, padding: 8, borderRadius: 8 }}
        placeholder="Describe the issue"
      />

      <Text style={{ color: 'white' }}>Select Image:</Text>
      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
        <TouchableOpacity onPress={() => pickImage('camera')}>
          <Text style={{ color: 'skyblue', marginRight: 16 }}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage('gallery')}>
          <Text style={{ color: 'skyblue' }}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 8 }} />
      )}

      <Text style={{ color: 'white', marginTop: 16 }}>Issue Type:</Text>
      <TextInput
        value={selectedDepartment}
        onChangeText={setSelectedDepartment}
        style={{ backgroundColor: '#fff', marginVertical: 8, padding: 8, borderRadius: 8 }}
        placeholder="e.g., Potholes, Garbage, Spitting"
      />

      <Text style={{ color: 'white' }}>Severity:</Text>
      <TextInput
        value={selectedSeverity}
        onChangeText={setSelectedSeverity}
        style={{ backgroundColor: '#fff', marginVertical: 8, padding: 8, borderRadius: 8 }}
        placeholder="Mild / Moderate / Severe"
      />

      <Text style={{ color: 'white' }}>Location:</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={{ backgroundColor: '#fff', marginVertical: 8, padding: 8, borderRadius: 8 }}
        editable={false}
      />

      {uploading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Submit Complaint" onPress={submitComplaint} />
      )}
    </View>
  );
};

export default ReportIssueScreen;
