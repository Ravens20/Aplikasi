import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35; 
const SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + SPACING;

export default function Home({ navigation }) { 
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const movies = [
    { title: 'Lembayung', image: 'https://link-to-avatar-image.jpg' },
    { title: 'Avenger End Game', image: 'https://link-to-avatar-image.jpg' },
    { title: 'Oppenheimer', image: 'https://link-to-oppenheimer-image.jpg' },
    { title: 'Tenet', image: 'https://link-to-avatar-image.jpg' },
    { title: 'Inception', image: 'https://link-to-avatar-image.jpg' },
  ];

  const loopedMovies = [...movies, ...movies, ...movies];

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const dataLength = movies.length * SNAP_INTERVAL;

    if (offsetX <= 0) {
      flatListRef.current?.scrollToOffset({
        offset: dataLength,
        animated: false,
      });
    } else if (offsetX >= dataLength * 2) {
      flatListRef.current?.scrollToOffset({
        offset: dataLength,
        animated: false,
      });
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: movies.length * SNAP_INTERVAL,
      animated: false,
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.iconAndTextContainer}>
          <Icon name="map-marker" size={20} color="#fff" style={styles.locationIcon} />
          <Text style={styles.sectionTitle}>Pekanbaru</Text>
        </View>

        <View style={styles.iconContainer}>
          {/* Navigasi ke Profile saat ikon ditekan */}
          <TouchableOpacity
            style={styles.iconItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="user" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <Icon name="bell" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Icon name="search" size={18} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies, actors, etc."
            placeholderTextColor="#ccc"
          />
        </View>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <View style={styles.bannerCard}>
          <Image
            source={{ uri: 'https://link-to-your-banner-image.jpg' }}
            style={styles.bannerImage}
          />
        </View>
      </View>

      {/* Card and Now Showing section */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle1}>Now Showing</Text>
        <Animated.FlatList
          ref={flatListRef}
          data={loopedMovies}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingLeft: (width - CARD_WIDTH) / 2.2,
            paddingRight: (width - CARD_WIDTH) / 2,
          }}
          onMomentumScrollEnd={handleScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * SNAP_INTERVAL,
              index * SNAP_INTERVAL,
              (index + 1) * SNAP_INTERVAL,
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1.1, 0.9],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });

            return (
              <View style={styles.movieContainer}>
                <Animated.View style={[styles.movieCard, { transform: [{ scale }] }]}>
                  <Image source={{ uri: item.image }} style={styles.movieImage} />
                  <Text style={styles.movieTitle}>{item.title}</Text>

                  <Animated.View style={[styles.buyTicketButton, { opacity }]}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => navigation.navigate('Seat', { movieTitle: item.title })}
                    >
                      <Text style={styles.buttonText}>Buy Ticket</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              </View>
            );
          }}
        />
      </View>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={20} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Ticket')}
        >
          <Icon name="ticket" size={20} color="#fff" />
          <Text style={styles.navText}>Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
        >
          <Icon name="history" size={20} color="#fff" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    marginLeft: 15,
  },
  searchContainer: {
    marginTop: -10,
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.14,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  searchWrapper: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 35,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 11,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  bannerContainer: {
    marginTop: 90,
    paddingHorizontal: 20,
  },
  bannerCard: {
    width: width * 0.9,
    height: width * 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieContainer: {
    width: CARD_WIDTH,
    alignItems: 'center',
    marginRight: SPACING,
    paddingTop: SPACING,
  },
  movieCard: {
    width: CARD_WIDTH,
    borderRadius: 10,
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buyTicketButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
