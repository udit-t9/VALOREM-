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

## 🛠️ The Tech Stack & Architecture

We split the project into two independent parts talking to each other across the cloud:

### Frontend (The Face)
* **Framework:** **React** with **Vite** for a fast, optimized client environment.
* **Styling & UI:** **Tailwind CSS** for clean layout designs, with smooth transitions handled by **Framer Motion**.
* **Data Visualization:** **Recharts** to render dynamic portfolio asset allocation breakdowns.
* **Hosting:** Deployed via **Vercel** with integrated Git CI/CD pipelines.

### Backend & Security (The Brain)
* **Core Framework:** **Java Spring Boot** built on top of the **Spring MVC** architecture to handle RESTful API web routing.
* **Backend Security & Policy:** Managed through customized **Spring Security** configurations, including strict **Cross-Origin Resource Sharing (CORS)** policies and credentials validation to secure communication with the frontend domain.
* **Data Layer:** Utilizes **Spring Data JPA** for Object-Relational Mapping (ORM) alongside reliable HikariCP database connection pooling.
* **Containerization:** Packaged completely inside a **Docker** container environment to ensure system parity between local testing and production deployment.
* **Hosting:** Hosted as a decoupled web service on **Render**.

### Database (The Memory)
* **Engine:** High-performance, serverless **Neon PostgreSQL** cloud database that permanently
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

