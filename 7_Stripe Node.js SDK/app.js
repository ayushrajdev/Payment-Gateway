import Stripe from 'stripe';
const stripeClient = new Stripe(
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW',
);

let checkoutSessions = await stripeClient.checkout.sessions.list();
console.log(checkoutSessions);

const piList = await stripeClient.paymentIntents.list();
console.log(piList.data.length);
