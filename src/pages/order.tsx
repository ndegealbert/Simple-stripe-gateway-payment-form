import store from "@/store";
import { increaseQty, selectTotal } from "@/store/cart-slice";
import { createSelector } from "@reduxjs/toolkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowCircleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { CartItem, Product } from "@/types";
import products from "../../products.json";
import getStripe, {
  decreaseCartQty,
  increaseCartQty,
  removeFromCart,
} from "@/helpers";
import Layout from "@/components/Layout";

const Order = () => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setTotal(store.getState().cart.total);
    setCart(store.getState().cart.cart);
  }, []);

  store.subscribe(() => {
    setTotal(store.getState().cart.total);
    setCart(store.getState().cart.cart);
  });

  const router = useRouter();

  return (
    <Layout title={`Checkout - Simple Store`}>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shadow-md my-10">
          <div className="bg-white px-10 py-10 md:col-span-2">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{`${cart.length} Item(s)`}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cart.map((item: CartItem) => {
              const product = products.find(
                (product) => product.id === item.product_id
              );
              if (!product) throw new Error("Product does not exist");
              return (
                <div
                  key={product.id}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    <div className="w-20 hidden md:block">
                      <img className="h-24" src={product.image.url} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{product.title}</span>
                      <span className="text-red-500 text-xs hidden md:block">
                        {product.description}
                      </span>
                      <button
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        onClick={() => {
                          removeFromCart(item.product_id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <button
                      onClick={() => {
                        decreaseCartQty(item.product_id);
                        if (item.quantity === 1)
                          removeFromCart(item.product_id);
                      }}
                    >
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>

                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.quantity}
                      readOnly
                    />

                    <button
                      onClick={() => {
                        console.log("clicked");
                        increaseCartQty(item.product_id);
                      }}
                    >
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "GBP",
                    }).format(product.price)}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "GBP",
                    }).format(product.price * item.quantity)}
                  </span>
                </div>
              );
            })}
            <Link
              href="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items ({cart.length})
              </span>
              <span className="font-semibold text-sm">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GBP",
                }).format(total)}
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>{`Standard shipping - ${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GBP",
                }).format(10)}`}</option>
              </select>
            </div>
            {/**TODO: Add functionalityy for promo code */}
            {/* <div className="py-10">
          <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" value='' />
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button> */}
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "GBP",
                  }).format(total + 10)}
                </span>
              </div>
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full disabled:opacity-25"
                disabled={cart.length < 1}
                onClick={() => {
                  const url = "/api/checkout";
                  fetch(url, {
                    method: "POST",
                    redirect: "follow",
                    body: JSON.stringify(cart),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                  })
                    .then((response) => response.json())
                    .then(async (response) => {
                      if (response.statusCode === 500)
                        throw new Error(response.message);
                      // Redirect to Checkout.
                      const stripe = await getStripe();
                      console.log(response.id);
                      const { error } = await stripe!.redirectToCheckout({
                        sessionId: response.id,
                      });
                      console.error(error);
                    })
                    .catch(function (err) {
                      console.error(err + " url: " + url);
                    });
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
