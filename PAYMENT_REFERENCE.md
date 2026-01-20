# 🚀 SSLCommerz Integration - Quick Reference Card

## Payment Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/payment/init` | POST | ✅ JWT | Start payment process |
| `/api/payment/success` | GET/POST | ❌ | Payment success callback |
| `/api/payment/fail` | GET/POST | ❌ | Payment failure callback |
| `/api/payment/cancel` | GET/POST | ❌ | Payment cancellation callback |

## Frontend Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/checkout` | Checkout.jsx | Payment initialization UI |
| `/payment-success` | PaymentSuccess.jsx | Success confirmation page |
| `/payment-failed` | PaymentFailed.jsx | Failure notification page |
| `/payment-cancel` | PaymentCancel.jsx | Cancellation confirmation page |

## Environment Variables

```env
# Required
SSL_STORE_ID=your_store_id
SSL_STORE_PASS=your_store_pass

# Optional (defaults provided)
IS_LIVE=sandbox  # Change to 'production' for live
CLIENT_SUCCESS_URL=http://localhost:5173/payment-success
CLIENT_FAIL_URL=http://localhost:5173/payment-failed
CLIENT_CANCEL_URL=http://localhost:5173/payment-cancel
```

## Database Models

### Transaction Model
```
userId: string
bookId: string
amount: number
transactionId: string (unique)
status: "pending" | "success" | "failed" | "cancelled"
createdAt: Date
updatedAt: Date
```

### User Model (Updated)
```
purchasedBooks: [string]  // Array of book IDs
```

### Book Model (Updated)
```
buyers: [string]  // Array of user IDs who purchased
```

## Payment Flow Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `tranId` | `TXN_{userId}_{bookId}_{timestamp}` | Unique transaction identifier |
| `currency` | `BDT` | Bangladeshi Taka |
| `cus_email` | `user.email` | Customer email for receipt |
| `cus_name` | `user.name` | Customer name for receipt |

## Test Card Numbers (Sandbox)

| Card Type | Number | Expiry | CVV |
|-----------|--------|--------|-----|
| Visa | 4111111111111111 | Any future | Any 3 digits |
| MasterCard | 5123456789012346 | Any future | Any 3 digits |
| Use any invalid number to test failure handling |

## API Request/Response Examples

### POST /api/payment/init
```bash
# Request
curl -X POST http://localhost:3000/api/payment/init \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": "644f1234567890abcdef1234",
    "amount": 500
  }'

# Response (Success)
{
  "success": true,
  "url": "https://sandbox.sslcommerz.com/...",
  "transactionId": "TXN_userId_bookId_1705756800000"
}

# Response (Error)
{
  "success": false,
  "message": "Book already purchased"
}
```

### GET /api/payment/success
```
http://localhost:3000/api/payment/success?bookId=644f1234&userId=644f5678
↓
Redirects to: http://localhost:5173/payment-success
```

## Key Functions

### Backend
```typescript
// Payment Controller
initPayment()      // Validate and init payment
paymentSuccess()   // Handle successful payment
paymentFail()      // Handle failed payment
paymentCancel()    // Handle cancelled payment

// Payment Service
initSSLPayment()   // Initialize SSLCommerz gateway

// Book Service
purchaseBook()     // Add book to user's library
```

### Frontend
```javascript
// Checkout Component
handlePayment()    // Initiate payment process
```

## Error Messages

| Error | Status | Cause | Solution |
|-------|--------|-------|----------|
| "Book not found" | 404 | Invalid book ID | Verify book ID |
| "Book is not available" | 403 | Book status is not "active" | Admin must approve book |
| "Book already purchased" | 400 | User already owns book | Try different book |
| "Payment amount does not match" | 400 | Amount ≠ book.price | Check book price |
| "Failed to init gateway" | 500 | SSLCommerz error | Check SSL credentials |

## Directory Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── env.ts ........................ ✅ SSL config
│   └── modules/
│       ├── payment/
│       │   ├── payment.controller.ts .... ✅ Payment logic
│       │   ├── payment.service.ts ....... ✅ SSLCommerz init
│       │   ├── payment.interface.ts ..... ✅ Payment types
│       │   ├── payment.model.ts ......... ✅ Transaction tracking
│       │   └── payment.route.ts ......... ✅ Payment endpoints
│       ├── book/
│       │   └── book.service.ts .......... ✅ Purchase logic
│       └── user/
│           ├── user.interface.ts ........ ✅ Purchase history
│           └── user.model.ts ............ ✅ User schema

Frontend/
├── src/
│   ├── Pages/
│   │   ├── Checkout/
│   │   │   └── Checkout.jsx ............ ✅ Enhanced
│   │   ├── PaymentSuccess/ ............ ✅ Created
│   │   ├── PaymentFailed/ ............. ✅ Created
│   │   └── PaymentCancel/ ............. ✅ Created
│   └── Route/
│       └── Root.jsx ................... ✅ Routes added
```

## Important URLs

| Purpose | URL |
|---------|-----|
| SSLCommerz Sandbox | https://sandbox.sslcommerz.com/ |
| SSLCommerz Live | https://www.sslcommerz.com/ |
| API Docs | https://developer.sslcommerz.com/ |
| Merchant Panel | https://www.sslcommerz.com/login |

## Debugging Tips

### Check Backend Logs
```bash
# If using npm run dev, logs appear in terminal
# Look for:
# - "Failed to initialize payment"
# - Validation errors
# - Database errors
```

### Check Browser Console
```javascript
// Network tab shows:
// - POST /api/payment/init response
// - Redirect to payment gateway
// - Error messages if payment fails

// Console tab shows:
// - JavaScript errors
// - API response details
```

### Check Database
```javascript
// MongoDB
db.transactions.find({})  // View all transactions
db.users.findOne({_id: userId})  // Check purchasedBooks
db.books.findOne({_id: bookId})  // Check buyers
```

## Common Debugging Commands

```bash
# Test backend connectivity
curl http://localhost:3000/api/payment/init

# Check if dependencies installed
npm ls sslcommerz-lts

# Verify environment variables
cat .env | grep SSL

# View server logs in real-time
npm run dev
```

## Production Checklist

- [ ] Update SSL credentials to production
- [ ] Set IS_LIVE=production
- [ ] Update all URLs to use domain
- [ ] Enable HTTPS
- [ ] Test with real payment
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Document payment process
- [ ] Train support team
- [ ] Create incident response plan

---

**Keep this card handy!** Print or bookmark for quick reference.

Last Updated: January 20, 2026
