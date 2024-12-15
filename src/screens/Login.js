import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');  
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true); 
    setErrorMessage(''); 
    try {
      const response = await axios.post('http://192.168.1.8:5000/login', {
        email,
        password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('username', response.data.username);

        alert('Login berhasil!');
        navigation.navigate('Home');
      } else {
        setErrorMessage('Token tidak tersedia dalam response');
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          'Login gagal, periksa koneksi atau data Anda.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>  
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator color="#FFF" /> 
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.signupText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#000',  
    height: height * 0.3,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#fff',  
    width: 70, 
    height: 70,  
    borderRadius: 40,  
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',  
    marginTop: -height * -0.0,  
  },
  logo: {
    width: 60,  
    height: 60,  
    resizeMode: 'cover', 
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 0, 
    padding: 20,
    paddingTop: 40,  
    marginTop: -40,   
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    width: '100%',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  signupText: {
    color: '#000',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
