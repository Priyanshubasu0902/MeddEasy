# MedEasy

MedEasy is a comprehensive personal health record management system designed to help users effortlessly track their medical information. This full-stack application allows users to manage appointments, monitor vital health readings, store prescriptions and test results securely, and keep a list of their doctors. It also features an automated email reminder system for upcoming appointments.

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
git clone https://github.com/Priyanshubasu0902/MedEasy.git
cd MedEasy
```

### 2. Backend Setup

1.  Navigate to the server directory:
    ```sh
    cd server
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following environment variables. Replace the placeholder values with your actual credentials.
    ```env
    # Server Configuration
    PORT=5000
    
    # MongoDB Connection
    MONGODB_URI=<your_mongodb_connection_string>
    
    # JWT
    JWT_SECRET=<your_jwt_secret_key>
    
    # Cloudinary for file uploads
    CLOUDINARY_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_SECRET_KEY=<your_cloudinary_api_secret_key>
    
    # Nodemailer for sending emails (using Gmail)
    EMAIL_ID=<your_gmail_address>
    EMAIL_PASSWORD=<your_gmail_app_password>
    ```
4.  Start the backend server:
    ```sh
    npm run server
    ```
    The server will be running on `http://localhost:5000`.

### 3. Frontend Setup

1.  Navigate to the client directory from the root folder:
    ```sh
    cd client
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `client` directory and add the backend URL:
    ```env
    VITE_BACKEND_URL=http://localhost:5000
    ```
4.  Start the frontend development server:
    ```sh
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port specified by Vite).

## API Endpoints

The backend provides the following RESTful API endpoints:

-   **Authentication & Users (`/api/users`)**
    -   `POST /signUp`: Register a new user.
    -   `POST /login`: Log in an existing user.
    -   `GET /user`: Fetch authenticated user's data.
    -   `POST /editDetails`: Update user profile information.
    -   `GET /deleteUser`: Delete user account and all associated data.
    -   `POST /setPassword`: Set a new password after OTP verification.

-   **OTP (`/api`)**
    -   `POST /generate-otp`: Send an OTP for password reset.
    -   `POST /verify-otp`: Verify the provided OTP.

-   **Appointments (`/api/appointments`)**
    -   `POST /addAppointment`: Add a new appointment.
    -   `GET /getAppointments`: Get all appointments for the user.
    -   `POST /editAppointment/:id`: Update a specific appointment.
    -   `GET /deleteAppointment/:id`: Delete an appointment.

-   **Readings (`/api/readings`)**
    -   `POST /addReadings`: Add a new health reading.
    -   `GET /getReadings`: Get all health readings.
    -   `POST /editReading/:id`: Update a reading.
    -   `GET /deleteReadings/:id`: Delete a reading.

-   **Prescriptions (`/api/prescriptions`)**
    -   `POST /addPrescription`: Upload a new prescription file.
    -   `GET /getPrescriptions`: Get all prescriptions.
    -   `POST /editPrescription/:id`: Update a prescription's details.
    -   `GET /deletePrescription/:id`: Delete a prescription.

-   **Test Results (`/api/testResults`)**
    -   `POST /addTestResult`: Upload a new test result file.
    -   `GET /getTestResults`: Get all test results.
    -   `POST /editTestResult/:id`: Update a test result's details.
    -   `GET /deleteTestResult/:id`: Delete a test result.

-   **Doctors (`/api/doctors`)**
    -   `POST /addDoctor`: Add a new doctor.
    -   `GET /getDoctor`: Get all doctors.
    -   `GET /deleteDoctor/:id`: Delete a doctor.
