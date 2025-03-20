import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import store, { setUser } from './store';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import client from './apolloClient';
import EventList from './EventList';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import EventDetail from './EventDetail';
import { useEffect } from 'react';
import AddEvent from './AddEvent';
import EventCreated from './EventCreated';
import OrderCreated from './OrderCreated';

const Stack = createStackNavigator();

const GlobalHeader = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      {navigation.canGoBack() &&
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      }
      <Appbar.Content title="Event Access Members" />
    </Appbar.Header>
  );
};

const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

// Can be a pre login
function UserLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: 2 }, // Assume any user from DB
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);

  if (loading) {
    return (
      <>
        <GlobalHeader />
        <View>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <GlobalHeader />
        <Text>Error: {error.message}</Text>
      </>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <UserLoader>
              <Stack.Navigator
                screenOptions={{
                  header: () => <GlobalHeader />, // This will apply the global header
                }}
              >
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="EventDetail" component={EventDetail} />
                <Stack.Screen name="AddEvent" component={AddEvent} />
                <Stack.Screen name="EventCreated" component={EventCreated} />
                <Stack.Screen name="OrderCreated" component={OrderCreated} />
              </Stack.Navigator>
            </UserLoader>
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
