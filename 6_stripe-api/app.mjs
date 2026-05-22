const token =
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW';
var res = await fetch('https://api.stripe.com/v1/balance', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
var res = await fetch('https://api.stripe.com/v1/customers', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
var res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
var res = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
var data = await res.json()
console.log(data);


// https://docs.stripe.com/api?lang=node