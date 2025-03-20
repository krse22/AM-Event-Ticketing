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

export const { setEvents } = eventSlice.actions;

const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;