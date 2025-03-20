import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation createEvent($name: String!, $description: String!, $ticketLimit: Int!) {
    createEvent(name: $name, description: $description, ticketLimit: $ticketLimit) {
      name
      description
      ticketLimit
      id
    }
  }
`;

interface ICreateEventReturn {
    createEvent: {
      name: string;
      description: string;
      ticketLimit: number;
      id: string;
    }
}

const AddEvent = ({ navigation }) => {
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ticketLimit, setTicketLimit] = useState('');

  // Mutation hook
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    onCompleted: (data: ICreateEventReturn) => {
      navigation.navigate({ name: "EventCreated", params: {
          id: data.createEvent.id
        } })
    },
  });

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleCreateEvent = async () => {
    try {
      // Submit the form data as variables for the mutation
      await createEvent({
        variables: {
          name,
          description,
          ticketLimit: parseInt(ticketLimit),  // Ensure it's an integer
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Event Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Event Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        label="Ticket Limit"
        value={ticketLimit}
        onChangeText={setTicketLimit}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Error handling */}
      {error && <Paragraph style={styles.errorText}>Error: {error.message}</Paragraph>}

      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <Button
          mode="contained"
          onPress={handleCreateEvent}
          style={styles.button}
        >
          Create Event
        </Button>
      )}
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});