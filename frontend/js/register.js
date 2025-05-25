document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) throw new Error("Rejestracja nie powiodła się");

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "cars.html";
    } catch (error) {
      document.getElementById("register-error").textContent = error.message;
    }
  });
});
