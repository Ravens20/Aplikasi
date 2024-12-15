import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = [
    { id: 'A', seats: ['A1', 'A2', 'A3', 'A4', 'A5'] },
    { id: 'B', seats: ['B1', 'B2', 'B3', 'B4', 'B5'] },
    { id: 'C', seats: ['C1', 'C2', 'C3', 'C4', 'C5'] },
    { id: 'D', seats: ['D1', 'D2', 'D3', 'D4', 'D5'] },
    { id: 'E', seats: ['E1', 'E2', 'E3', 'E4', 'E5'] },
    { id: 'F', seats: ['F1', 'F2', 'F3', 'F4', 'F5'] },
  ];

  const rows1 = [
    { id: 'A', seats: ['A6', 'A7', 'A8', 'A9', 'A10'] },
    { id: 'B', seats: ['B6', 'B7', 'B8', 'B9', 'B10'] },
    { id: 'C', seats: ['C6', 'C7', 'C8', 'C9', 'C10'] },
    { id: 'D', seats: ['D6', 'D7', 'D8', 'D9', 'D10'] },
    { id: 'E', seats: ['E6', 'E7', 'E8', 'E9', 'E10'] },
    { id: 'F', seats: ['F6', 'F7', 'F8', 'F9', 'F10'] },
  ];

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBuyTicket = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('No seats selected', 'Please select at least one seat.');
    } else {
        Alert.alert('Success', `You have selected: ${selectedSeats.join(', ')}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenIndicatorWrapper}>
        <View style={styles.screenIndicator}>
          <Text style={styles.screenText}>Screen</Text>
        </View>
        <View style={styles.curvedLine} />
        <View style={styles.curvedLineBottom} />
      </View>

      {/* Horizontal scroll container for the whole layout */}
      <ScrollView horizontal contentContainerStyle={styles.horizontalScrollContainer} showsHorizontalScrollIndicator={false}>
        <View style={styles.seatsWrapper}>
          {/* Vertical scroll for rows of seats */}
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {rows.map((row) => (
              <View key={row.id} style={styles.row}>
                <View style={styles.sideColumn} />
                {row.seats.map((seat) => (
                  <TouchableOpacity
                    key={seat}
                    style={
                      selectedSeats.includes(seat)
                        ? [styles.seat, styles.selectedSeat]
                        : styles.seat
                    }
                    onPress={() => toggleSeat(seat)}
                  >
                    <Text style={styles.seatText}>{seat}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.middleColumn} />
                {rows1.find((r) => r.id === row.id)?.seats.map((seat) => (
                  <TouchableOpacity
                    key={seat}
                    style={
                      selectedSeats.includes(seat)
                        ? [styles.seat, styles.selectedSeat]
                        : styles.seat
                    }
                    onPress={() => toggleSeat(seat)}
                  >
                    <Text style={styles.seatText}>{seat}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.sideColumn} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buyButton} onPress={handleBuyTicket}>
        <Text style={styles.buyButtonText}>Buy Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  screenIndicatorWrapper: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  screenIndicator: {
    backgroundColor: '#ccc',
    width: width * 0.8,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 0.9 }],
  },
  screenText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  curvedLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#ddd',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  curvedLineBottom: {
    width: '100%',
    height: 50,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 20,
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
  },
  seatsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: height * 0.03,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  seat: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 4,
  },
  selectedSeat: {
    backgroundColor: '#1e3343',
  },
  seatText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#fff',
  },
  sideColumn: {
    width: width * 0.08,
    height: 30,
    marginHorizontal: width * 0.02,
  },
  middleColumn: {
    width: width * 0.1,
    height: 30,
    marginHorizontal: width * 0.02,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: height * 0.02,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;