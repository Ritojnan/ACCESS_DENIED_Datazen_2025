from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Sender email and password
SENDER_EMAIL = "psdm.noreply@gmail.com"
PASSWORD = ""


@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Get data from the request
        data = request.json
        subject = data.get('subject')
        body = data.get('body')
        receiver_email = data.get('receiver_email')

        # Validate incoming data
        if not subject or not body or not receiver_email:
            return jsonify({"error": "Missing subject, body, or receiver_email"}), 400

        # Create email message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SENDER_EMAIL
        msg["To"] = receiver_email

        html_content=""""""
        # Attach HTML content
        html_part = MIMEText(html_content, "html")
        msg.attach(html_part)

        # Sending the email
        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()

            # Login
            smtp.login(SENDER_EMAIL, PASSWORD)

            # Send email
            smtp.sendmail(SENDER_EMAIL, receiver_email, msg.as_string())

        return jsonify({"message": "Email sent successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)