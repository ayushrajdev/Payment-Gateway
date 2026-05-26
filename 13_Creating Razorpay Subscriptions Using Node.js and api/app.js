import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'rzp_test_SreKkWHYNxa7dk',
    key_secret: '3LOIWxR88LhXqTDH9LO9I456',
});

var subscriptions = await razorpay.subscriptions.all();
console.log(subscriptions);

var indiviualSubscription =
    await razorpay.subscriptions.fetch('sub_StEtU1eJVUbvSP');
console.log(indiviualSubscription);

var subscription = await razorpay.subscriptions.create({
    plan_id: 'plan_StEoFIRKR7MICY',
    total_count: 3,
    quantity: 1,
});

var pausedSubscription =
    await razorpay.subscriptions.pause('sub_StEtU1eJVUbvSP');
