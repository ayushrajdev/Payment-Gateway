import express from 'express';
import Razorpay from 'razorpay';

const app = express();

const razorpay = new Razorpay({
    key_id: 'rzp_test_SreKkWHYNxa7dk',
    key_secret: '3LOIWxR88LhXqTDH9LO9I456',
});

app.post('/razorpay/webhook', async (req, res, next) => {
    const subscriptionPayload = req.body.payload.subscription.entity;
    console.log(subscriptionPayload.id);

    switch (req.body.event) {
        case 'subscription.pause':
            break;
        case 'subscription.resumed':
            break;
        case 'subscription.halted':
            break;
        case 'subscription.active':
            break;
        default:
            break;
    }
    return res.json({ ok: true });
});

app.post('/create-subscription', async (req, res) => {
    var subscription = await razorpay.subscriptions.create({
        plan_id: 'plan_StEoFIRKR7MICY',
        total_count: 3,
        quantity: 1,
    });

    return res.json({ subscription });
});

app.listen(3000, () => {
    console.log('server started');
});
