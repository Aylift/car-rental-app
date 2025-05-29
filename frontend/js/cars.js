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
        const imageUrl = car.image
          ? `http://localhost:8000${car.image}`
          : '/media/car_images/default.jpg'; // to jest default, trzeba ogarnąć jak zmieniać na dodane

        const div = document.createElement("div");
        div.classList.add("car-card");
        div.innerHTML = `
          <h3>${car.brand} ${car.model}</h3>
          <img src="${imageUrl}" alt="${car.brand} ${car.model}" style="max-width: 300px; height: auto; display: block; margin-bottom: 10px;">
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


const currentUser = {
  username: "admin",
  is_staff: true
};

if (currentUser.is_staff) {
  document.querySelectorAll('.admin-only').forEach(el => {
      el.style.display = 'block';
  });
}
function goBack() {
  alert("Wróć do listy pojazdów");
}

function deleteVehicle() {
  alert("Usuwanie pojazdu (tylko admin)");
}

function goToAdminPanel() {
  alert("Przejście do panelu administratora");
}