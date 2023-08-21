import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from '../features/slice/authSlice';
import cartReducer from '../features/slice/cartSlice';
import sidebarReducer from '../features/slice/sidebarSlice';
import pizzaReducer from '../features/slice/pizzaSlice';

const reducers = combineReducers({
    auth: authReducer, 
    cart: cartReducer, 
    sidebar: sidebarReducer,
    pizza: pizzaReducer 
});

const persistConfig = {
    key: 'root', 
    storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer, 
    middleware: [thunk]
});

export default store;