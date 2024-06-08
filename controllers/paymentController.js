const stripe = require("stripe")("sk_test_51PJ2BDP1QytsEo5aGArjBS7PoZgiafH5ZhN70Ycqznirp19y4wbbPKsE290P1IfOui7VmVIXgg3RnKwqSI7vqhGR00K9awoqQf");

exports.createPaymentSession = async (req, res) => {
  const { success_url, priceID, quantity } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: success_url,
      line_items: [
        {
          price: priceID,
          quantity: quantity,
        },
      ],
      mode: 'payment',
    });

    res.json({ url: session.url })
  } catch (error) {
    res.status(500).send({ error: errormessage });
  }
};
