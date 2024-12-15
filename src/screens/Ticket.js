import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Ticket() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://192.168.1.19:5000/movies'); // Ganti dengan endpoint API yang sesuai
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleBookTicket = (movie) => {
    // Aksi pemesanan tiket bisa ditambahkan di sini
    alert(`Ticket for ${movie.title} booked!`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleBookTicket(item)}
            >
              <Text style={styles.buttonText}>Book Ticket</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
