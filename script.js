'strick mode';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUi();

//fn to save selected movie and the price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}
//fn update total and count seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //copy selected seats into arr
  //map through array
  //retun a new array indexes
  //spread operator
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //store it locale
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//get data from localStorage and popular UI

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  //check if there is any data
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // set movie index
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
/*--------------------------------------------------------------EVENTS------------------------ */
//Movie select event
movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  //update total with new price
  updateSelectedCount();
});
//when click a seat add selected class
container.addEventListener('click', function (e) {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    //count the selected seats and calculate price
    updateSelectedCount();
  }
});

// inicial coun and total set
updateSelectedCount();
