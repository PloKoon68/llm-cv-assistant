# AI-Powered CV Assistant

> An intelligent, interactive assistant that allows you to chat with my CV and send email notifications, powered by Google's Gemini Pro and built with a FastAPI backend and a Next.js frontend.

This project is a full-stack application demonstrating the integration of a Large Language Model (LLM) to parse and understand document context, exposed via a robust API and consumed by a modern web interface.

### 🔗 Live Demos

*   **Frontend (Next.js):** [**Live on Vercel**](https://llm-cv-assistant.vercel.app)
*   **Backend API (FastAPI):** [**Live on Render**](https://cv-chatbot-ivzx.onrender.com/docs)

*(Note: The backend on Render's free tier may "sleep" after a period of inactivity. The first request might take a moment to wake the server up.)*

---

<img width="1047" height="893" alt="image" src="https://github.com/user-attachments/assets/1caaaa41-5669-4bed-b311-5d2477f00d2b" />

## ✨ Features

*   **Interactive CV Chat**: Ask questions about my professional experience, skills, or education in natural language (e.g., *"What was his role at his last company?"*).
*   **LLM Integration**: Utilizes Google's Gemini Pro model to provide context-aware answers based on the content of my PDF resume.
*   **Email Notification System**: A dedicated API endpoint to programmatically send emails.
*   **RESTful API Backend**: Built with FastAPI, providing a scalable, documented, and high-performance server.
*   **Responsive Frontend**: A clean and modern user interface built with Next.js.
*   **Dockerized & Deployable**: The backend is fully containerized with Docker for consistent and easy deployment.

## 🚀 Tech Stack

| Area      | Technology                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) |
| **Frontend**  | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Deployment**| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)                                                                                                                                                                                                                   |

## 🛠️ Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Git
*   Python 3.11+
*   Node.js and npm
*   Docker (for containerizing the backend)

### Backend Setup (FastAPI)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PloKoon68/llm-cv-assistant.git
    cd llm-cv-assistant/backend # Or your backend folder name
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Set up environment variables:**
    *   Create a file named `.env` in the backend directory.
    *   Copy the contents of `.env.example` (if you have one) or add the necessary variables (see Configuration section below).
5.  **Place your CV:**
    *   Add your resume file as `cv.pdf` in the backend directory.
6.  **Run the server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend Setup (Next.js)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend # Or your frontend folder name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    *   Create a file named `.env.local`.
    *   Add your backend API URL (see Configuration section below).
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## ⚙️ Configuration

### Backend (`.env`)

Your backend requires the following environment variables to function:

```
# Google Gemini API Key
GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Gmail credentials for sending emails
SENDER_EMAIL="your.email@gmail.com"
EMAIL_APP_PASSWORD="your-16-character-google-app-password"
```

### Frontend (`.env.local`)

Your frontend needs to know the URL of your backend API:

```
# URL of the deployed or local FastAPI server
NEXT_PUBLIC_API_URL="http://localhost:8000"
```
*For production, change this to your Render API URL.*

## 🔗 API Endpoints

The FastAPI server exposes the following endpoints:

| Method | Endpoint      | Description                                          |
| :----- | :------------ | :--------------------------------------------------- |
| `GET`  | `/status`     | Checks if the server is running. Used to wake it up. |
| `POST` | `/chat`       | Takes a JSON with a `prompt` and returns an answer.  |
| `POST` | `/send-email` | Takes `recipient`, `subject`, and `body` to send an email. |

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📬 Contact

Mehmet Ors - [LinkedIn](https://www.linkedin.com/in/mehmet-ors/) - [GitHub](https://github.com/PloKoon68) the link above.)
✨ Features
Interactive CV Chat: Ask questions about my professional experience, skills, or education in natural language (e.g., "What was his role at his last company?").
LLM Integration: Utilizes Google's Gemini Pro model to provide context-aware answers based on the content of my PDF resume.
Email Notification System: A dedicated API endpoint to programmatically send emails.
RESTful API Backend: Built with FastAPI, providing a scalable, documented, and high-performance server.
Responsive Frontend: A clean and modern user interface built with Next.js and React.
Dockerized & Deployable: The backend is fully containerized with Docker for consistent and easy deployment.
🚀 Tech Stack
Area	Technology
Backend	
![alt text](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![alt text](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![alt text](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![alt text](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
Frontend	
![alt text](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![alt text](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![alt text](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![alt text](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
Deployment	
![alt text](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![alt text](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
🛠️ Getting Started
To get a local copy up and running, follow these steps.
Prerequisites
Git
Python 3.9+
Node.js and npm
Docker (for containerizing the backend)
Backend Setup (FastAPI)
Clone the repository:
code
Bash
git clone https://github.com/PloKoon68/llm-cv-assistant.git
cd llm-cv-assistant/backend # Or your backend folder name
Create and activate a virtual environment:
code
Bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:
code
Bash
pip install -r requirements.txt
Set up environment variables:
Create a file named .env in the backend directory.
Copy the contents of .env.example (if you have one) or add the necessary variables (see Configuration section below).
Place your CV:
Add your resume file as cv.pdf in the backend directory.
Run the server:
code
Bash
uvicorn main:app --reload
The API will be available at http://localhost:8000.
Frontend Setup (Next.js)
Navigate to the frontend directory:
code
Bash
cd ../frontend # Or your frontend folder name
Install dependencies:
code
Bash
npm install
Set up environment variables:
Create a file named .env.local.
Add your backend API URL (see Configuration section below).
Run the development server:
code
Bash
npm run dev
The application will be available at http://localhost:3000.
⚙️ Configuration
Backend (.env)
Your backend requires the following environment variables to function:
code
Code
# Google Gemini API Key
GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Gmail credentials for sending emails
SENDER_EMAIL="your.email@gmail.com"
EMAIL_APP_PASSWORD="your-16-character-google-app-password"
Frontend (.env.local)
Your frontend needs to know the URL of your backend API:
code
Code
# URL of the deployed or local FastAPI server
NEXT_PUBLIC_API_URL="http://localhost:8000"
For production, change this to your Render API URL.
🔗 API Endpoints
The FastAPI server exposes the following endpoints:
Method	Endpoint	Description
GET	/status	Checks if the server is running. Used to wake it up.
POST	/chat	Takes a JSON with a prompt and returns an answer.
POST	/send-email	Takes recipient, subject, and body to send an email.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
📬 Contact
Mehmet Ors - LinkedIn - GitHub
