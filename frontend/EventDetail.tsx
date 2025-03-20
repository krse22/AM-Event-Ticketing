import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import { ActivityIndicator, Title, Paragraph, Snackbar, TextInput, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useTypedSelector } from './store';

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


const CREATE_ORDER = gql`
  mutation createOrder($createOrderInput: CreateOrderDto!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
      eventId
      userId
      numberOfTickets
    }
  }
`;

const EventDetail = ({ route, navigation }) => {
  const { id } = route.params; // Get the event ID from route params
  const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: Number(id) },
  });

  const [createOrder] = useMutation(CREATE_ORDER);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const user = useTypedSelector((state) => state.user);

  console.error(JSON.stringify(error, null, 10));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error: {error.message} {id}</Text>;

  const event = data.getEventById;
  const isButtonDisabled = numberOfTickets > event.ticketLimit - event.ticketsSold;

  const handleTicketPurchase = () => {
    createOrder({
      variables: {
        createOrderInput: {
          eventId: Number(event.id),
          userId: Number(user.id),
          numberOfTickets: numberOfTickets,
        },
      },
    })
      .then((response) => {
        navigation.navigate({ name: 'OrderCreated', params: { order: response.data.createOrder }});
      })
      .catch((err) => console.log(JSON.stringify(err, null, 10)));
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Title style={styles.eventTitle}>{event.name}</Title>
      <Paragraph>{event.description}</Paragraph>
      <Paragraph>
        Tickets Sold: {event.ticketsSold} / {event.ticketLimit}
      </Paragraph>

      <TextInput
        label="Number of Tickets"
        keyboardType="numeric"
        value={String(numberOfTickets)}
        onChangeText={(text) => setNumberOfTickets((Number(text)))}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleTicketPurchase}
        disabled={isButtonDisabled}
        style={styles.button}
      >
        Buy {numberOfTickets} Ticket(s)
      </Button>
      {isButtonDisabled && <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>{`Not enough tickets available`}</Snackbar>}

      {/* Snackbar for error */}
      {isButtonDisabled && (
        <Snackbar visible={true} onDismiss={() => setSnackbarVisible(false)}>
          Not enough tickets available
        </Snackbar>
      )}
    </ScrollView>
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
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
});

export default EventDetail;