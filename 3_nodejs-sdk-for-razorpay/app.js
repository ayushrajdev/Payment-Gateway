import Razorpay from "razorpay"

var razorpay = new Razorpay({
    key_id: 'rzp_test_SreKkWHYNxa7dk',
    key_secret: '3LOIWxR88LhXqTDH9LO9I456',
});

const payment = await razorpay.payments.fetch("pay_SrvCH3jWLnOLQF");
console.log(payment);

const order = await razorpay.orders.fetch("order_SrZqan6Iep0LOH")
console.log(order);