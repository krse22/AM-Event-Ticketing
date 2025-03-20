import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import EventList from './EventList';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import EventDetail from './EventDetail';

const Stack = createStackNavigator();

const GlobalHeader = () => (
  <Appbar.Header>
    <Appbar.Content title="Event Access Members" />
  </Appbar.Header>
);

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Provider store={store}>
          <ApolloProvider client={client}>
              <Stack.Navigator
                screenOptions={{
                  header: () => <GlobalHeader />, // This will apply the global header
                }}
              >
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="EventDetail" component={EventDetail} />
              </Stack.Navigator>
          </ApolloProvider>
        </Provider>
      </PaperProvider>
    </NavigationContainer>
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
