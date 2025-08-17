// app.js

/**
 * @file This file contains the implementation of an Express server that interacts with the Stripe API.
 * @module app
 */

import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import Stripe from 'stripe';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Stripe with the API key from the environment variable
const stripe = Stripe(process.env.STRIPE_API_KEY);

// Middleware to parse JSON requestsa
app.use(json());

/**
 * Route to create a payment intent.
 * @name POST /create-payment-intent
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {number} req.body.amount - The amount of the payment.
 * @param {string} req.body.currency - The currency of the payment.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the client secret of the payment intent.
 */
app.post('/create-payment-intent', async (req, res) => {
   const { amount, currency } = req.body;

   const startTime = Date.now();
   try {
      const paymentIntent = await stripe.paymentIntents.create({
         amount,
         currency,
      });

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      const transactionLog = {
         timestamp: new Date().toISOString(),
         amount: amount / 100, // Stripe uses smallest unit (e.g., cents)
         currency,
         status: paymentIntent.status,
         id: paymentIntent.id,
         client_secret: paymentIntent.client_secret,
         start_time: new Date(startTime).toISOString(),
         end_time: new Date(endTime).toISOString(),
         duration_seconds: duration,
      };

      console.log('Stripe Transaction Metrics:', transactionLog);

      res.status(200).json({ 
         clientSecret: paymentIntent.client_secret,
         metrics: transactionLog
      });
   } catch (error) {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      console.error('Error creating payment intent:', error);
      console.log({
         timestamp: new Date().toISOString(),
         amount,
         currency,
         status: 'failed',
         error: error.message,
         start_time: new Date(startTime).toISOString(),
         end_time: new Date(endTime).toISOString(),
         duration_seconds: duration,
      });

      res.status(500).json({ error: error.message });
   }
});

app.get('/', (req, res) => {
   res.send('Stripe server is running!');
});


/**
 * Route to retrieve the Stripe account.
 * @name GET /account
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the Stripe account information.
 */
app.get('/account', async (req, res) => {
   try {
      const account = await stripe.accounts.retrieve();
      res.status(200).json(account);
   } catch (error) {
      console.error('Error retrieving account:', error);
      res.status(500).json({ error: error.message });
   }
});

// Start the server only if this file is run directly
   app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
   });

// Export the app for testing
export default app; // Ensure this line is present at the end
