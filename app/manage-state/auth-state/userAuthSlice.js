import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userAuthSlice = createSlice({
    name: 'authUser',
    initialState: {
        user: null,
        token:null,
        isLogin : false,
    },
    reducers: {
        authUser:(state, actions) => {
            state.isLogin = actions.payload.isLogin;
            actions.payload.userName ? state.user = actions.payload.userName : '';
            actions.payload.token ? state.token = actions.payload.token : '';
            let login ={
                user:state.user,
                token:state.token
            };
            AsyncStorage.setItem('login',JSON.stringify(login));
        },
        logOut: (state,actions) => {
            // console.log(actions.payload);
            AsyncStorage.clear();
            state.user = null;
            state.token = null;
            state.isLogin=false;
        }
    }
});

export const { authUser, logOut } = userAuthSlice.actions
export default userAuthSlice.reducer