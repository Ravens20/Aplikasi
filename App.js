import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Ticket from './src/screens/Ticket';
import History from './src/screens/History';
import Profile from './src/screens/Profile';  // Impor Profile
import Toast from 'react-native-toast-message';
import Seat from './src/screens/Seat';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Ticket" component={Ticket} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Seat" component={Seat} />
        </Stack.Navigator>

        {/* Toast untuk notifikasi global */}
        <Toast position="Top" />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    overflow: 'hidden',
  },
});

export default App;
