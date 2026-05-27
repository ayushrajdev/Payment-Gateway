import { Stripe } from 'stripe';

const stripeClient = new Stripe(
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW',
);

// ! M1

const checkoutSession = await stripeClient.checkout.sessions.create({
    mode: 'subscription', //!important
    line_items: [
        {
            price: 'reccuring_price_id',
            quantity: 1,
        },
    ],
    success_url: '',
    cancel_url: '',
});

// ! M2

const product = await stripeClient.products.create({
    name: 'Pro Membership',
});

const price = await stripeClient.prices.create({
    unit_amount: 49900,
    currency: 'inr',
    recurring: {
        interval: 'month',
    },
    product: product.id,
});

const customer = await stripeClient.customers.create({
    email: 'user@example.com',
});

const subscription = await stripeClient.subscriptions.create({
    customer: customer.id,
    items: [
        {
            price: price.id,
        },
    ],
});
