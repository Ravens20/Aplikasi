import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://192.168.1.19:5000/ticket-history'); // Ganti dengan endpoint API yang sesuai
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching ticket history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ticket History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <Text style={styles.movieTitle}>{item.movieTitle}</Text>
            <Text style={styles.movieDetails}>
              Date: {item.date} - Time: {item.time}
            </Text>
            <Text style={styles.movieDetails}>Seats: {item.seats}</Text>
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
  historyCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDetails: {
    fontSize: 14,
    marginTop: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
