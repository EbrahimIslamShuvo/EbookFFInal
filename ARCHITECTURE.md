# 🏗️ SSLCommerz Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        E-BOOK STORE SYSTEM                      │
└─────────────────────────────────────────────────────────────────┘
                                ↓
                ┌───────────────────────────────┐
                │    FRONTEND (React)           │
                │  Port: 5173                   │
                └───────────────────────────────┘
                    ↓                       ↓
            [Book Details]      [Checkout Component]
                                        ↓
                    ┌───────────────────────────────┐
                    │  POST /api/payment/init       │
                    │  (Requires JWT)               │
                    └───────────────────────────────┘
                                ↓
                ┌───────────────────────────────────┐
                │     BACKEND (Express + TS)        │
                │     Port: 3000                    │
                └───────────────────────────────────┘
                                ↓
                ┌─────────────────────────────────┐
                │  Payment Controller             │
                │  - Validate request             │
                │  - Check book availability      │
                │  - Verify amount                │
                │  - Generate transaction ID      │
                └─────────────────────────────────┘
                                ↓
                ┌─────────────────────────────────┐
                │  Payment Service                │
                │  - Initialize SSLCommerz SDK    │
                │  - Get gateway URL              │
                └─────────────────────────────────┘
                                ↓
                        SSLCommerz API
                    (Sandbox/Production)
                                ↓
                ┌──────────────────────────────────┐
                │  User Payment Gateway            │
                │  - Card details                  │
                │  - Bank transfer                 │
                │  - Mobile wallet                 │
                └──────────────────────────────────┘
                                ↓
                        Payment Processing
                                ↓
                    ┌─────────────────────┐
                    │   Success/Fail/     │
                    │   Cancel            │
                    └─────────────────────┘
                    ↓            ↓            ↓
            SUCCESS        FAIL         CANCEL
              ↓              ↓             ↓
    /api/payment/success   /api/payment/fail   /api/payment/cancel
              ↓              ↓             ↓
        ┌──────────────────────────────────────┐
        │  Payment Controller Callback         │
        │  - Verify transaction                │
        │  - Update database                   │
        │  - Record purchase                   │
        └──────────────────────────────────────┘
              ↓              ↓             ↓
    [Purchase book]  [Show error]  [Cancel msg]
              ↓              ↓             ↓
    /payment-success  /payment-failed  /payment-cancel
              ↓              ↓             ↓
        ┌──────────────────────────────────────┐
        │       FRONTEND STATUS PAGES          │
        │  - Display result to user            │
        │  - Auto-redirect or manual action    │
        └──────────────────────────────────────┘
              ↓              ↓             ↓
    [Success page]  [Retry page]  [Continue page]
              ↓              ↓             ↓
          Dashboard      Checkout     Shop
```

## Data Flow Diagram

```
PAYMENT INITIALIZATION
━━━━━━━━━━━━━━━━━━━━━━━

User clicks "Pay Now"
       ↓
Frontend: GET book details
       ↓
Checkout Component
       ↓
POST /api/payment/init {
  bookId: "...",
  amount: 500
}
       ↓
Backend: PaymentController.initPayment()
       ├─ Extract userId from JWT
       ├─ Validate request body (Zod)
       ├─ Get book details
       ├─ Check if book is active
       ├─ Check if already purchased
       ├─ Verify amount matches price
       ├─ Generate tranId: TXN_userId_bookId_timestamp
       └─ Call PaymentService.initSSLPayment()
                ↓
          New SSLCommerzPayment()
          .init({
            total_amount,
            currency: "BDT",
            tran_id,
            success_url: "/api/payment/success?...",
            fail_url: "/api/payment/fail",
            cancel_url: "/api/payment/cancel",
            cus_email,
            cus_name
          })
                ↓
          Return GatewayPageURL
                ↓
Frontend: window.location.href = url
       ↓
User → SSLCommerz Payment Gateway


PAYMENT SUCCESS
━━━━━━━━━━━━━━━

User completes payment on SSLCommerz
       ↓
SSLCommerz redirects to:
/api/payment/success?bookId=X&userId=Y
       ↓
Backend: PaymentController.paymentSuccess()
       ├─ Extract bookId and userId from query
       ├─ Call BookService.purchaseBook()
       │     ├─ Get book from DB
       │     ├─ Add userId to buyers array
       │     └─ Save book
       ├─ Create Transaction record
       │     ├─ userId
       │     ├─ bookId
       │     ├─ amount
       │     ├─ transactionId
       │     └─ status: "success"
       └─ Redirect to CLIENT_SUCCESS_URL
                ↓
Frontend: /payment-success
       ├─ Show success message
       ├─ Display checkmark icon
       ├─ Show auto-redirect timer (5s)
       └─ Auto-redirect to /dashboard
                ↓
User: Dashboard with new book


PAYMENT FAILURE
━━━━━━━━━━━━━━━

SSLCommerz detects failure
       ↓
Redirects to:
/api/payment/fail
       ↓
Backend: PaymentController.paymentFail()
       ├─ Log error
       └─ Redirect to CLIENT_FAIL_URL
                ↓
Frontend: /payment-failed
       ├─ Show error message
       ├─ Display error icon
       ├─ Show "Try Again" button
       ├─ Show "Home" button
       └─ Auto-redirect after 5s
                ↓
User: Can retry or go home


PAYMENT CANCELLATION
━━━━━━━━━━━━━━━━━━━

User cancels on payment page
       ↓
SSLCommerz redirects to:
/api/payment/cancel
       ↓
Backend: PaymentController.paymentCancel()
       └─ Redirect to CLIENT_CANCEL_URL
                ↓
Frontend: /payment-cancel
       ├─ Show cancellation message
       ├─ Reassure no charges
       ├─ Show "Continue Shopping"
       ├─ Show "Home" button
       └─ Auto-redirect after 5s
                ↓
User: Can continue or go home
```

## Database Schema

```
TRANSACTIONS COLLECTION
━━━━━━━━━━━━━━━━━━━━━━━

{
  _id: ObjectId,
  userId: "644f...",           ← Who paid
  bookId: "6456...",           ← What they bought
  amount: 500,                 ← How much they paid
  transactionId: string,       ← SSLCommerz reference
  status: enum[
    "pending",                 ← Still processing
    "success",                 ← Payment successful
    "failed",                  ← Payment failed
    "cancelled"                ← Payment cancelled
  ],
  createdAt: Date,
  updatedAt: Date
}


USERS COLLECTION
━━━━━━━━━━━━━━━

{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  role: enum["user", "author", "admin"],
  isActive: boolean,
  purchasedBooks: [           ← NEW FIELD
    "bookId1",
    "bookId2"
  ],
  createdAt: Date,
  updatedAt: Date
}


BOOKS COLLECTION
━━━━━━━━━━━━━━━

{
  _id: ObjectId,
  title: string,
  abstract: string,
  category: string,
  price: number,
  cover: string,
  pdfUrl: string,
  authorId: string,
  status: enum["pending", "active"],
  buyers: [                   ← EXISTING FIELD
    "userId1",
    "userId2"
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Component Hierarchy

```
App
├── Layout
│   └── Router (Root.jsx)
│       ├── Home
│       ├── AllBooks
│       │   └── SingleBook
│       │       └── Checkout
│       │           └── [Initiate Payment]
│       ├── Login
│       ├── Dashboard
│       │   ├── UserDashboard
│       │   ├── AdminDashboard
│       │   └── AuthorDashboard
│       └── Payment Status Pages
│           ├── PaymentSuccess ← /payment-success
│           ├── PaymentFailed  ← /payment-failed
│           └── PaymentCancel  ← /payment-cancel
```

## API Dependency Graph

```
Frontend Checkout Component
       ↓
GET /api/books/:id (Get book details)
       ↓
POST /api/payment/init (Initialize payment)
       ├─ Requires: JWT Token, bookId, amount
       ├─ Validates with Zod
       ├─ Calls: BookService.getSingleBook()
       └─ Calls: PaymentService.initSSLPayment()
                ├─ New SSLCommerzPayment()
                └─ .init(data)
                       ↓
                    SSLCommerz Gateway
                    (External Service)


SSLCommerz → Backend Callback
       ↓
GET/POST /api/payment/{success|fail|cancel}
       ├─ SUCCESS
       │   ├─ Calls: BookService.purchaseBook()
       │   │   └─ Updates: Book.buyers[]
       │   ├─ Creates: Transaction record
       │   └─ Updates: User.purchasedBooks[]
       ├─ FAIL
       │   └─ Logs: Error info
       └─ CANCEL
           └─ Logs: Cancellation info
```

## Security Architecture

```
PUBLIC ENDPOINTS (No Auth)
├─ GET /api/books
├─ GET /api/books/:id
├─ GET /api/blogs
└─ POST /api/auth/login


PROTECTED ENDPOINTS (JWT Required)
├─ POST /api/payment/init ← KEY ENDPOINT
│   ├─ Validate JWT
│   ├─ Extract userId
│   └─ Validate request
├─ PUT /api/users/:id
├─ POST /api/books
└─ etc.


CALLBACK ENDPOINTS (SSLCommerz Origin)
├─ GET/POST /api/payment/success
├─ GET/POST /api/payment/fail
└─ GET/POST /api/payment/cancel


SECURITY LAYERS

Layer 1: JWT Authentication
├─ Verify token signature
├─ Extract userId
└─ Ensure token not expired

Layer 2: Request Validation (Zod)
├─ Validate data types
├─ Check required fields
└─ Verify constraints

Layer 3: Business Logic Validation
├─ Book existence check
├─ Status verification
├─ Duplicate purchase prevention
├─ Amount verification
└─ User authorization

Layer 4: Transaction Safety
├─ Unique transaction IDs
├─ Status tracking
└─ Audit logs
```

## Module Organization

```
Backend/src/
│
├── config/
│   ├── db.ts (MongoDB connection)
│   └── env.ts (Environment variables)
│
├── middlewares/
│   ├── asyncHandler.ts (Error wrapper)
│   ├── auth.ts (JWT verification)
│   ├── errorHandler.ts (Global error handler)
│   └── ...
│
├── modules/
│   ├── auth/ (Login/Registration)
│   ├── user/ (User management)
│   ├── book/ (Book CRUD + purchase)
│   ├── payment/ ← NEW/ENHANCED
│   │   ├── payment.controller.ts
│   │   ├── payment.service.ts
│   │   ├── payment.interface.ts
│   │   ├── payment.model.ts
│   │   ├── payment.route.ts
│   │   └── payment.test.ts (optional)
│   ├── blog/ (Blog posts)
│   └── ...
│
├── types/
│   └── sslcommerz-lts.d.ts (Type definitions)
│
├── utils/
│   ├── ApiError.ts (Error handling)
│   ├── jwt.ts (JWT utilities)
│   └── ...
│
├── app.ts (Express setup)
└── server.ts (Start server)


Frontend/src/
│
├── config/
│   └── api.js (API endpoints)
│
├── Pages/
│   ├── Checkout/
│   │   └── Checkout.jsx ← ENHANCED
│   ├── PaymentSuccess/ ← NEW
│   │   └── PaymentSuccess.jsx
│   ├── PaymentFailed/ ← NEW
│   │   └── PaymentFailed.jsx
│   ├── PaymentCancel/ ← NEW
│   │   └── PaymentCancel.jsx
│   └── ...
│
├── Route/
│   └── Root.jsx ← UPDATED
│
├── auth/
│   └── ProtectedRoute.jsx
│
└── ...
```

---

**Architecture designed for:**
- ✅ Security (JWT + Validation)
- ✅ Scalability (Modular structure)
- ✅ Maintainability (Clear separation)
- ✅ Reliability (Error handling)
- ✅ User Experience (Status pages)

**Last Updated**: January 20, 2026
