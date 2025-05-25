document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
});

function loadPartials() {
  loadHTML("partials/header.html", "header-container", updateNavLinks);
  loadHTML("partials/footer.html", "footer-container");
}

function loadHTML(url, containerId, callback) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
      if (callback) callback();
    })
    .catch(error => {
      console.error(`Błąd wczytywania ${url}:`, error);
    });
}

function updateNavLinks() {
  const nav = document.getElementById("nav-links");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <span>Witaj, ${user.name}</span>
      <a href="index.html">Strona główna</a>
      <a href="cars.html">Samochody</a>
      <a href="#" onclick="logout()">Wyloguj</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html">Strona główna</a>
      <a href="cars.html">Samochody</a>
      <a href="login.html">Zaloguj</a>
      <a href="register.html">Zarejestruj</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
