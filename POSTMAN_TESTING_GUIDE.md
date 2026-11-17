# Postman Testing Guide - Set A

First start your server using `npm start`. Do not close the terminal.

Base URL: `http://localhost:3000`

## Test 1: Get all books

- Method: GET
- URL: `http://localhost:3000/api/books`
- Click Send.
- Expected status: `200 OK`
- You should see the three starting books.

## Test 2: Add a new book

- Method: POST
- URL: `http://localhost:3000/api/books`
- Open Body > raw > JSON.
- Paste:

```json
{
  "title": "The Discovery of India",
  "author": "Jawaharlal Nehru",
  "genre": "History",
  "publishedYear": 1946,
  "available": true
}
```

- Click Send.
- Expected status: `201 Created`
- The response should show the new book with ID `104`.

## Test 3: Get one book

- Method: GET
- URL: `http://localhost:3000/api/books/101`
- Click Send.
- Expected status: `200 OK`
- You should see Wings of Fire.

Try this URL too: `http://localhost:3000/api/books/999`
Expected status: `404 Not Found`.

## Test 4: Update a book

- Method: PUT
- URL: `http://localhost:3000/api/books/102`
- Open Body > raw > JSON.
- Paste:

```json
{
  "title": "The Alchemist - Revised Edition",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988,
  "available": true
}
```

- Click Send.
- Expected status: `200 OK`
- The response should show the updated title.

## Test 5: Delete a book

- Method: DELETE
- URL: `http://localhost:3000/api/books/103`
- Click Send.
- Expected status: `200 OK`
- The response should say that the book was deleted.

Try deleting ID `999`.
Expected status: `404 Not Found`.

## Test 6: Filter by author

- Method: GET
- URL: `http://localhost:3000/api/books/filter?author=paulo`
- Click Send.
- Expected status: `200 OK`
- You should get The Alchemist, even though the search uses lowercase letters.

Now try:
`http://localhost:3000/api/books/filter?author=Unknown`

Expected status: `200 OK`, response:

```json
[]
```

## Extra test: Invalid POST data

Send a POST request to `/api/books` with this body:

```json
{
  "title": "Only a title"
}
```

Expected status: `400 Bad Request`.

## Recommended testing order

Run the tests in the order above. POST adds a book, PUT updates a book, and DELETE removes a book. GET and filter requests show the current array contents.
