# Project Setup for Mentor-Mentee Platform Backend
Navigate to Backend Directory
```bash
cd Mentor-Mentee-Sytem/backend
```
## Step 1: Initialize the Project
Run the following command to initialize the project:
```bash
npm init -y
```

## Step 2: Install Required Packages
Install the necessary dependencies using:
```bash
npm install express sequelize mysql2 dotenv cors jsonwebtoken bcrypt body-parser multer node-cron nodemailer
```

## Environment Variables
Create a `.env` file in the root directory and configure it as follows:
```plaintext
PORT=3001

# MySQL configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=MentorMentee

# JWT settings
ACCESS_TOKEN_SECRET=your_access_token
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token
REFRESH_TOKEN_EXPIRY=7d

# Email SMTP configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your_app_email
EMAIL_PASS=your_app_password
```

## README.md
# Mentor-Mentee System Backend

This is the backend implementation of a Mentor-Mentee System, built with Node.js and MySQL Database.

## Features
- Authentication using JWT
- Password hashing with bcrypt
- RESTful API with Express
- MySQL for relational data management
- Sequelize ORM for SQL operations
- Email notifications via Nodemailer
- Scheduled tasks using node-cron
- File uploads with multer
## Prerequisites
- Node.js (v14 or higher)
- MySQL Server running locally or remotely
- A MySQL database
## Installation

1. Navigate to the backend folder:
   ```bash
 cd Mentor-Mentee-Sytem/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm start`: Start the production server
- `npm run dev`: Start the development server with Nodemon

## Technologies Used
- **Express.js**: For building RESTful APIs
- **MySQL**: For Relational database
- **Nodemailer**: For sending email notifications
- **node-cron**: For task scheduling
- **Multer**: For handling file uploads
- **bcrypt**: For password hashing
- **Sequelize**: ORM for database models and migrations
