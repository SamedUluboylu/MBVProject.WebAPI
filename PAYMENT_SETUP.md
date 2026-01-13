# Payment Integration Guide

## Current Payment Methods

The application currently supports the following payment methods:

### ✅ Active (No Setup Required)
1. **Cash on Delivery (Kapıda Ödeme)** - Ready to use
2. **Bank Transfer (Havale/EFT)** - Ready to use

### ⏳ Available (Setup Required)
3. **Stripe** - International card payments
4. **Iyzico** - Turkey's leading payment gateway
5. **PayTR** - Turkish payment solution
6. **PayPal** - Digital wallet worldwide
7. **Cryptocurrency** - Bitcoin, Ethereum, etc.

---

## 1. Stripe Integration (International)

**Best for:** International card payments, global merchants

### Step 1: Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up for a new account or log in
3. Complete account verification

### Step 2: Get API Keys
1. Navigate to [Developers > API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** and **Secret key**
3. Use test mode keys for testing

### Step 3: Install Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 4: Configure Environment
Add to your `.env` file:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### Step 5: Enable in Payment Service
In `src/services/paymentService.ts`, change:
```typescript
{
  id: 'stripe',
  enabled: true  // Change from false to true
}
```

### Test Cards
- **Success**: 4242 4242 4242 4242
- **3D Secure**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

**Resources:**
- [Stripe Docs](https://stripe.com/docs)
- [Setup Guide](https://bolt.new/setup/stripe)

---

## 2. Iyzico Integration (Turkey)

**Best for:** Turkish merchants, local payment methods

### Step 1: Create Iyzico Account
1. Go to [Iyzico](https://www.iyzico.com)
2. Click "Üye Ol" (Sign Up)
3. Complete merchant registration
4. Submit required documents for verification

### Step 2: Get API Credentials
1. Log in to [Iyzico Panel](https://merchant.iyzipay.com)
2. Go to Settings > API & Security
3. Copy your **API Key** and **Secret Key**

### Step 3: Install Dependencies
```bash
npm install iyzipay
```

### Step 4: Configure Environment
Add to your `.env` file:
```env
IYZICO_API_KEY=your_api_key_here
IYZICO_SECRET_KEY=your_secret_key_here
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com  # For testing
# For production: https://api.iyzipay.com
```

### Step 5: Enable in Payment Service
```typescript
{
  id: 'iyzico',
  enabled: true
}
```

### Test Cards
- **Success**: 5528 7900 0000 0001
- **3D Secure**: 5528 7900 0000 0002
- **Declined**: 5406 6700 0000 0009

**Resources:**
- [Iyzico Documentation](https://dev.iyzipay.com)
- [API Reference](https://dev.iyzipay.com/tr/api)

---

## 3. PayTR Integration (Turkey)

**Best for:** Turkish e-commerce, competitive rates

### Step 1: Create PayTR Account
1. Go to [PayTR](https://www.paytr.com)
2. Click "Üye Ol" (Register)
3. Complete merchant application
4. Wait for approval (usually 1-2 business days)

### Step 2: Get Merchant Credentials
1. Log in to [PayTR Panel](https://www.paytr.com/magaza/login)
2. Go to Settings > API Information
3. Copy your **Merchant ID**, **Merchant Key**, and **Merchant Salt**

### Step 3: Configure Environment
Add to your `.env` file:
```env
PAYTR_MERCHANT_ID=your_merchant_id
PAYTR_MERCHANT_KEY=your_merchant_key
PAYTR_MERCHANT_SALT=your_merchant_salt
PAYTR_TEST_MODE=1  # Set to 0 for production
```

### Step 4: Enable in Payment Service
```typescript
{
  id: 'paytr',
  enabled: true
}
```

### Test Cards
PayTR provides test cards in their documentation based on your merchant account.

**Resources:**
- [PayTR Documentation](https://www.paytr.com/magaza/dokumantasyon)
- [API Guide](https://www.paytr.com/entegrasyon)

---

## 4. PayPal Integration

**Best for:** International customers, digital goods

### Step 1: Create PayPal Business Account
1. Go to [PayPal](https://www.paypal.com/business)
2. Sign up for a Business account
3. Complete verification

### Step 2: Get API Credentials
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Navigate to Dashboard > My Apps & Credentials
3. Create a new app
4. Copy **Client ID** and **Secret**

### Step 3: Install Dependencies
```bash
npm install @paypal/react-paypal-js
```

### Step 4: Configure Environment
Add to your `.env` file:
```env
VITE_PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_SECRET=your_secret_here
PAYPAL_MODE=sandbox  # Change to 'live' for production
```

### Step 5: Enable in Payment Service
```typescript
{
  id: 'paypal',
  enabled: true
}
```

### Test Accounts
Create test accounts in PayPal Sandbox for testing.

**Resources:**
- [PayPal Developer Docs](https://developer.paypal.com/docs)
- [React Integration](https://developer.paypal.com/sdk/js/react/)

---

## 5. Cryptocurrency Integration

**Best for:** Global customers, crypto enthusiasts

### Option A: CoinGate

1. Sign up at [CoinGate](https://coingate.com)
2. Get API credentials from Settings > API
3. Install dependencies:
```bash
npm install coingate-v2
```

4. Configure:
```env
COINGATE_API_KEY=your_api_key
COINGATE_MODE=sandbox  # or 'live'
```

### Option B: BTCPay Server

1. Set up [BTCPay Server](https://btcpayserver.org)
2. Create a store
3. Generate API key
4. Configure:
```env
BTCPAY_SERVER_URL=https://your-btcpay-server.com
BTCPAY_API_KEY=your_api_key
BTCPAY_STORE_ID=your_store_id
```

### Step 3: Enable in Payment Service
```typescript
{
  id: 'crypto',
  enabled: true
}
```

**Supported Cryptocurrencies:**
- Bitcoin (BTC)
- Ethereum (ETH)
- Litecoin (LTC)
- And 50+ others

**Resources:**
- [CoinGate API](https://developer.coingate.com)
- [BTCPay Docs](https://docs.btcpayserver.org)

---

## General Payment Flow

1. Customer adds products to cart
2. Proceeds to checkout
3. Selects payment method
4. For online payments:
   - Redirects to payment gateway
   - Customer completes payment
   - Returns to confirmation page
5. For cash/bank transfer:
   - Order is placed
   - Payment instructions sent
   - Manual confirmation required

---

## Security Best Practices

1. **Never store card details** in your database
2. **Always use HTTPS** in production
3. **Implement PCI DSS compliance** for card handling
4. **Use webhooks** for payment confirmations
5. **Validate all payments** on the server side
6. **Keep secrets secure** - never commit to Git
7. **Enable 3D Secure** for card transactions
8. **Log all transactions** for auditing
9. **Implement fraud detection** (velocity checks, etc.)
10. **Use environment variables** for all API keys

---

## Testing Checklist

- [ ] Test successful payments
- [ ] Test declined payments
- [ ] Test 3D Secure flow
- [ ] Test refunds
- [ ] Test webhooks
- [ ] Test different currencies
- [ ] Test timeout scenarios
- [ ] Test error handling
- [ ] Test on mobile devices
- [ ] Test in production-like environment

---

## Support & Resources

### General
- [PCI DSS Compliance Guide](https://www.pcisecuritystandards.org)
- [OWASP Payment Security](https://owasp.org/www-community/controls/Payment_Card_Industry_Data_Security_Standard)

### Setup Assistance
- Stripe: https://bolt.new/setup/stripe
- Contact support for other providers

---

## Quick Enable Guide

To enable any payment method:

1. Complete the setup steps above
2. Add API credentials to `.env`
3. Update `src/services/paymentService.ts`:
   ```typescript
   {
     id: 'payment_method_id',
     enabled: true  // Change to true
   }
   ```
4. Restart your application
5. Test the payment flow

---

**Note:** Always test in sandbox/test mode before going live!
