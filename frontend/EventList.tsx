// EventList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const GET_EVENTS = gql`
  query getEvents {
    getEvents {
      id
      name
      description
      ticketLimit
      ticketsSold
    }
  }
`;

const EventList = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.getEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>
              Tickets Sold: {item.ticketsSold} / {item.ticketLimit}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default EventList;