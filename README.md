# E-Commerce Full-Stack Application

A production-grade, full-stack e-commerce web application built with Next.js 16, featuring a complete shopping experience with authentication, product management, cart functionality, and order processing.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Access + Refresh Tokens) stored in httpOnly cookies
- **Password Hashing**: bcryptjs
- **State Management**: Zustand
- **Validation**: Zod
- **Toast Notifications**: Sonner
- **Theme**: Dark mode support with next-themes

## 📋 Features

### Authentication & Authorization
- ✅ User signup and login
- ✅ JWT-based authentication with httpOnly cookies
- ✅ Role-based access control (USER, ADMIN)
- ✅ Protected routes with middleware
- ✅ Secure logout

### Frontend
- ✅ Modern, responsive landing page
- ✅ Product listing with filters and search
- ✅ Product detail pages
- ✅ Shopping cart management
- ✅ Checkout flow with shipping address
- ✅ User dashboard (order history, profile)
- ✅ Admin dashboard (product and order management)
- ✅ Dark mode support
- ✅ Loading skeletons and error handling
- ✅ Toast notifications for user feedback

### Backend
- ✅ RESTful API routes using Next.js App Router
- ✅ Server Actions for form handling
- ✅ User management APIs
- ✅ Product CRUD operations
- ✅ Cart management APIs
- ✅ Order processing APIs
- ✅ Admin-only routes
- ✅ Centralized error handling
- ✅ Input validation with Zod

### Database Models
- ✅ User (name, email, password, role)
- ✅ Product (name, price, description, category, stock, images)
- ✅ Cart (user, items with quantities)
- ✅ Order (items, total, payment status, shipping address)

### Payment Simulation
- ✅ Mock payment processing (always succeeds for demo)
- ✅ Payment success/failure handling
- ✅ Order confirmation logic

## 📁 Project Structure

```
/
├── app/                      # Next.js App Router
│   ├── actions/             # Server Actions
│   │   ├── auth.ts         # Authentication actions
│   │   ├── products.ts     # Product CRUD actions
│   │   ├── cart.ts         # Cart management actions
│   │   └── orders.ts       # Order processing actions
│   ├── api/                 # API Routes
│   │   └── auth/           # Authentication endpoints
│   ├── admin/              # Admin pages (protected)
│   │   ├── products/       # Product management
│   │   └── orders/         # Order management
│   ├── dashboard/          # User dashboard (protected)
│   ├── products/           # Product pages
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProductCard.tsx    # Product card component
│   ├── CartItems.tsx      # Cart items display
│   └── ...
├── lib/                    # Utility libraries
│   ├── auth.ts            # JWT authentication utilities
│   ├── mongodb.ts         # MongoDB connection
│   ├── validations.ts     # Zod schemas
│   └── utils.ts           # Helper functions
├── models/                 # Mongoose models
│   ├── User.ts
│   ├── Product.ts
│   ├── Cart.ts
│   └── Order.ts
├── store/                  # Zustand stores
│   └── cart-store.ts      # Cart state management
├── middleware.ts           # Route protection middleware
└── ...

```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB instance (local or cloud like MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/ecommerce-nextjs
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-nextjs

   # JWT Secrets (generate strong random strings in production)
   JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-in-production
   JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-in-production
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NODE_ENV=development
   ```

   **⚠️ Important**: Replace the JWT secrets with strong, random strings in production. You can generate them using:
   ```bash
   openssl rand -base64 32
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas (cloud) and update the `MONGODB_URI` in `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Creating an Admin User

To create an admin user, you can use MongoDB directly or create a script. Here's a quick MongoDB shell command:

```javascript
use ecommerce-nextjs
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // bcrypt hashed password (use a tool or API to hash)
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or modify the signup action temporarily to create an admin user.

### Features Walkthrough

1. **Browse Products**: Visit `/products` to see all available products
2. **Search & Filter**: Use the search bar and category filter on the products page
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon in the navbar
5. **Checkout**: Proceed to checkout from the cart page
6. **Dashboard**: View your order history in `/dashboard`
7. **Admin Panel**: Access `/admin` to manage products and orders (admin only)

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - In Vercel project settings, add all variables from `.env.local`
   - Make sure to use production-ready MongoDB URI and JWT secrets

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Your app will be live at `https://your-project.vercel.app`

### MongoDB Atlas Setup

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI`

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-nextjs?retryWrites=true&w=majority
JWT_ACCESS_SECRET=<strong-random-string-1>
JWT_REFRESH_SECRET=<strong-random-string-2>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens stored in httpOnly cookies
- ✅ CSRF protection via sameSite cookies
- ✅ Input validation with Zod
- ✅ Protected API routes with middleware
- ✅ Role-based access control
- ✅ Secure environment variable handling

## 📝 API Routes

### Authentication
- `POST /api/auth/me` - Get current user

### Server Actions (Used directly in components)
- `signup(formData)` - Create new user account
- `login(formData)` - Authenticate user
- `logout()` - Clear authentication cookies
- `getProducts(filters)` - Fetch products with optional filters
- `getProductById(id)` - Get single product
- `createProduct(formData)` - Create product (admin only)
- `updateProduct(id, formData)` - Update product (admin only)
- `deleteProduct(id)` - Delete product (admin only)
- `getCart()` - Get user's cart
- `addToCart(productId, quantity)` - Add item to cart
- `updateCartItem(productId, quantity)` - Update cart item
- `removeFromCart(productId)` - Remove item from cart
- `createOrder(formData)` - Create new order
- `getOrders()` - Get user's orders (or all orders for admin)
- `getOrderById(id)` - Get order details
- `updateOrderStatus(id, status)` - Update order status (admin only)

## 🧪 Testing

The application includes:
- Form validation on all inputs
- Error handling with user-friendly messages
- Loading states for async operations
- Toast notifications for user feedback

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB with Mongoose](https://mongoosejs.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

This is a production evaluation project. For improvements:
1. Follow the existing code structure
2. Maintain TypeScript types
3. Add proper error handling
4. Update documentation

## 📄 License

This project is created for evaluation purposes.

## 👤 Author

Built as a full-stack evaluation project demonstrating proficiency in:
- Next.js 16 App Router
- Server Actions and API Routes
- MongoDB database design
- JWT authentication
- Modern React patterns
- Production-ready code structure

---

**Note**: This application uses mock payment processing for demonstration purposes. In production, integrate with a real payment gateway like Stripe, Razorpay, or PayPal.
