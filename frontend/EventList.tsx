import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Card, Text, ActivityIndicator, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
  const { data, loading, error, refetch } = useQuery(GET_EVENTS);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleAddEvent = () => {
    navigation.navigate({ name: 'AddEvent', params: {} });
  };

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <FlatList
        data={data.getEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.eventCard} onPress={() => navigation.navigate({ name: 'EventDetail', params: { id: item.id } })}>
            <Card.Content>
              <Title style={styles.eventTitle}>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
              <Paragraph>
                Tickets Sold: {item.ticketsSold} / {item.ticketLimit}
              </Paragraph>
            </Card.Content>
          </Card>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <Button
        mode="contained"
        onPress={handleAddEvent}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Add New Event
      </Button>
    </>

  );
};

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3, // Paper's shadow effect
  },
  eventTitle: {
    marginBottom: 5,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 15,
  },
});

export default EventList;