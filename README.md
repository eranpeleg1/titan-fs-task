

# 📚 Quotes of the Day – Fullstack App

This project is a fullstack application that fetches quotes from the FavQs API.
You can specify how many quotes to retrieve and optionally filter by tag. The system includes a caching mechanism, pagination support, and a simple frontend UI.

---

## 🗂 Project Structure

```
quotes-monorepo/
├── frontend/       # React + TypeScript app
├── backend/        # Node.js + Express + TypeScript API server
├── package.json    # Monorepo root with shared scripts
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone <your_repo_url>
cd quotes-monorepo
```

### 2. Install all dependencies

```bash
npm run install-all
```

This installs dependencies for root, backend, and frontend.

### 3. Add `.env` file in `backend/`

```
FAVQS_API_KEY=your_favqs_api_key
```

Sign up at [https://favqs.com/api](https://favqs.com/api) to get a free API key.

---

## 🧪 Development

Run both backend and frontend concurrently:

```bash
npm run dev
```

* Backend: [http://localhost:3001](http://localhost:3001)
* Frontend: [http://localhost:5173](http://localhost:5173)

---

## 🏗 Build

Compile both apps for production:

```bash
npm run build
```

* Frontend is built with Vite
* Backend is compiled from TypeScript to JavaScript

Individual builds:

```bash
npm run build:frontend
npm run build:backend
```

---

## 📦 Start (Production Mode)

Assumes you've already run `npm run build`.

```bash
npm run start
```

Runs both backend (`dist/index.js`) and frontend (preview or static serve).

You can also start each separately:

```bash
npm run start:backend
npm run start:frontend
```

---

## 📬 API Example

```
GET http://localhost:3001/quotes?count=5&tag=life&offset=0
```

---

## 🧹 Scripts Summary

| Script           | Description                        |
| ---------------- | ---------------------------------- |
| `install-all`    | Install all dependencies           |
| `dev`            | Run backend + frontend in dev mode |
| `build`          | Build both apps                    |
| `start`          | Run both apps in production mode   |
| `build:frontend` | Build frontend only                |
| `build:backend`  | Build backend only                 |
| `start:frontend` | Start frontend in prod mode        |
| `start:backend`  | Start backend in prod mode         |

---

## 📌 Technologies Used

* React + Vite + TypeScript
* Node.js + Express + TypeScript
* Axios, dotenv, node-cache

---

## 📖 License

MIT
