//Create you project here from scratch

  document.addEventListener("DOMContentLoaded", function () {

  // ?? Movie List
  const moviesList = [
    { name: "Flash", price: 7 },
    { name: "Spiderman", price: 5 },
    { name: "Batman", price: 4}
  ];

  // ?? Elements (MATCHING YOUR HTML)
  const select = document.getElementById("selectMovie");
  const movieName = document.getElementById("movieName");
  const moviePrice = document.getElementById("moviePrice");
  const totalPrice = document.getElementById("totalPrice");
  const seatHolder = document.getElementById("selectedSeatsHolder");
  const continueBtn = document.getElementById("proceedBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  const seatCountEl = document.getElementById("numberOfSeat");

  let selectedSeats = [];
  let currentPrice = 7;

  
  // ===============================
  moviesList.forEach(movie => {
    const option = document.createElement("option");
    option.textContent = `${movie.name} $${movie.price}`;
    option.value = movie.price;
    select.appendChild(option);
  });

  
  movieName.textContent = "Flash";
  moviePrice.textContent = "$ 7";

  
  select.addEventListener("change", function () {
    const selectedMovie = moviesList[this.selectedIndex];

    movieName.textContent = selectedMovie.name;
    moviePrice.textContent = "$ " + selectedMovie.price;

    currentPrice = selectedMovie.price;
    updateTotal();
  });

  seats.forEach(seat => {
    seat.addEventListener("click", function () {

      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter(s => s !== seat);
      } else {
        seat.classList.add("selected");
        selectedSeats.push(seat);
      }

      updateSelectedSeats();
      updateTotal();
    });
  });


  // ===============================
function updateTotal() {
  const total = selectedSeats.length * currentPrice;
  totalPrice.textContent = "$ " + total;
}

function updateSelectedSeats() {
  const count = selectedSeats.length;
  seatCountEl.textContent = count;

  seatHolder.innerHTML = "";

  if (count === 0) {
    seatHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
    return;
  }

  const allRows = Array.from(document.querySelectorAll("#seatCont .row"));

  selectedSeats.forEach(seat => {
    const row = seat.parentElement;
    const rowIndex = allRows.indexOf(row);
    const seatIndex = Array.from(row.children).indexOf(seat);

    const rowLetter = String.fromCharCode(65 + rowIndex);
    const seatNumber = seatIndex + 1;

    const seatLabel = rowLetter + seatNumber;

    const seatDiv = document.createElement("div");
    seatDiv.classList.add("selectedSeat");
    seatDiv.textContent = seatLabel;

    seatHolder.appendChild(seatDiv);
  });
}
 

 
  // 5 Continue Button
  // ===============================
  continueBtn.addEventListener("click", function () {

    if (selectedSeats.length === 0) {
      alert("Oops no seat Selected");
      return;
    }

    alert("Yayy! Your Seats have been booked");

    selectedSeats.forEach(seat => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    });

    selectedSeats = [];
    totalPrice.textContent = "$ 0";
    seatHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
    seatCountEl.textContent = 0;
  });


  // 6 Cancel Button
  // ===============================
  cancelBtn.addEventListener("click", function () {

    selectedSeats.forEach(seat => {
      seat.classList.remove("selected");
    });

    selectedSeats = [];
    totalPrice.textContent = "$ 0";
    seatHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
    seatCountEl.textContent = 0;
  });

});
