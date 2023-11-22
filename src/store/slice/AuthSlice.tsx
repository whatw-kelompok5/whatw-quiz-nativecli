import {setAuthToken} from '../../libs/api';
import {createSlice} from '@reduxjs/toolkit';
import {RegisterType} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: RegisterType = {
  fullname: '',
  email: '',
  avatar: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload: any = action.payload;

      setAuthToken(payload.token);
      AsyncStorage.setItem('token', payload.token);

      const user: RegisterType = {
        fullname: payload.fullname,
        email: payload.email,
        avatar: payload.avatar,
      };
      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;
      const user: RegisterType = {
        fullname: payload.fullname,
        email: payload.email,
        avatar: payload.avatar,
      };
      return user;
    },
    AUTH_LOGOUT: () => {
      AsyncStorage.removeItem('token');
      return initialState;
    },
    UPDATE_AVATAR_AND_FULLNAME: (state, action) => {
      const {avatar, fullname} = action.payload;
      state.avatar = avatar;
      state.fullname = fullname;
    },
  },
});

export const {UPDATE_AVATAR_AND_FULLNAME} = authSlice.actions;
