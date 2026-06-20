#  VALOREM - Tokenized Real-World Asset Platform
A full-stack application that lets users buy, sell, and track fractions of high-value real-world assets (like real estate) using virtual tokens

> **Live Application Link:** [valorem-neon.vercel.app](https://valorem-neon.vercel.app)

---

##  What is VALOREM? (Explained simply)
Imagine you want to invest in a massive $1,000,000 commercial apartment building, but you only have $100. Normally, you're locked out of the investment market. 

**VALOREM solves this.** The platform takes high-value real-world assets (like real estate or luxury assets), splits their total value into thousands of affordable digital "tokens," and allows everyday users to buy fractional pieces of them. As the asset earns money or gains value, token holders earn their share of the yields. 

---

##  Key Features

* **Asset Exploration Grid:** Browse available properties and fractional investment opportunities with clear pricing data.
* **Instant Mock Trading:** Experience a simulated "Buy & Sell" system that dynamically updates how many asset tokens you own.
* **Live Portfolio Dashboard:** Watch your total portfolio value, active investments, and asset allocation breakdown update in real-time via dynamic visual charts.
* **Keep-Alive Infrastructure:** Integrated background cloud cron triggers to bypass server sleep cycles, keeping data delivery instant.

---

## The Tech Stack (How it works under the hood)

We split the project into two independent parts talking to each other across the cloud:

* **The Frontend (The Face):** Built using **React** and **Vite** for a fast, responsive user interface. Styled beautifully using **Tailwind CSS**, with interactive animations handled by **Framer Motion** and graphs rendered via **Recharts**. Hosted on **Vercel**.
* **The Backend (The Brain):** A secure **Spring Boot (Java)** REST API server that processes purchases, updates holdings, and communicates with the database. Containerized inside **Docker** and hosted on **Render**.
* **The Database (The Memory):** A **Neon PostgreSQL** serverless cloud database that permanently remembers transaction histories and user portfolios.

---

##  System Flow Chart
[ React Frontend ]  ──(Secure API Request)──►  [ Spring Boot Backend ]
(Hosted on Vercel)                             (Dockerized on Render)
│
(Reads/Writes Data)
▼
[ Neon PostgreSQL DB ]

---

## 💻 How to Run the Project Locally

### 1. Prerequisites
Make sure you have **Node.js**, **Java 17+**, and **Docker** installed on your machine.

### 2. Run the Backend (Spring Boot)
```bash
cd backend/backend
# Build and run the containerized app
docker build -t valorem-backend .
docker run -p 8081:8081 valorem-backend

