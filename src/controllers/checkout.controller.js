// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51IYBNPL7gHzaRznXMk7Z6zNaqsTKHZEgQ0GvUg083PZC8BwhhUWmcqyE0O7Zh0iczCzreNG2Fe0IHguQ7TrLiNTd00KcuPqzAQ')

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Order',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:8080/orders',
    cancel_url: 'http://localhost:8080/cancel',
  });

  res.json({ id: session.id });
};

// app.listen(4242, () => console.log(`Listening on port ${"3000"}!`));