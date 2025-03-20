import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import EventList from './EventList';

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <EventList />
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
