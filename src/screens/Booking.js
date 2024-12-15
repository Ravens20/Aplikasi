import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BookingForm = ({ selectedMovie, tickets, setTickets, onBooking }) => {
  return selectedMovie ? (
    <View style={styles.bookingForm}>
      <Text style={styles.selectedMovieText}>Selected Movie: {selectedMovie.title}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Number of Tickets"
        value={String(tickets)}
        onChangeText={(value) => setTickets(Number(value))}
      />
      <TouchableOpacity style={styles.bookButton} onPress={onBooking}>
        <Text style={styles.bookButtonText}>Book Tickets</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  bookingForm: {
    marginTop: 20,
    padding: width * 0.05,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedMovieText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#4F63AC', 
    borderWidth: 1,
  },
  bookButton: {
    backgroundColor: '#4F63AC', 
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingForm;
