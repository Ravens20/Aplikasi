import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        alert('Token tidak ditemukan. Anda harus login terlebih dahulu.');
        return;
      }

      try {
        const response = await axios.get('http://192.168.1.19:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log('Error fetching profile:', error);
        alert('Gagal mendapatkan data profil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      alert('Token tidak ditemukan. Anda harus login terlebih dahulu.');
      return;
    }

    try {
      const response = await axios.put(
        'http://192.168.1.19:5000/profile', // Endpoint untuk update profile
        {
          username,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profil berhasil diperbarui');
      setUserData(response.data);
      setIsEditing(false); // Berhenti mengedit setelah berhasil
    } catch (error) {
      console.log('Error updating profile:', error);
      alert('Gagal memperbarui profil.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5cb85c" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Profil tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} // Placeholder Image
          style={styles.profileImage}
        />
        <Text style={styles.title}>Profil Pengguna</Text>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleEditProfile}>
              <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Warna latar belakang lembut
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4caf50',
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  editButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  editButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
});

export default Profile;
