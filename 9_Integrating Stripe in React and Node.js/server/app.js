import express from 'express';
import courses from './courses.json' with { type: 'json' };
import cors from 'cors';
import { Stripe } from 'stripe';

const app = express();
const stripeClient = new Stripe(
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW',
);

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
    }),
);

app.get('/', (_, res) => {
    res.json(courses);
});

app.post('/create-checkout-session', async (req, res) => {
    const { id, name, user } = req.body;

    console.log(id, name, user);

    const course = courses.find((course) => course.id == id);

    if (!course) {
        return res.end();
    }

    const { url: checkoutUrl } = await stripeClient.checkout.sessions.create({
        mode: 'payment',
        success_url: `http://localhost:5173/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:5173',
        metadata: { name: user.name, mobile: user.mobile, courseId: id },
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name,
                        description: name,
                    },
                    unit_amount: course.price,
                },
            },
        ],
    });
    res.json({ checkoutUrl });
});
app.post('/verify-checkout-session', async (req, res) => {
    const { checkoutSessionId } = req.body;
    

    const { payment_status } =
        await stripeClient.checkout.sessions.retrieve(checkoutSessionId);

    if (payment_status == 'paid') {
        res.end('you paid for the course');
    } else {
        return res.status(400).json({
            ok: false,
        });
    }
});

app.listen(4000, () => {
    console.log('Server started');
});
