const fetch = require('node-fetch');
const Order = require('../models/Order');

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

const generateAccessToken = async () => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

// Create PayPal Order
exports.createOrder = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const paypalRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: req.body.amount || '10.00',
          },
        }],
      }),
    });

    const data = await paypalRes.json();

    if (!data.id) {
      console.error("❌ PayPal response missing ID", data);
      return res.status(400).json({ error: 'Invalid PayPal order', paypalError: data });
    }

    console.log("✅ Created PayPal Order:", data.id);
    res.status(200).json({ id: data.id }); // ✅ RETURN ONLY THE ORDER ID!
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
};



// Capture PayPal Order + Save to DB
exports.captureOrder = async (req, res) => {
  const { orderID } = req.params;

  try {
    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    const paypalDetails = {
      orderId: data.id,
      payerId: data.payer.payer_id,
      paymentId: data.purchase_units[0].payments.captures[0].id,
      payerEmail: data.payer.email_address,
      status: data.status,
    };

    // You can customize item, address, and user fields as needed
    const order = new Order({
      user: req.userId || null,         // replace with your auth system
      item: [],
      address: [],
      status: 'Pending',
      paymentMode: 'PAYPAL',
      total: parseFloat(data.purchase_units[0].payments.captures[0].amount.value),
      paymentStatus: data.status.toLowerCase(),
      paypal: paypalDetails,
    });

    await order.save();

    res.status(200).json({ message: "Order captured and saved", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to capture PayPal order' });
  }
};
