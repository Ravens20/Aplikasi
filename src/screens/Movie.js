import React from 'react';
import { FlatList, Text, Image, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.movieItem} onPress={() => onSelectMovie(item)}>
            <Image style={styles.movieImage} source={{ uri: item.image_url }} />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.moviePrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: width * 0.05, // Padding responsif
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#fff', // Latar belakang item movie
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  movieImage: {
    width: width * 0.25, // Responsif untuk ukuran gambar
    height: height * 0.15,
    marginRight: width * 0.05,
    borderRadius: 8,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moviePrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default MovieList;
