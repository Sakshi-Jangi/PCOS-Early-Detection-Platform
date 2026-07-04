# 🌸 PCOS Early Detection Platform

An AI-powered web application for early PCOS risk assessment. The platform enables users to securely register, manage their health profile, track menstrual cycle information, visualize health analytics, and receive machine learning-based PCOS risk predictions.

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 👤 User Profile Management
- 📅 Period Tracking
- 🤖 AI-Based PCOS Risk Prediction
- 📊 Health Dashboard & Analytics
- 📄 PDF Report Generation
- ☁️ Fully Deployed on Render

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Axios
- Recharts

**Backend**
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication

**Machine Learning**
- Python
- Scikit-learn

---

## 🚀 Live Demo

**Frontend:**  
https://pcos-early-detection-platform.onrender.com

**Backend API Docs:**  
https://pcos-backend-l6xq.onrender.com/docs

---

## 📂 Project Structure

```
PCOS-Early-Detection-Platform/
│
├── frontend/      # React Frontend
├── backend/       # FastAPI Backend
└── ml/            # Machine Learning Model
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sakshi-Jangi/PCOS-Early-Detection-Platform.git
cd PCOS-Early-Detection-Platform
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```





## 👩‍💻 Developer

**Sakshi S Jangi**

B.Tech Electronics and Communication Engineering  
National Institute of Technology Warangal
