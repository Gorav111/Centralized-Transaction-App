# Stripe Transaction System (Centralized Benchmark)

This repository contains the backend implementation of a **centralized transaction system** that simulates traditional payment processing.  
It serves as the **benchmark** in a comparative study against blockchain-based smart contracts.

---

## 🚀 Features
- Transaction handling using **Stripe API**
- Secure **payment intent creation** and confirmation
- Logging of transaction details (amount, status, timestamp, etc.)
- Designed for **comparative evaluation** with blockchain-based payment systems

---

## 🛠️ Tech Stack
- **Node.js** – Backend runtime
- **Express.js** – API framework
- **Stripe SDK** – Payment processing


# Centralized-Transaction-App


## ⚙️ Setup & Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/Gorav111/Centralized-Transaction-App.git
   cd Centralized-Transaction-App
   ```
   
2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set environment variables**
   - Create a .env file in the project root and add:
     
    ```bash
    STRIPE_API_KEY=your_stripe_secret_key
    PORT=3000
    ```

4. **Run the server**
    ```bash
    npm app.js
    ```


5. **Perform the transactions**
   - Open Git bash and enter the CURL command
     
   ```bash
    curl -X POST http://localhost:3000/create-payment-intent \
	-H "Content-Type: application/json" \
	-d '{"amount": 5000, "currency": "usd"}' &
   ```
   
