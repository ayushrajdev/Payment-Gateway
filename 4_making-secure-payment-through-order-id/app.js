const button = document.querySelector('button');
console.log(button);
button.addEventListener('click', (e) => {
    (async () => {
        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            body: JSON.stringify({
                currency: 'INR',
                amount: 50000,
            }),
            headers: {
                Authorization:
                    'Basic cnpwX3Rlc3RfU3JlS2tXSFlOeGE3ZGs6M0xPSVd4Ujg4TGhYcVRESDlMTzlJNDU2',
            },
        });
        const data = await response.json();

        const order_id = data.id;

        const rzp = new Razorpay({
            key: 'rzp_test_SreKkWHYNxa7dk',
            amount: 50000,
            name: 'DevDrive',
            order_id,
        });
        // rzp.open();
        rzp.on('payment.failed', function (response) {
            console.log(response);
        });
    })();
});
