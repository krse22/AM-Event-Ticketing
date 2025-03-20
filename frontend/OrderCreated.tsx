import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

const OrderPage = ({ route, navigation }) => {
  const { order } = route.params; // Get the order details from the route params

  if (!order) {
    return <Text>Loading...</Text>; // Display a loading message if order data is not available
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Order Confirmation</Title>

      <Paragraph style={styles.details}>
        <Text style={styles.label}>Order Number:</Text> {order.id}
      </Paragraph>
      <Paragraph style={styles.details}>
        <Text style={styles.label}>Event Name:</Text> {order.eventId}
      </Paragraph>
      <Paragraph style={styles.details}>
        <Text style={styles.label}>User ID:</Text> {order.userId}
      </Paragraph>
      <Paragraph style={styles.details}>
        <Text style={styles.label}>Number of Tickets Purchased:</Text> {order.numberOfTickets}
      </Paragraph>

      {/* Add button to return to the home or events page */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')} // You can change this to any page you want to navigate to
        style={styles.button}
      >
        Back to Events
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
});

export default OrderPage;