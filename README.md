# 🛒 themarketplace — E-Commerce Web Application

**themarketplace** is a feature-rich, responsive e-commerce web platform built with **React 19**, **Vite**, and **Tailwind CSS v4**. It features user authentication, a dynamic multi-category product catalog, real-time search, user-scoped shopping cart persistence, multi-step checkout with payment simulation, and order tracking.

---

## ✨ Features

- **🔐 Authentication & Route Protection**
  - Session persistence using `localStorage` for logged-in users.
  - Protected routes redirect unauthenticated users back to the login screen.

- **🛍️ Multi-Category Product Catalog**
  - Browse curated products across categories: **Mobiles**, **Laptops**, **Shoes**, **Gym Equipment**, and **Trending Products**.
  - Detailed product views featuring multi-angle image galleries, ratings, discount tags, and user reviews.

- **🛒 User-Scoped Shopping Cart & Persistence**
  - Add or remove items dynamically from the cart.
  - Cart state is saved per-user in `localStorage`, maintaining items across page reloads and re-logins.

- **💳 Interactive Checkout & Bank Offers**
  - Multi-step payment workflow supporting **Credit/Debit Cards**, **UPI**, **Net Banking**, and **Cash on Delivery**.
  - Integrated bank discounts (e.g. *themarketplace Axis* cashback card offers).
  - Address selection and order breakdown with instant price calculations.

- **📦 Order History & Tracking**
  - View placed orders with auto-generated unique Order IDs (`ODxxxxxxxxxx`).
  - Track order details, shipping address, and order placement timestamps on the order status page (`/waiting`).

- **🔍 Live Search & Filter**
  - Search bar in the top navigation allowing instant product lookups across all categories.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
ecommerce-project/
├── public/
│   ├── favicon.svg             # Custom themarketplace SVG favicon icon
│   └── icons.svg
├── src/
│   ├── assets/                 # Global image assets
│   ├── images/
│   │   └── themarketplaceLogo.png  # Brand logo
│   ├── components/
│   │   ├── loginPart/
│   │   │   ├── Login.jsx       # Auth form component
│   │   │   └── SideImage.jsx   # Branding banner sidebar
│   │   └── pages/
│   │       ├── Navbar.jsx          # Header navigation & search
│   │       ├── Products.jsx        # Homepage product grid
│   │       ├── Mobiles.jsx         # Mobile category page
│   │       ├── Laptops.jsx         # Laptop category page
│   │       ├── Shoes.jsx           # Footwear category page
│   │       ├── Gym.jsx             # Gym accessories category page
│   │       ├── CartPayment.jsx     # Single product quick checkout
│   │       ├── AddCart.jsx         # Shopping cart view
│   │       ├── Payments.jsx        # Checkout & payment options
│   │       ├── Waiting.jsx         # Order status & history page
│   │       ├── SearchResults.jsx   # Search query results
│   │       ├── WowDeals.jsx        # Promotional deal cards
│   │       ├── ProtectedRoute.jsx  # Route guard for auth
│   │       └── Footer.jsx          # Footer links & corporate info
│   ├── App.jsx                 # App routing & state orchestration
│   ├── main.jsx                # Entry point
│   └── index.css               # Base Tailwind CSS rules
├── index.html                  # HTML entry point with title & favicon
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher) installed on your system.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Syed-srh/themarketplace.git
   cd ecommerce-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 📜 Page Routes

| Route | Access | Description |
| :--- | :--- | :--- |
| `/login` | Public | User login page |
| `/products` | Protected | Main homepage product listing |
| `/mobiles` | Protected | Mobiles category |
| `/laptops` | Protected | Laptops category |
| `/shoes` | Protected | Shoes category |
| `/gym` | Protected | Gym equipment category |
| `/addcart` | Protected | Shopping cart manager |
| `/cartpayment/:category/:id` | Protected | Product preview & quick buy |
| `/payments` | Protected | Payment gateway & order confirmation |
| `/waiting` | Protected | Order history & shipment status |
| `/search/:query` | Protected | Real-time search results |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
