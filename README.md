# Assignment 7 — Express.js + MongoDB

## Setup
1. Install Node.js and make sure MongoDB is running.
2. Copy `.env.example` to `.env`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Import the requests from `postman-collection.json` into Postman.

Base URL: `http://localhost:3000`

## Suggested order
1. `POST /collection/books`
2. `POST /collection/authors`
3. `POST /collection/logs/capped`
4. `POST /collection/books/index`
5. `POST /books/batch` (creates sample books)
6. Run the remaining book queries and update/delete routes.

Question 15 is destructive: it deletes every book whose year is below the supplied year. Use sample/test data.

MongoDB Shell answers are in `mongosh-solutions.txt`.
Bonus solution is in `bonus.js`.
