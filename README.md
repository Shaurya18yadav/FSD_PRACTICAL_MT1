# Set A - Library Book Management API

## 1. What is this project?

This is a simple REST API made using Node.js and Express.js. It is used to add, view, update, delete, and search library books.

The books are stored in a JavaScript array. No database is used, as required in the practical question.

## 2. Files

- `server.js` - contains the complete API code.
- `package.json` - contains project details and the Express dependency.
- `package-lock.json` - created automatically when you run `npm install`.

## 3. Run the project

Open this folder in VS Code. Open the terminal and run:

```bash
npm install
npm start
```

You should see:

```text
Server is running at http://localhost:3000
```

Keep this terminal open while testing.

## 4. API endpoints

| Method | URL | Work |
|---|---|---|
| GET | `http://localhost:3000/api/books` | Show all books |
| POST | `http://localhost:3000/api/books` | Add a book |
| GET | `http://localhost:3000/api/books/101` | Find book with ID 101 |
| PUT | `http://localhost:3000/api/books/102` | Update book with ID 102 |
| DELETE | `http://localhost:3000/api/books/103` | Delete book with ID 103 |
| GET | `http://localhost:3000/api/books/filter?author=Paulo` | Search by author |

## 5. POST and PUT body

In Postman, select Body > raw > JSON and enter:

```json
{
  "title": "The Discovery of India",
  "author": "Jawaharlal Nehru",
  "genre": "History",
  "publishedYear": 1946,
  "available": true
}
```

Do not enter `id`. The server creates the ID automatically.

## 6. Status codes

- `200` - request completed successfully.
- `201` - a new book was created.
- `400` - request data is missing or incorrect.
- `404` - the requested book does not exist.

## 7. Important point

The array is stored in server memory. If you stop and restart the server, it goes back to the three starting books. This is expected for this practical.
