# Auction Web App

This repository contains the code for a simple auction web application, consisting of two main parts:

1. **Backend API** built with Node.js and Express.
2. **Frontend Application** built with React.

The application has been fully Dockerized, making it easier to set up and run using Docker containers.

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Postman](https://www.postman.com/)

---

## Running the Application with Docker

### 1. Clone the Repository

```bash
# Clone the repository
https://github.com/LazyCoder02/Dockerized-AuctionWebApp.git
cd Dockerized-AuctionWebApp
```

### 2. Build and Start Containers

Run the following command in the root directory (where the `docker-compose.yml` file is located):

```bash
docker compose up --build
```

This will:
- Build the **backend** and **frontend** Docker images.
- Start the containers for the backend and frontend.

### 3. Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:3000`
- **Backend API**: Test the API at `http://localhost:3030`

---

## Application Details

### Frontend
The frontend is a React application served by Nginx. It is built during the Docker build process and served from the `/usr/share/nginx/html` directory in the Nginx container.

### Backend
The backend is a Node.js API using Express, running on port `3030`. It uses SQLite3 as its database.

---

## Docker Setup Details

### Directory Structure
```
auction-web-app/
├── auction-api/         # Backend API
│   ├── Dockerfile       # Dockerfile for backend
│   ├── package.json     # Dependencies for backend
│   └── ...
├── auction-app/         # Frontend React App
│   ├── Dockerfile       # Dockerfile for frontend
│   ├── package.json     # Dependencies for frontend
│   └── ...
├── docker-compose.yml   # Docker Compose file
└── README.md            # Project documentation
```

### Docker Compose Configuration
The `docker-compose.yml` file defines two services:

1. **frontend**:
   - Builds the React app and serves it using Nginx.
   - Exposes port `3000` on the host machine.

2. **backend**:
   - Runs the Node.js API with Express.
   - Exposes port `3030` on the host machine.

### Docker Commands

- **Stop containers**:
  ```bash
  docker-compose down
  ```

- **Rebuild containers**:
  ```bash
  docker-compose up --build
  ```

- **View logs**:
  ```bash
  docker logs <container-name>
  ```

---

## Usage

1. Ensure both the backend server and the frontend application are running (via Docker).
2. Open your browser and navigate to `http://localhost:3000` to access the auction web app.
3. Create an account and log in to start bidding on items.

---

## Testing the Backend API

To test the backend API, use a tool like [Postman](https://www.postman.com/) or `curl`. Here are some example requests:

- **Get all users**:
  ```
  GET http://localhost:3030/api/users/
  ```

- **Get all items**:
  ```
  GET http://localhost:3030/api/items/
  ```

---
## Project done by:
1. Rafael Escrivao Junior
2. Ahmet Gunes

## Happy Bidding! 🚀

