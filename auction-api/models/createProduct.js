const stripe = require('stripe')('sk_test_51PJ2BDP1QytsEo5aGArjBS7PoZgiafH5ZhN70Ycqznirp19y4wbbPKsE290P1IfOui7VmVIXgg3RnKwqSI7vqhGR00K9awoqQf');

// Define the createProduct function
async function createProduct(name, description, price) {
  try {
    const product = await stripe.products.create({
      name,
      description,
    });

    const productPrice = await stripe.prices.create({
      unit_amount: price * 100,
      currency: 'usd',
      product: product.id,
    });

    return { product, productPrice };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = createProduct;
