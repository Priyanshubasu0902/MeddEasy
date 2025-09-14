# MeddEasy

MeddEasy is a comprehensive personal health record management system designed to help users effortlessly track their medical information. This full-stack application allows users to manage appointments, monitor vital health readings, store prescriptions and test results securely, and keep a list of their doctors. It also features an automated email reminder system for upcoming appointments.

## 🚀 Live Project

🔗 [MeddEasy Live Application](https://meddeasy.netlify.app/)

## Key Features

-   **User Authentication:** Secure sign-up, login, and password reset functionality using JWT and OTP email verification.
-   **Personal Dashboard:** A centralized view of your health information, including patient details and upcoming appointments.
-   **Appointment Management:** Schedule, edit and delete appointments. View appointments categorized as today's, upcoming, previous, and missed.
-   **Health Readings:** Track and manage vital readings like blood sugar (mg/dl) and blood pressure (mmHg).
-   **Prescription & Test Result Storage:** Upload, view, and manage prescription and test result documents (PDF, DOCX) with secure cloud storage via Cloudinary.
-   **Doctor Management:** Maintain a list of your doctors with their specialities and contact numbers.
-   **Automated Reminders:** Receive automatic email notifications for upcoming and missed appointments.

## Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB, Mongoose
-   **Authentication:** JSON Web Tokens (JWT), Bcrypt
-   **File Storage:** Cloudinary
-   **Email & Notifications:** Nodemailer, Node-cron

## Project Structure

The repository is organized into two main directories:

-   **`client/`**: The React frontend application built with Vite.
-   **`server/`**: The Express.js backend API and database logic.

## Local Setup and Installation

To get this project up and running on your local machine, follow these steps.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm (or yarn)
-   A MongoDB database instance (local or a cloud service like MongoDB Atlas)

### 1. Clone the Repository

```sh
git clone https://github.com/Priyanshubasu0902/MeddEasy.git
cd MedEasy
