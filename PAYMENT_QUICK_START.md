# SSLCommerz Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Verify Environment Variables
Check your `.env` file in the Backend folder:

```env
SSL_STORE_ID=your_store_id
SSL_STORE_PASS=your_store_pass
IS_LIVE=sandbox  # For testing
```

Get these from your SSLCommerz merchant account.

### Step 2: Start the Servers
```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### Step 3: Test Payment Flow
1. Open http://localhost:5173
2. Login with your account
3. Browse books
4. Click "Buy Now"
5. Enter payment details (use test card: 4111111111111111)
6. Confirm payment

## 📋 Test Card Details (Sandbox Only)

**Visa Card:**
- Number: `4111111111111111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Master Card:**
- Number: `5123456789012346`
- Expiry: Any future date
- CVV: Any 3 digits

## 📊 What Was Integrated

### Backend
✅ Payment initialization with validation
✅ Transaction tracking
✅ Automatic book purchase on payment success
✅ Error handling and security checks
✅ Support for both sandbox and production modes

### Frontend
✅ Enhanced checkout component with loading states
✅ Payment success page
✅ Payment failure page
✅ Payment cancellation page

### Database
✅ Transaction collection for audit trail
✅ Purchase history on user profile
✅ Buyer list on books

## 🔒 Security Features

- JWT authentication on all payment endpoints
- Validation of book availability
- Prevention of duplicate purchases
- Amount verification
- Unique transaction IDs
- Error handling without exposing sensitive data

## 🛠️ Customization

### Change Payment Gateway Colors
Edit payment page components:
- `Frontend/src/Pages/PaymentSuccess/PaymentSuccess.jsx`
- `Frontend/src/Pages/PaymentFailed/PaymentFailed.jsx`
- `Frontend/src/Pages/PaymentCancel/PaymentCancel.jsx`

### Change Success/Failure Redirect URLs
Update in `Backend/src/config/env.ts`:
```typescript
CLIENT_SUCCESS_URL: process.env.CLIENT_SUCCESS_URL || "http://localhost:5173/payment-success",
CLIENT_FAIL_URL: process.env.CLIENT_FAIL_URL || "http://localhost:5173/payment-failed",
CLIENT_CANCEL_URL: process.env.CLIENT_CANCEL_URL || "http://localhost:5173/payment-cancel",
```

## 🧪 Testing Checklist

- [ ] User can click "Pay Now"
- [ ] Payment gateway opens in browser
- [ ] Can enter card details
- [ ] Payment processes successfully
- [ ] Redirected to success page
- [ ] Book appears in user's library
- [ ] Try with test failure card (details below)

### Test Failure (Sandbox Only)
Use any invalid card number to test failure handling.

## ⚠️ Common Issues

### "Payment failed" message appears
- Check if SSL credentials are correct
- Verify internet connection
- Check browser console for errors

### "Book already purchased" error
- You're trying to buy a book you already own
- Try with a different book or user

### Transaction not recorded
- Check MongoDB connection
- Verify database is running
- Check server logs

## 🚀 Going Live (Production)

Before going live with real payments:

1. **Get Live Credentials**
   - Contact SSLCommerz support
   - Get production Store ID and Password

2. **Update Environment**
   ```env
   IS_LIVE=production
   ```

3. **Update URLs**
   ```env
   CLIENT_SUCCESS_URL=https://yourdomain.com/payment-success
   CLIENT_FAIL_URL=https://yourdomain.com/payment-failed
   CLIENT_CANCEL_URL=https://yourdomain.com/payment-cancel
   ```

4. **Enable HTTPS**
   - Install SSL certificate
   - Update all URLs to use HTTPS

5. **Test with Real Payment**
   - Use small amount
   - Verify transaction in SSLCommerz dashboard

6. **Set Up Monitoring**
   - Monitor payment failures
   - Set up alerts for issues
   - Regular database backups

## 📞 Support Resources

- **SSLCommerz Docs**: https://developer.sslcommerz.com/
- **SSLCommerz Status**: https://status.sslcommerz.com/
- **This Project**: See `SSLCOMMERZ_INTEGRATION.md`

## 🎯 What's Next?

Optional enhancements:
- [ ] Email notifications on purchase
- [ ] PDF invoice generation
- [ ] Refund management system
- [ ] Payment analytics dashboard
- [ ] Webhook/IPN support for reliability

---

**Status**: ✅ Ready for Testing & Production
