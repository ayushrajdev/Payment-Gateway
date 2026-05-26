In Razorpay Subscriptions, a subscription moves through different **states** during its lifecycle.

Think of it like a state machine:

```text
created → authenticated → active
                     ↓
                 pending
                     ↓
                  halted
```

Other ending states:

```text
cancelled
paused
expired
completed
```

---

# Main Subscription States

## 1. `created`

This is the initial state.

It means:

* Subscription is created in Razorpay
* Customer has not completed authorization/authentication yet
* No recurring payment has started

Example:

```js
const subscription = await razorpay.subscriptions.create({
  plan_id: "plan_xxx",
  total_count: 12
})
```

After this:

* Razorpay returns `sub_xxx`
* Status = `created`

Now customer must complete mandate/authentication.

---

## 2. `authenticated`

Customer successfully completed:

* Card authentication
* UPI mandate approval
* eMandate authorization

Now Razorpay has permission for future auto-debits. ([Razorpay][1])

### Important

Subscription may remain in authenticated state when:

* trial period exists
* future start date exists

---

## 3. `active`

Subscription is now live.

Razorpay will:

* generate invoices
* auto-debit customer periodically
* process recurring payments automatically

This is the normal running state. ([Razorpay][1])

Example:

```text
Netflix monthly subscription running normally
```

---

## 4. `pending`

A recurring payment failed.

Reasons:

* insufficient balance
* card expired
* bank declined payment
* UPI mandate issue

Razorpay retries payment automatically while state is `pending`. ([Razorpay][1])

Example flow:

```text
active → payment failed → pending
```

---

## 5. `halted`

All retry attempts failed.

Now:

* invoices still generate
* auto-debit stops
* customer must fix payment method manually

Example:

```text
pending → retries exhausted → halted
```

To recover:

* customer changes card
* successful manual payment
* subscription becomes active again

([Razorpay][1])

---

# Other States

## 6. `paused`

Subscription temporarily stopped.

No billing occurs while paused.

Can later be resumed.

Only active subscriptions can usually be paused. ([Razorpay][2])

Example:

```text
Gym membership temporarily paused
```

---

## 7. `cancelled`

Subscription permanently stopped.

Important:

* cannot restart cancelled subscription
* need to create new subscription again

Example:

```text
User permanently cancels Spotify plan
```

([Razorpay][1])

---

## 8. `expired`

Authorization was not completed before subscription start time.

Example:

* subscription created
* customer never approved mandate
* start date passes

Then:

```text
created → expired
```

Cannot be reused. ([Razorpay][1])

---

## 9. `completed`

Subscription finished successfully.

Example:

```text
12-month subscription completed all 12 cycles
```

No further billing occurs.

---

# Full Lifecycle Diagram

```text
created
   ↓
authenticated
   ↓
active
   ↓
payment failure
   ↓
pending
   ↓
retry failed
   ↓
halted

Other paths:
active → paused
active → cancelled
created → expired
active → completed
```

---

# Real Example

Suppose user buys:

```text
₹499/month subscription
12 months
```

### Flow

## Step 1

Backend creates subscription

State:

```text
created
```

---

## Step 2

User approves UPI mandate/card auth

State:

```text
authenticated
```

---

## Step 3

First payment successful

State:

```text
active
```

---

## Step 4

Next month auto-debit fails

State:

```text
pending
```

---

## Step 5

Retries fail

State:

```text
halted
```

---

## Step 6

User changes card and payment succeeds

State:

```text
active
```

---

# Important Webhooks

You should listen to webhooks for subscription states.

Common webhook events:

* `subscription.authenticated`
* `subscription.activated`
* `subscription.pending`
* `subscription.halted`
* `subscription.cancelled`
* `subscription.completed`

([Razorpay][3])

---

# Most Important Thing to Understand

A Razorpay subscription has 2 major parts:

## 1. Mandate / authorization

Permission to auto-debit

## 2. Recurring billing

Actual monthly/yearly charges

States mainly track:

* whether authorization succeeded
* whether recurring payments are succeeding

---

Official docs:

* [Razorpay Subscription States](https://razorpay.com/docs/payments/subscriptions/states/?utm_source=chatgpt.com)
* [Razorpay Subscription Workflow](https://razorpay.com/docs/payments/subscriptions/workflow/?utm_source=chatgpt.com)
* [Razorpay Subscription Webhooks](https://razorpay.com/docs/webhooks/subscriptions/?utm_source=chatgpt.com)

[1]: https://razorpay.com/docs/payments/subscriptions/states/?preferred-country=IN&utm_source=chatgpt.com "Subscriptions States | Razorpay Docs"
[2]: https://razorpay.com/docs/payments/subscriptions/states/?utm_source=chatgpt.com "Subscriptions States"
[3]: https://razorpay.com/docs/webhooks/subscriptions/?utm_source=chatgpt.com "Subscriptions Webhook Events"
