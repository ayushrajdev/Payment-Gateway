import data from './courses.json' with { type: 'json' };
import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
    }),
);

const razorpay = new Razorpay({
    key_id: 'rzp_test_SreKkWHYNxa7dk',
    key_secret: '3LOIWxR88LhXqTDH9LO9I456',
});

app.post('/initiate-order', async (req, res) => {
    const payload = req.body;
    console.log(payload);

    // ! check the price corresponding to the course in database
    const course = data.find((course) => course.id === payload.id);
    console.log(course);
    if (!(course.price === payload.price)) {
        return res.end();
    }

    // ! create the order session in db with orderstatus of pending
    // ! also check the user haven't purachased the course already
    // ! if user already created the order and it is pending then return that orderid

    // [
    //     {
    //         orderId: 'order_RELw9wYDdyF9UD',
    //         courseId: '64fa1c9e3b7d92001c4a7f21',
    //         courseName: 'Node.js Fundamentals Course',
    //         userName: 'Anurag Singh',
    //         userContact: '9876543210',
    //         orderStatus: 'paid',
    //     },
    // ]

    const resonse = await razorpay.orders.create({
        amount: course.price,
        currency: 'INR',
    });
    return res.json({ order_id: resonse.id });
});
app.get('/verify-order', async (req, res) => {
    const order_id = req.body.order_id;
    const order = await razorpay.orders.fetch(order_id);
    if (order.status == 'paid') {
        return res.status(200).json({
            done: true,
        });
    }
    res.end();

    //! also create the user session in db and store user info info according to the businesss need
});

app.get('/', (_, res) => {
    res.json(data);
});

app.listen(4000, () => {
    console.log('server is listensing');
});
