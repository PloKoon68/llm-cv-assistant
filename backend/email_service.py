import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(recipient: str, subject: str, body: str):
    """
    Sends an email using credentials from environment variables.
    """
    sender_email = os.getenv("SENDER_EMAIL")
    password = os.getenv("EMAIL_APP_PASSWORD")

    if not sender_email or not password:
        raise ValueError("Email credentials (SENDER_EMAIL, EMAIL_APP_PASSWORD) are not set.")

    # Create the email message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to Gmail's SMTP server
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)
        server.sendmail(sender_email, recipient, message.as_string())
        server.quit()
        print(f"Email successfully sent to {recipient}")
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False