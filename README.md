This project is a web application that consists of a React frontend and a Node.js backend. It provides various API endpoints for user management, product management, and testimonials.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js installed on your local machine
Clone the repository
 cd your-project
 npm init -y
 npm install express body-parser cors
node server.js
npm start

API Endpoints
Users Table
Sign Up:
Method: POST
URL: http://localhost:4000/signup
Login:
Method: POST
URL: http://localhost:4000/login
Protected Route:
Method: GET
URL: http://localhost:4000/protected_route
Product Table
Get Products:
Method: GET
URL: http://localhost:4000/getproduct
Add Product:
Method: POST
URL: http://localhost:4000/addproduct
Search Product:
Method: GET
URL: http://localhost:4000/getsearchproduct/:name
Filter Product:
Method: GET
URL: http://localhost:4000/filterproduct/:category
Testimonial Table
Get Testimonials:
Method: GET
URL: http://localhost:4000/gettest