document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");
  const token = localStorage.getItem("token");

  fetch(`http://localhost:8000/api/cars/${carId}/`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(car => {
      const div = document.getElementById("car-details");
      const imageUrl = `http://localhost:8000${car.image}`; // Sklejamy pełny URL

      div.innerHTML = `
        <h2>${car.brand} ${car.model}</h2>
        <img src="${imageUrl}" alt="Zdjęcie auta" style="max-width: 400px; height: auto;">
        <p>Rok: ${car.year}</p>
        <p>Cena za dzień: ${car.price_per_day} zł</p>
        <p>Dostępny: ${car.available ? "Tak" : "Nie"}</p>
      `;
    })
    .catch(() => {
      document.getElementById("car-details").innerHTML = "<p>Błąd wczytywania szczegółów auta.</p>";
    });
});
