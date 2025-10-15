import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber # <-- IMPORT THE NEW LIBRARY

# Import the email sending function
from email_service import send_email

# Load environment variables from .env file
load_dotenv()

# --- Configuration and Setup ---

# Configure the Gemini API key
try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
except AttributeError:
    print("Error: The GOOGLE_API_KEY environment variable is not set.")
    exit(1)

# --- MODIFIED SECTION: Function to load and parse the PDF CV ---
def load_cv_content():
    """
    Opens and extracts all text from the cv.pdf file.
    """
    full_text = ""
    try:
        # pdfplumber.open() opens the PDF file
        with pdfplumber.open("cv.pdf") as pdf:
            # We loop through each page in the PDF
            for page in pdf.pages:
                # page.extract_text() gets the text from the current page
                page_text = page.extract_text()
                if page_text: # Ensure text was found before appending
                    full_text += page_text + "\n"
        return full_text
    except FileNotFoundError:
        return "Error: cv.pdf file not found in the project directory."
    except Exception as e:
        return f"Error: Failed to read or parse the PDF file: {e}"
# --- END OF MODIFIED SECTION ---

# Initialize the Generative Model
model = genai.GenerativeModel('models/gemini-pro-latest')
cv_context = load_cv_content() # This function now reads the PDF!


# --- Pydantic Models for Request Bodies (No changes needed here) ---

class ChatRequest(BaseModel):
    prompt: str

class EmailRequest(BaseModel):
    recipient: EmailStr
    subject: str
    body: str


# --- FastAPI Application (No changes needed here) ---

app = FastAPI(
    title="Model Context Protocol (MCP) Server",
    description="A server to chat about a PDF CV and send email notifications.",
)

# --- CORS Middleware for Frontend (No changes needed here) ---
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://cv-llm-assistant.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- API Endpoints (No changes needed here) ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the MCP Server. Visit /docs for API documentation."}


@app.post("/chat")
async def chat_with_cv(request: ChatRequest):
    """
    Receives a prompt and answers questions based on the loaded CV context.
    """
    if "Error" in cv_context:
        raise HTTPException(status_code=500, detail=cv_context)

    # This prompt construction works exactly the same as before
    full_prompt = f"""
    Based ONLY on the following CV context, please answer the user's question.
    If the answer cannot be found in the context, say 'I cannot answer that based on the provided CV.'

    ---
    CV Context:
    {cv_context}
    ---

    User's Question:
    {request.prompt}
    """

    try:
        response = model.generate_content(full_prompt)
        return {"answer": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred with the AI model: {str(e)}")


@app.post("/send-email")
async def handle_send_email(email_details: EmailRequest):
    """
    Receives email details and uses the email service to send an email.
    """
    success = send_email(
        recipient=email_details.recipient,
        subject=email_details.subject,
        body=email_details.body
    )
    if success:
        return {"message": "Email sent successfully."}
    else:
        raise HTTPException(status_code=500, detail="Failed to send email.")



@app.get("/status", summary="Check server status")
def get_status():
    """
    A simple endpoint to check if the server is running.
    Useful for 'waking up' the server on hosting platforms that sleep on inactivity.
    """
    return {"status": "ok", "message": "Server is awake and running."}