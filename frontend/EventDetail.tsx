import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { ActivityIndicator, Title, Paragraph } from 'react-native-paper';

const GET_EVENT_BY_ID = gql`
  query getEventById($id: Int!) {
    getEventById(id: $id) {
      id
      name
      description
      ticketLimit
      ticketsSold
    }
  }
`;

const EventDetail = ({ route }) => {
  const { id } = route.params; // Get the event ID from route params
  const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: Number(id) },
  });

  // console.error(JSON.stringify(error, null, 10));

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error: {error.message} {id}</Text>;

  const event = data.getEventById;

  return (
    <View style={styles.container}>
      <Title style={styles.eventTitle}>{event.name}</Title>
      <Paragraph>{event.description}</Paragraph>
      <Paragraph>
        Tickets Sold: {event.ticketsSold} / {event.ticketLimit}
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default EventDetail;