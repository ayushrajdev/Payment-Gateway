import { Stripe } from 'stripe';
import express from 'express';

const stripeClient = new Stripe(
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW',
);

const app = express();

app.post('/create-customer-portal-link', async (req, res) => {
    const portalLink = await stripeClient.billingPortal.sessions.create({
        customer: 'customer_id', //fetch the customer id from the database and save the customer-id once the customer subscribed to the plan
        return_url: '',
        
    });
    console.log(portalLink.url);
    return res.json({url})
});

app.listen(3000, () => {
    console.log('server started');
});
