import Stripe from 'stripe';
const stripeClient = new Stripe(
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW',
);

const checkoutSession = await stripeClient.checkout.sessions.create({
    success_url: `https://ayushrajdev.unaux.com?session_id={CHECKOUT_SESSION_ID}`,
    line_items: [
        {
            // price: 'price_1TZsMQ314gNOOU07C3WxcJMG',
            price_data: {
                product_data: {
                    name: 'frontend course',
                },
                unit_amount: 20000,
                currency: 'INR',
            },

            quantity: 1,
            adjustable_quantity: {
                enabled: true,
            },
        },
    ],
    mode: 'payment',
    shipping_address_collection: {
        allowed_countries: ['IN'],
    },

    metadata: {
        userId: 12343,
        courseId: d23ed23ed23,
        userName: dxasf32,
    },
});

console.log(checkoutSession.url);
