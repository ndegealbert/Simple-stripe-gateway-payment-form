import { configureStore } from "@reduxjs/toolkit";
import cart_slice_reducer from "./cart-slice";
export default configureStore({
  reducer: {
    cart: cart_slice_reducer,
  },
});
