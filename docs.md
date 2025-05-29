
# Project Documentation – Car Rental App

## Overview

This project is a full-stack web application for car rental services, developed using **Django (REST API)** for the backend and a **static frontend** built with HTML, SCSS, and vanilla JavaScript.

The application allows users to register, log in, browse available cars, view details, and (optionally) make reservations.

---

## Technology Stack

### Backend
- Python 3
- Django
- Django REST Framework
- Simple JWT (for authentication)
- Spectacular (OpenAPI schema and docs)

### Frontend
- HTML5 + SCSS
- Vanilla JavaScript (modular files)
- Static file server (`http.server` or any other)
- Live Sass Compiler (recommended for SCSS workflow)

---

## Project Structure (selected parts)

```
car-rental-app/
├── car_rental/            # Django project
│   ├── users/             # Custom user model and auth logic
│   ├── cars/              # Car listing APIs
│   ├── reservations/      # Reservation API logic
│   └── ...
├── frontend/              # Static frontend
│   ├── index.html         # Homepage
│   ├── login.html
│   ├── register.html
│   ├── cars.html
│   ├── car.html
│   ├── js/
│   │   ├── main.js        # Shared header/footer logic
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── cars.js
│   │   └── car.js
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   └── styles/
│       └── style.scss     # SCSS styles (compiled to css/)
```

---

## Authentication Flow

- User sends a POST request to `/api/auth/login/` with `username` and `password`
- Backend responds with `access` and `refresh` JWT tokens
- Frontend stores tokens in `localStorage`
- Authenticated requests use the `Authorization: Bearer <token>` header
- Logged-in state is reflected dynamically in the header (via `main.js`)
- Logging out clears localStorage and redirects to homepage

---

## API Overview (Django DRF)

The API is exposed under `/api/`. A full OpenAPI schema is available at:

- [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

### Auth endpoints:
- `POST /api/auth/register/` – User registration
- `POST /api/auth/login/` – Get JWT tokens (SimpleJWT)
- `POST /api/auth/refresh/` – Refresh access token

### Car endpoints:
- `GET /api/cars/` – List all cars
- `GET /api/cars/<id>/` – Retrieve details of a car

*(Reservation endpoints are also available but not yet connected to the frontend.)*

---

## SCSS & Build Notes

- SCSS is managed manually using Live Sass Compiler
- Compile `style.scss` to `styles/css/style.css`
- Suggested VSCode setting:

```json
"liveSassCompile.settings.formats": [
  {
    "format": "expanded",
    "extensionName": ".css",
    "savePath": "/frontend/styles/css"
  }
]
```

---

## Completed Features

- [x] Backend API for cars, auth, and reservations
- [x] JWT authentication
- [x] Login, register, logout flows
- [x] Dynamic header/footer depending on auth state
- [x] Car list and detail views
- [x] Fully separated HTML and JavaScript logic
- [x] Mobile-friendly styles using SCSS

---

## Next Steps / TODO

- [ ] Connect reservation API to frontend
- [ ] Add reservation forms and views
- [ ] Add user profile panel
- [ ] Admin car management
- [ ] Pagination and filters for car list

---
