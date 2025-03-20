import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

const initialUserState: UserState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  createdAt: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state, ...action.payload, loading: false, error: null };
    },
  },
});


export const { setUser } = userSlice.actions;
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;