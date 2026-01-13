# Payment Integration Guide

## Current Payment Methods

The application currently supports:

1. **Cash on Delivery (Kapıda Ödeme)** - ✅ Active
2. **Bank Transfer (Havale/EFT)** - ✅ Active
3. **Credit/Debit Card** - ⏳ Requires Stripe Setup

## Stripe Integration Setup

To enable credit/debit card payments, you need to integrate Stripe:

### Step 1: Create Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up for a new account or log in to existing one
3. Complete account verification

### Step 2: Get API Keys

1. Navigate to [Developers > API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** and **Secret key**
3. For testing, use the test mode keys

### Step 3: Configure Environment Variables

Add the following to your `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

For backend (if using Stripe server-side):

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### Step 4: Install Stripe Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 5: Enable Card Payments

Update the payment service configuration in `src/services/paymentService.ts`:

```typescript
{
  id: 'credit_card',
  name: 'Kredi/Banka Kartı',
  type: 'card',
  icon: '💳',
  enabled: true  // Change from false to true
}
```

## Payment Flow

1. Customer selects products and adds to cart
2. Proceeds to checkout
3. Selects payment method
4. For card payments:
   - Stripe payment form appears
   - Customer enters card details
   - Payment is processed securely
   - Order is confirmed
5. For cash/bank transfer:
   - Order is placed
   - Payment confirmation sent
   - Payment collected on delivery or after transfer

## Testing Card Payments

Use these test card numbers in test mode:

- **Success**: 4242 4242 4242 4242
- **Requires Authentication**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

Use any future expiry date, any 3-digit CVC, and any postal code.

## Security Best Practices

1. Never store card details in your database
2. Always use HTTPS in production
3. Implement 3D Secure authentication
4. Use Stripe webhooks for payment confirmations
5. Keep your secret keys secure and never commit them to Git

## Support

For more information:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Integration Guide](https://stripe.com/docs/payments/accept-a-payment)

For setup assistance: https://bolt.new/setup/stripe
