const authToken =
    'cnpwX3Rlc3RfU3JlS2tXSFlOeGE3ZGs6M0xPSVd4Ujg4TGhYcVRESDlMTzlJNDU2';

console.log(atob(authToken));

async function getDetails(params) {
    var res = await fetch("https://api.razorpay.com/v1/payments/",{
        headers:{
            "Authorization":"Basic cnpwX3Rlc3RfU3JlS2tXSFlOeGE3ZGs6M0xPSVd4Ujg4TGhYcVRESDlMTzlJNDU2"
        },
        
    })
    var data = await res.json()
    console.log(data);
}

getDetails()