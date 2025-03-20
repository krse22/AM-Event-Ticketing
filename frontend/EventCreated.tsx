import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export const GET_EVENT_BY_ID = gql`
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

const EventCreated = ({ route, navigation }) => {
  const { id } = route.params;

  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: Number(id) },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      navigation.navigate('EventList');
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const event = data.getEventById;

  return (
    <View style={styles.container}>
      <Title style={styles.eventTitle}>{event.name}</Title>
      <Paragraph>{event.description}</Paragraph>
      <Paragraph>Tickets Sold: {event.ticketsSold} / {event.ticketLimit}</Paragraph>
    </View>
  );
};

export default EventCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});