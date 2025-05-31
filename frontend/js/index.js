document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("home-actions");

  if (!container) return;

  if (user) {
    container.innerHTML = `
      <p>Witaj ponownie, ${user.name}! </p>
      <a href="cars.html" class="button">Zobacz samochody</a>
    `;
  } else {
    container.innerHTML = `
      <a href="login.html" class="button">Zaloguj się</a>
      <a href="register.html" class="button">Zarejestruj się</a>
    `;
  }
});
