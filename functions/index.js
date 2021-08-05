const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
//const stripe = require("stripe")('sk_test_51JH1CxSCsmJLHenduWIfEuh7JlrYQOoOTbMRYcsnCsuZpTXFGnGFuad6Q7Ma0zHzkMPdml92ribNJbVysOJ9jZ9I00BOWvKtcn');


const app = express();

app.use(cors({origin : true}));
app.use(express.json());

app.get('/',(request,response)=>response.status(200).send("Hello World"));
/*app.post('/payments/create',async(request,response)=>
{
    const total = request.query.total;
    console.log("Payment Request Recievd",total);

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"inr"
    });

    response.status(201).send({clientSecret:paymentIntent.client_secret})
    
})  */




exports.api = functions.https.onRequest(app);



