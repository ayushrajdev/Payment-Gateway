//not safe can be manipulated by the attacker

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
    const rzp = new Razorpay({
        key: 'rzp_test_SreKkWHYNxa7dk',
        amount: 50000,
        name: 'DevDrive',
        prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            name: 'Gaurav Kumar', //your customer's name
            email: 'gaurav.kumar@example.com',
            contact: '+919876543210', //Provide the customer's phone number for better conversion rates
        },
    });
    rzp.open();
    rzp.on('payment.failed', function (response) {
        console.log(response);
    });
});
