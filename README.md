# Qaddr - Car Damage Estimation Platform

## Overview

Qaddr is an online platform that allows users to estimate car damage costs using AI. Users can submit accident reports, upload images, track their report status, and raise objections. Employees review and approve reports, while managers handle objections and schedule manual inspections.

## Project Workflow
[![workflow.jpg](https://i.postimg.cc/Kjbbtkkr/workflow.jpg)](https://postimg.cc/Hc6FgLtV)

## Features

- **User Authentication:** Login, registration, and password reset functionality.
- **Accident Report Submission:** Users upload images and provide an accident key.
- **AI-Powered Estimation:** AI backend processes damage estimates.
- **Report Management:** Employees review/edit reports and approve them.
- **Objection Handling:** Managers handle report objections and schedule manual inspections.
- **Email Notifications:** Email system for password reset and updates.
- **Role-Based Access Control:** Different functionalities for users, employees, and managers.
- **Scheduler System:** Ensures reports are processed in the correct order before reaching employees and checking the request date to handle the status.
- **Dynamic Dashboard:** Displays real-time status of reports and pending tasks.
- **Image Processing Support:** Handles accident photo uploads efficiently.
- **Secure API Integration:** Backend services interact securely using authentication mechanisms.
- **Mobile-Friendly Design:** Optimized for both desktop and mobile users.
- **Scalability:** Built with a modular architecture to support future expansion.


## Tech Stack

- **Frontend:** EJS (Embedded JavaScript Templates), CSS, UIKit, Bootstrap
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB (Sample database available in `Qaddr` folder)
- **AI Backend (Not Included):** Python-based AI & Scheduler for managing requests before sending them to employees

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/AliAlayafi/Qaddr-Project.git
cd Qaddr-Project
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the root directory with the required environment variables. Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
GMAIL_PASSWORD=your_email_password
```

### 4. Configure Email for Password Reset

Edit the `Utils/email.js` file and provide a **valid email address** for sending password reset emails.

### 5. Start the Server

```sh
npm run dev
```

## AI & Scheduler Backend (Not Included)

The platform requires a **Python AI & Scheduler Backend** to process accident reports before sending them to employees. This part of the system is not uploaded due to its large size.

## Database Sample

A **sample MongoDB database** is available in the `Qaddr` folder. You can use it to set up your local database.


## License
This project is licensed under the MIT License.

