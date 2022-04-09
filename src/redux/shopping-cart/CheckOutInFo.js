
import { createSlice } from "@reduxjs/toolkit";

const   initialState= {
  value: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    phone: '',
    zipcode: '',
    isOk: false,
    products: [],
    price: 0
  },
  order:'',
  orders: '',
}
export const checkOutInfo = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCart: (state, action) => {
      // const res = userRequest.post("/carts/", action.payload);
      state.value = action.payload;
    },
    addOrder: (state, action) => {
      state.order = action.payload;

    },
    getOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    orderClear: (state) => {
      state.orders = ""
      state.order=""
    }
  },
});

export const { addCart,addOrder,getOrdersSuccess,orderClear } = checkOutInfo.actions;
export default checkOutInfo.reducer;

