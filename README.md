# SimpleBlog

SimpleBlog is a simple blog platform that allows users to write, edit, and publish articles with tagging and search functionality. Built with React, Vite, TypeScript, and Tailwind CSS on the frontend, and Express, TypeScript, and MongoDB on the backend.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT
- Create, edit, and delete articles
- Tagging system for articles
- Search functionality for articles
- Responsive design using Tailwind CSS

## Technologies

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - React Router

- **Backend:**
  - Express
  - TypeScript
  - MongoDB
  - Zod for input validation
  - JSON Web Tokens for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd SimpleBlog
   
2. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:

   ```bash
   cd ../backend
   npm install
   ```

4. Create a `.env` file in the backend directory based on the `.env.example` file and set your environment variables.

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Endpoints

### Articles

- **GET** `/api/articles` - Fetches a list of all published articles.
- **GET** `/api/articles/:id` - Fetches a single article by its ID.
- **POST** `/api/articles` - Creates a new article.
- **PUT** `/api/articles/:id` - Updates an existing article by its ID.
- **DELETE** `/api/articles/:id` - Deletes an article by its ID.
- **GET** `/api/articles/search` - Searches for articles based on query parameters.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.