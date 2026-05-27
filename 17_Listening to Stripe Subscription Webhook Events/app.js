import { Stripe } from 'stripe';
import express from 'express';

const stripeClient = new Stripe(
    'sk_test_51TZ4zU314gNOOU07CVlj3yScdeLYBUPimoeNw9eBBUFYuU2uwnMhML7pqJlEBPHtfrQCqvFo4QQOTy7bFPAjWP2t00izTrCYOW',
);

const app = express();
app.use(express.json());

app.post('/stripe/webhook', async (req, res, next) => {
    const event = req.body.type;
    console.log(req.body);

    switch (event) {
        case 'checkout.session.completed':
            const session = event.data.object;
            if (session.mode === 'subscription') {
                // Save session.customer & session.subscription
                // Grant initial access
            }
            break;

        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            // Extend access / mark renewal success
            break;

        case 'invoice.payment_failed':
            const failedInvoice = event.data.object;
            // Notify user / suspend access after retries
            break;

        case 'customer.subscription.updated':
            const sub = event.data.object;
            if (sub.pause_collection) {
                // handle pause
            } else if (sub.status === 'active') {
                // handle resume or plan change
            } else if (sub.status === 'past_due' || sub.status === 'unpaid') {
                // handle soft suspension
            }
            break;

        case 'customer.subscription.deleted':
            // Hard cancel — revoke access
            break;
    }
    return res.end();
});

app.post('/create-checkout-session', async (req, res) => {
    var customer = req.body.customer;
    var checkoutSession = await stripeClient.checkout.sessions.create({
        currency: 'inr',
        mode: 'subscription',
        success_url: 'http:localhost:3000/success',
        line_items: [
            {
                price: 50000,
                quantity: 1,
                metadata: {
                    ...customer,
                },
            },
        ],
    });
    return res.json({ checkoutSession });
});

app.listen(3000, function () {
    console.log('server started');
});

// {
//     id: 'evt_1TbjNR314gNOOU07lSjDo2kg',
//     object: 'event',
//     api_version: '2026-04-22.dahlia',
//     created: 1779895693,
//     data: {
//         object: {
//             id: 'sub_1TbjLO314gNOOU07FX05BDaG',
//             object: 'subscription',
//             application: null,
//             application_fee_percent: null,
//             automatic_tax: [Object],
//             billing_cycle_anchor: 1779895566,
//             billing_cycle_anchor_config: null,
//             billing_mode: [Object],
//             billing_thresholds: null,
//             cancel_at: 1779993000,
//             cancel_at_period_end: false,
//             canceled_at: 1779895692,
//             cancellation_details: [Object],
//             collection_method: 'charge_automatically',
//             created: 1779895566,
//             currency: 'usd',
//             customer: 'cus_Uank8WWf5BonBo',
//             customer_account: null,
//             days_until_due: null,
//             default_payment_method: 'pm_1Tbc9H314gNOOU07AHowVdGQ',
//             default_source: null,
//             default_tax_rates: [],
//             description: null,
//             discounts: [],
//             ended_at: null,
//             invoice_settings: [Object],
//             items: [Object],
//             latest_invoice: null,
//             livemode: false,
//             managed_payments: [Object],
//             metadata: {},
//             next_pending_invoice_item_invoice: null,
//             on_behalf_of: null,
//             pause_collection: null,
//             payment_settings: [Object],
//             pending_invoice_item_interval: null,
//             pending_setup_intent: null,
//             pending_update: null,
//             plan: [Object],
//             quantity: 1,
//             schedule: null,
//             start_date: 1779895566,
//             status: 'active',
//             test_clock: null,
//             transfer_data: null,
//             trial_end: null,
//             trial_settings: [Object],
//             trial_start: null,
//         },
//         previous_attributes: {
//             canceled_at: 1779895664,
//             pause_collection: [Object],
//         },
//     },
//     livemode: false,
//     pending_webhooks: 1,
//     request: {
//         id: 'req_C9RqrH2nSBlrTm',
//         idempotency_key: '992e2eaa-d2ba-4b05-9e71-661f58e940ae',
//     },
//     type: 'customer.subscription.updated',
// };
