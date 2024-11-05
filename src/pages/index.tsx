import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import products from "../../products.json";
import Image from "next/image";
import { Product } from "@/types";
import { addToCart } from "@/helpers";

export default function Home() {
  return (
    <Layout title={`Simple Store`}>
      <div className="grid place-items-center">
        <div
          className={`bg-white mx-6 md:mx-0	grid sm:grid-cols-1 md:grid-cols-2 gap-6 place-items-center min-h-fit mb-4`}
        >
          {products.map((product: Product) => {
            return (
              <div key={product.id} className="flex justify-center">
                <div className="rounded-lg shadow-lg bg-white max-w-sm">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image.url}
                      alt={`Preview of ${product.title}`}
                      className="rounded-t-lg product-img"
                      width={384}
                      height={288}
                    />
                  </Link>
                  <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                      {product.title}
                    </h5>
                    <p className="text-gray-700 text-base mb-4">
                      {product.description}
                    </p>
                    <p className="text-gray-700 text-xl font-bold mb-4">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "GBP",
                      }).format(product.price)}
                    </p>
                    <button
                      type="button"
                      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => {
                        addToCart(product.price, product.id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
