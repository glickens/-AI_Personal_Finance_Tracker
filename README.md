# AI Personal Finance Tracker

A full-stack financial management application that tracks expenses, analyzes spending habits, and uses AI to generate predictions and insights.

Live Site: https://cheery-narwhal-d4cf08.netlify.app  
Backend API: https://ai-finance-backend-ma8u.onrender.com

## Technologies
- Backend: Python, Flask, SQLAlchemy
- Frontend: React, Material-UI
- AI/ML: Scikit-learn, OpenAI API
- Database: PostgreSQL (Render), SQLite (local)

## Features
- Add, view, and delete expenses
- AI-powered predictions and budget summaries
- Data visualizations with charts and graphs
- Responsive design with Material-UI

## API Endpoints
- GET /api/expenses
- POST /api/expenses
- DELETE /api/expenses/<id>
- GET /api/predict

## Setup
Clone the repo:
git clone https://github.com/glickens/-AI_Personal_Finance_Tracker.git

Backend:
cd backend  
python -m venv venv  
source venv/bin/activate (or venv\Scripts\activate on Windows)  
pip install -r requirements.txt  
python app.py

Frontend:
cd ../frontend  
npm install  
npm start

## Author
Terry Lynn - https://github.com/glickens
