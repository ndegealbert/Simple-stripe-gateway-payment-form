import store from "@/store";
import { selectTotal } from "@/store/cart-slice";
import { createSelector } from "@reduxjs/toolkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowCircleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { CartItem } from "@/types";

const Nav = () => {
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

  const cart_items_count = cart.reduce(
    (accumulator: number, item: CartItem) => accumulator + item.quantity,
    0
  );
  return (
    <nav className={`px-2 py-1 bg-white mx-2 my-1 md:mx-4 md:my-6`}>
      <div
        className={`container flex flex-wrap items-center justify-between mx-auto`}
      >
        <div className="flex flex-row gap-2">
          {router.pathname !== "/" && (
            <div className="text-3xl md:text-5xl	hover:underline-offset-auto">
              <FaArrowCircleLeft onClick={() => router.back()} />
            </div>
          )}
          <div className={`text-2xl md:text-4xl	font-bold hover:underline`}>
            <Link href="/">Simple Store</Link>
          </div>
        </div>
        {router.pathname !== "/order" && (
          <Link href="/order">
            <div
              className={`flex flex-row space-x-1 md:space-x-4 hover:underline`}
            >
              <div className="relative inline-flex items-center">
                <FaShoppingCart className="text-2xl md:text-3xl" />
                <strong className="sr-only">Cart</strong>
                {cart.length > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {cart_items_count}
                  </div>
                )}
              </div>
              <span className="text-lg md:text-2xl">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GBP",
                }).format(total)}
              </span>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
