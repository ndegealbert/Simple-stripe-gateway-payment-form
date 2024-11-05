import { createSlice } from "@reduxjs/toolkit";
import { CartAction, CartState, TotalAction } from "@/types";
import products from "../../products.json";

// slice
const initial_state: CartState = {
  total: 0,
  cart: [],
};
export const cart_slice = createSlice({
  name: "Cart Slice",
  initialState: initial_state,
  reducers: {
    increaseTotal: (state: CartState, action: TotalAction) => {
      state.total += action.payload;
    },
    decreaseTotal: (state: CartState, action: TotalAction) => {
      state.total -= action.payload;
    },
    addCartItem: (state: CartState, action: CartAction) => {
      const product = products.find((product) => product.id === action.payload);
      if (!product)
        throw new Error("Unable to add to cart! Product does not exist.");
      const cart_item = state.cart.find(
        (item) => item.product_id === product.id
      );
      if (!cart_item) {
        state.cart.push({
          product_id: product.id,
          quantity: 1,
        });
      } else {
        cart_item.quantity += 1;
      }
    },
    removeCartItem: (state: CartState, action: CartAction) => {
      const index = state.cart.findIndex(
        (item) => item.product_id === action.payload
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    decreaseQty: (state: CartState, action: CartAction) => {
      const cart_item = state.cart.find(
        (item) => item.product_id === action.payload
      );
      if (cart_item) {
        cart_item.quantity -= 1;
      }
    },
    increaseQty: (state: CartState, action: CartAction) => {
      const cart_item = state.cart.find(
        (item) => item.product_id === action.payload
      );
      if (cart_item) {
        cart_item.quantity += 1;
      }
    },
  },
});

// selectors
export const selectTotal = (state: CartState) => state.total;
export const selectCart = (state: CartState) => state.cart;

// actions
export const { increaseTotal, decreaseTotal, addCartItem, removeCartItem, increaseQty, decreaseQty } =
  cart_slice.actions;

// reducer
export default cart_slice.reducer;
