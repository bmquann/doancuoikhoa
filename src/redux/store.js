import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./UserRedux";
import productReducer from "./ProductRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productModalReducer from './product-modal/productModalSlice'

import cartItemsReducer from './shopping-cart/cartItemsSlide'

import checkoutReducer from './shopping-cart/CheckOutInFo'



const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ user: userReducer, cartItems: cartItemsReducer, productModal: productModalReducer, product: productReducer, checkout: checkoutReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// export const store = configureStore({
//     reducer: {
//         productModal: productModalReducer,
//         cartItems: cartItemsReducer
//     },
// })