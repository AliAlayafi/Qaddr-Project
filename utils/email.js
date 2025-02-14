const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'email@gmail.com', 
    pass: process.env.GMAIL_PASSWORD, 
  },
});


async function sendEmail(username,email, link) {
    const mailOptions = {
        from: 'qaddr.estimations@gmail.com', 
        to: email,
        subject: 'Qaddr Password Reset',
        text: 'Qaddr Password Reset',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            text-align: center;
                            color: #333333;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.5;
                            color: #555555;
                        }
                        .cta-button {
                            display: inline-block;
                            background-color: #4CAF50;
                            color: #ffffff;
                            padding: 12px 20px;
                            text-align: center;
                            text-decoration: none;
                            font-weight: bold;
                            border-radius: 5px;
                            margin-top: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #888888;
                            margin-top: 30px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Password Reset Request</h1>
                        <p>Dear ${username},</p>
                        <p>We have received a request to reset your password. To proceed, please click the link below:</p>
                        <p style="text-align: center;">
                            <a href="${link}" class="cta-button">Reset Password</a>
                        </p>
                        <p>If you did not request a password reset, please ignore this email.</p>
                        <p>Best regards,<br/>Qaddr Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Qaddr. All Rights Reserved.</p>
                    </div>
                </body>
            </html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}


async function formatEmail(email) {
    const [localPart, domain] = email.split('@');
    const firstLetter = localPart.charAt(0);
    const lastLetter = localPart.charAt(localPart.length - 1);
    const maskedLocalPart = firstLetter + '**' + lastLetter;
    return `${maskedLocalPart}@${domain}`;
}


module.exports = { 
    sendEmail,
    formatEmail
};
