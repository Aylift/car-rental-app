# car-rental-app
<h1>Car rental web app, made using Django and React.</h1>

### How to run locally:
1. Clone the repo

    git clone https://github.com/Aylift/car-rental-app.git
   
    cd car-rental-app

2. Install requirements
 
    _pip install -r requirements.txt_

3. Run Server

    - `cd car_rental`
    - `python manage.py runserver`

4. Open localhost in your browser

    _http://localhost:8000_

5. To See API endpoints, go to:

    _http://localhost:8000/api/docs_

## Frontend – Static Web Client

The frontend is a pure HTML/SCSS/JS client located in the `/frontend` folder. It communicates with the Django backend using fetch requests and JWT authentication.

### How to run the frontend

You can use any static file server. The simplest way is:

cd frontend
python -m http.server 3000

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure your Django backend is running on `http://localhost:8000`.

### Authentication

- On login, the backend returns a JWT access + refresh token.
- Tokens are stored in `localStorage` and used in `Authorization: Bearer <token>` headers.
- Logged-in state is reflected in the header (username shown, logout available).

### SCSS setup

- SCSS is written in `/frontend/styles/style.scss`.
- If using VSCode, configure **Live Sass Compiler** to output CSS into `/frontend/styles/css`.