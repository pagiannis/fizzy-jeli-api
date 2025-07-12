## fizzy-jeli-api

This is the backend API for the [fizzy-jeli](https://github.com/pagiannis/fizzy-jeli) web application.  
It provides data to the frontend using a RESTful architecture.

---

## Features

🔐**Authentication & Security**:

- JWT Authentication: Uses JSON Web Tokens to authenticate users securely.
- Password Hashing: Stores hashed passwords using bcrypt for enhanced user data protection.
- Auth Middleware: Implements middleware to guard protected routes.

📦 **Routing & Controllers**:

- Clean separation of routes and controllers for modularity.
- RESTful routes for users, products, carts, and more.
- Follows the Separation of Concerns (SoC) pattern.

📄 **Data Validation**:

- JOI validation on request bodies to enforce schema integrity and return clear error messages.

💌 **Communication**:

- Nodemailer integration for email notifications/verifications.

🧩 **Middleware Architecture**:

- Custom Express middleware.

🛢️ **Database & Models**:

- MongoDB with Mongoose for schema-based modeling and easy data manipulation.

🌍 **CORS Support**:

- Fully enabled CORS configuration to allow cross-origin requests from the frontend [fizzy-jeli](https://github.com/pagiannis/fizzy-jeli.git).

🧪 **Extensible Structure**:

- Clean file and folder architecture for future growth.
- Easy to add more routes/controllers/models.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- REST
- CORS

---

## Quick Start

1. **Clone the repository**:

```bash
git clone https://github.com/pagiannis/fizzy-jeli-api.git
cd fizzy-jeli-api
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a .env file in the root that contains te folloiwing:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=my_own_secret
EMAIL_VERIFICATION_SECRET=your_email_secret
EMAIL_USER=thefizzyjeli@gmail.com
EMAIL_PASS=your_email_password
EMAIL_APP_PASSWORD=your_emai_app_password
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
```

⚠️ Important: Replace the placeholder values in the .env file with your own configuration:

For MONGO_URI, you can use a free MongoDB cluster from MongoDB Atlas.

Choose a JWT_SECRET.

Define the port your backend server will run on (default: 3000).

Make sure FRONTEND_PORT matches the actual port your React app runs on (e.g., http://localhost:5173).

4. **Run the server**:

```bash
node index.js
```

The API will now run at: http://localhost:3000

---

## 🧪 Testing

You can test the API locally using tools like:

Postman

---

## Frontend

You can find/run the frontend [here](https://github.com/pagiannis/fizzy-jeli.git).

---

## 🪪 License

This project is open-source under the MIT License.
