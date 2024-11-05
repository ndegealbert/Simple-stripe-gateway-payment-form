// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import products from "../../../products.json";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (Array.isArray(req.body)) {
        const line_items = req.body.map((cart_item, index) => {
          if (
            "product_id" in cart_item &&
            typeof cart_item.product_id === "string" &&
            "quantity" in cart_item &&
            typeof cart_item.quantity === "number"
          ) {
            const product: Product | undefined = products.find(
              (product) => product.id === cart_item.product_id
            );
            if (!product)
              throw new Error(
                `Unable to find product with the id provided in cart item ${
                  index + 1
                }`
              );
            return {
              price_data: {
                currency: "gbp",
                product_data: {
                  images: [`${req.headers.origin}${product.image.url}`],
                  name: product.title,
                },
                unit_amount: product.price * 100,
              },
              quantity: cart_item.quantity,
            };
          } else
            throw new Error(
              "Invalid request body provided. Please provide product_id and quantity properties in the cart items array."
            );
        });
        // Create Checkout Session
        const params: Stripe.Checkout.SessionCreateParams = {
          line_items: line_items,
          mode: "payment",
          success_url: `${req.headers.origin}/success?success=true`,
          cancel_url: `${req.headers.origin}/success?cancelled=true`,
          payment_method_types: ["card"],
          shipping_address_collection: { allowed_countries: ["US", "GB"] },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: (10 * 100), currency: "gbp" },
                display_name: "Standard Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 1 },
                  maximum: { unit: "business_day", value: 7 },
                },
              },
            },
          ],
        };
        const session: Stripe.Checkout.Session =
          await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
      } else throw new Error("Request body must be an array of cart items");
    } catch (err: any) {
      console.error(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
