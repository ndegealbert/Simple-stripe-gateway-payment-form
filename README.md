# Simple Store with with a seamless stripe integration

This is an application designed to showcase a complete full-stack solution built using Next.js. It serves as a demonstration of an e-commerce platform with a seamless payment collection system integrated through the Stripe payment gateway.

# Github Repo


# Dependencies
- Redux: for application state management
- tailwind: for styling
- stripe: the payment client
- react-icons: for the applications icons

# Configuration
- add .env or .env.local files with the following keys
- - STRIPE_SECRET_KEY: a secret key to be used the stripe backend
- - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: a publishable key for use on the client side for the redirect to stripe
<p>The keys can be accessed on the stripe dashboard after signing up on the following url: https://dashboard.stripe.com/account/apikeys </p>

- Adding products
<p>Add products to the products.json file</p>

# Starting the application

Install the project's dependencies
```bash
npm i
# or
yarn install
```

Build the project
```bash
npm run build
# or
yarn build
```

Then, run the production server:

```bash
npm run start
# or
yarn start
```

Server can now be accessed through http://localhost:3000

# Application Pages

- /
<p>This page list the products<p>

- /:product_id
<p>This page displays a simple preview of a product<p>

- /order
<p>This page shows the order summary of the cart items and provides the checkout functionality to Stripe's test<p>

- /success?:status
<p>This page shows the status for each of payment session. It handles two statuses, cancelled and success.<p>

# API routes

- /api/checkout
<p>This is a post route that gets an array of cart items and creates a checkout session on stripe.<p>
<p>It allows only for card payments and uses the fixed standard shipping cost.<p>


# Test cards
https://stripe.com/docs/testing?testing-method=card-numbers#europe-and-middle-east

# Key missing items & resolution mechanisms
- Unit tests for the API routes. Jest can be used for this purpose.
- E2E testing. Cypress is the easiest package to use intergration tests for Nextjs applications
