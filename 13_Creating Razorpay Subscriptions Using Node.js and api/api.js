var res = await fetch('https://api.razorpay.com/v1/subscriptions', {
    headers: {
        Authorization:
            'Basic cnpwX3Rlc3RfU3JlS2tXSFlOeGE3ZGs6M0xPSVd4Ujg4TGhYcVRESDlMTzlJNDU2',
    },
});

var res = await fetch('https://api.razorpay.com/v1/plans', {
    headers: {
        Authorization:
            'Basic cnpwX3Rlc3RfU3JlS2tXSFlOeGE3ZGs6M0xPSVd4Ujg4TGhYcVRESDlMTzlJNDU2',
    },
});

var res = await fetch('https://api.razorpay.com/v1/subscriptions', {
    headers: {
        Authorization:
            'Basic cnpwX3Rlc3RfU3JlS2tXSFlOeGE3ZGs6M0xPSVd4Ujg4TGhYcVRESDlMTzlJNDU2',
    },
    method: 'POST',
    body: JSON.stringify({
        "plan_id": 'plan_StEoFIRKR7MICY',
        "total_count": 6,
    }),
});

var data = await res.json();
console.log(data);
