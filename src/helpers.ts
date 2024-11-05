import store from "./store";
import { increaseTotal, addCartItem, removeCartItem, decreaseTotal, decreaseQty, increaseQty } from "./store/cart-slice";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { strictEqual } from "assert";
import products from 'products.json'

/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;

export const addToCart = (price: number, product_id: string) => {
  store.dispatch(increaseTotal(price));
  store.dispatch(addCartItem(product_id));
};

export const removeFromCart = (product_id: string) => {
  const cart_item = store.getState().cart.cart.find(
    (item) => item.product_id === product_id
  );
  const product = products.find(
    (product) => product.id === product_id
  );
  if(cart_item && product) {
    store.dispatch(decreaseTotal(cart_item.quantity * product.price));
    store.dispatch(removeCartItem(product_id));
  }
};

export const decreaseCartQty = (product_id: string) => {
  const cart_item = store.getState().cart.cart.find(
    (item) => item.product_id === product_id
  );
  const product = products.find(
    (product) => product.id === product_id
  );
  if(cart_item && product  && cart_item.quantity > 0) {
    store.dispatch(decreaseTotal(product.price));
    store.dispatch(decreaseQty(product_id));
  }
}
export const increaseCartQty = (product_id: string) => {
  const cart_item = store.getState().cart.cart.find(
    (item) => item.product_id === product_id
  );
  const product = products.find(
    (product) => product.id === product_id
  );
  if(cart_item && product) {
    store.dispatch(increaseTotal(product.price));
    store.dispatch(increaseQty(product_id));
  }
}
