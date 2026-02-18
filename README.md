# Demo_Shop 🛍️

> **Merchant Integration Example**  
> A mock e-commerce store proving how easy it is to integrate with TrainCredit.

## 🛒 Flow
1.  **Shop**: User adds items (Headphones, Keyboards, etc.) to the cart.
2.  **Checkout**: Shop backend calls TrainCredit API to generate a payment link.
3.  **Redirect**: User pays securely on TrainCredit.
4.  **Success**: User returns to Shop's success page with order timeline.

## 🔧 Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Connect to Core**:
    Copy `.env.example` to `.env.local`:
    ```env
    NEXT_PUBLIC_CORE_URL=http://localhost:3000
    CORE_API_KEY=your_admin_secret_here
    ```

3.  **Run Store**:
    ```bash
    npm run dev
    ```
    Recommended to run on Port 3001 (`npm run dev -- -p 3001`) to avoid conflict with Core.

