document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Nieprawidłowy login lub hasło");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify({ name: username }));

      window.location.href = "cars.html";
    } catch (error) {
      document.getElementById("login-error").textContent = error.message;
    }
  });
});
