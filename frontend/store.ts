import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventState {
  events: Array<{ id: string; name: string; description: string; ticketsSold: number; ticketLimit: number }>;
}

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventState['events']>) => {
      state.events = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
  },
});

export const { setEvents } = eventSlice.actions;

const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
  },
});

export const { setUser } = userSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store;