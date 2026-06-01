# E-commerce Products Backend

A Node.js and Express backend API for an e-commerce products application. It supports user authentication, JWT cookie-based authorization, product CRUD operations, category filtering, image uploads with Multer, ImageKit cloud storage, and MongoDB persistence through Mongoose.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication stored in cookies
- Protected product create, update, and delete routes
- Public product listing and product detail routes
- Product filtering by category using query params
- Add products to a user cart with quantity updates
- Multiple image upload support using Multer memory storage
- Image upload to ImageKit
- MongoDB models for users, products, and cart items
- Central async error handling middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- multer
- ImageKit
- dotenv
- nodemon

## Project Structure

```txt
.
├── server.js
├── package.json
├── README.md
└── src
    ├── app.js
    ├── config
    │   ├── db.js
    │   ├── imagekit.js
    │   └── multer.js
    ├── controllers
    │   ├── auth.controller.js
    │   ├── cart.controller.js
    │   └── products.controller.js
    ├── middlewares
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    ├── models
    │   ├── auth.model.js
    │   ├── cart.model.js
    │   └── products.model.js
    ├── routes
    │   ├── auth.route.js
    │   ├── cart.route.js
    │   └── products.route.js
    ├── services
    │   ├── auth.service.js
    │   ├── cart.service.js
    │   └── products.service.js
    └── utils
        ├── apiError.js
        └── asyncHandler.js
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the project root.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 3. Run The Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Default server URL:

```txt
http://localhost:3000
```

## API Routes

### Health Check

```http
GET /
```

Response:

```txt
Welcome to the E-commerce Products API!
```

## Authentication API

### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Successful response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {},
  "token": "jwt_token"
}
```

The API also sets the JWT token in a cookie named `token`.

### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Successful response:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {},
  "token": "jwt_token"
}
```

## Products API

### Get All Products

```http
GET /api/products
```

### Filter Products By Category

```http
GET /api/products?category=mobile
```

The `category` query parameter filters products by their category.

### Get Product By ID

```http
GET /api/products/:id
```

Example:

```http
GET /api/products/665f3a9d29f6f89b1c8f1234
```

### Create Product

```http
POST /api/products
```

Access: Private

Authentication is required. Send the JWT token using the `token` cookie.

Request type:

```txt
multipart/form-data
```

Fields:

```txt
name        string  required
price       number  required
description string optional
category    string optional
images      file[]  required
```

Example form-data:

```txt
name: iPhone 15
price: 79999
description: Latest Apple mobile phone
category: mobile
images: product-image-1.jpg
images: product-image-2.jpg
```

### Update Product

```http
PATCH /api/products/:id
```

Access: Private

Authentication is required. Send the JWT token using the `token` cookie.

Request type:

```txt
multipart/form-data
```

Supported fields:

```txt
name
price
description
category
images
```

### Delete Product

```http
DELETE /api/products/:id
```

Access: Private

Authentication is required. Send the JWT token using the `token` cookie.

## Cart API

### Get Cart Items

```http
GET /api/cart
```

Access: Private

Retrieves the authenticated user's cart items. Each item includes product details and quantity.

### Add Product To Cart

```http
POST /api/cart
```

Access: Private

Request body:

```json
{
  "productId": "605c75d34f1f1c24d8e3b123",
  "quantity": 2
}
```

If the product already exists in the user's cart, the service increments the quantity.

## Data Models

### User

```txt
name      string  required
email     string  required, unique, lowercase
password  string  required, hashed before save
```

### Product

```txt
name         string    required
description  string    optional
price        number    required
category     string    default: others
images       string[]  required
userId       ObjectId  references user
```

### Cart

```txt
userId     ObjectId  required, references user
productId  ObjectId  required, references product
quantity   number    required, min: 1
```

## Authentication Flow

1. User registers or logs in.
2. Server creates a JWT token.
3. Server sends the token in the JSON response and stores it in a `token` cookie.
4. Protected routes read the token from cookies.
5. If the token is valid, the request continues.
6. If the token is missing or invalid, the API returns an unauthorized error.

## Image Upload Flow

1. Client sends product images as `multipart/form-data`.
2. Multer stores files in memory.
3. The service uploads each file buffer to ImageKit.
4. ImageKit returns hosted image URLs.
5. The image URLs are saved in the product document.

## Error Handling

The project uses a global error middleware. Services throw custom API errors using `apiError`, and async controllers are wrapped with `asyncHandler` so errors are passed to the middleware automatically.

Error response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Scripts

```bash
npm run dev
```

Runs the server using nodemon.

```bash
npm start
```

Runs the server using Node.js.

## Notes

- Product image fields must use the name `images`.
- Product create and update requests must use `multipart/form-data`.
- Product category values are stored in lowercase.
- Private routes require the `token` cookie created during register or login.

