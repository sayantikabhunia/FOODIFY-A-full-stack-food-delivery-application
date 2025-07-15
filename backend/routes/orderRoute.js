// routes/orderRoute.js
import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/place', async (req, res) => {
  const { items, amount, address, payment } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: "No items in order." });
  }

  if (payment === 'online') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        success_url: 'http://localhost:5173/order-confirmation?payment=online',
        cancel_url: 'http://localhost:5173/cart',
      });

      return res.status(200).json({ success: true, session_url: session.url });

    } catch (err) {
      console.error('Stripe error:', err);
      return res.status(500).json({ success: false, message: 'Stripe session failed' });
    }
  } else {
    // COD
    return res.status(200).json({ success: true });
  }
});

export default router; // ✅ this is required for ES module import
