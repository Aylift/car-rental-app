document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:8000/api/cars/", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("cars-list");
      if (!data.length) {
        container.innerHTML = "<p>Brak dostępnych samochodów.</p>";
        return;
      }

      data.forEach(car => {
        const div = document.createElement("div");
        div.classList.add("car-card");
        div.innerHTML = `
          <h3>${car.brand} ${car.model}</h3>
          <p>Rok: ${car.year}</p>
          <p>Cena za dzień: ${car.price_per_day} zł</p>
          <p>Dostępny: ${car.available ? "Tak" : "Nie"}</p>
          <a href="car.html?id=${car.id}">Szczegóły</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById("cars-list").innerHTML = "<p>Błąd wczytywania samochodów.</p>";
    });
});
