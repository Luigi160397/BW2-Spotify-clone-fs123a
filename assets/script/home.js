const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q={query}";

window.onload = function () {
  richiesta(url);
};

const richiesta = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const row1 = document.querySelector("#card-playlist");
      row1.innerHTML = "";
      const row2 = document.querySelector("#cards2");
      row2.innerHTML = "";
      const row3 = document.querySelector("#card-principale");
      row3.innerHTML = "";
      const canzoni = data.data;
      shuffle(canzoni);
      createCardPrincipale(canzoni[0].title, canzoni[0].artist.picture_medium, canzoni[0].artist.name);
      for (let i = 0; i < 6; i++) {
        const canzone = canzoni[i];
        createCardPlaylist(canzone.title, canzone.artist.picture_medium);
      }
      for (let i = 6; i < 11; i++) {
        const canzone = canzoni[i];
        createCard(canzone.title, canzone.artist.picture_medium, canzone.artist.name);
      }
    })
    .catch(error => console.log(error));
};

const createCardPlaylist = (title, img) => {
  const row1 = document.querySelector("#card-playlist");
  const col1 = document.createElement("div");
  col1.setAttribute("class", "col");
  row1.appendChild(col1);

  col1.innerHTML = `<div style="background-color: #363636" class="card mb-3 border-0 text-light rounded-2">
    <div class="row g-0">
      <div class="col-md-2">
        <img
          style="min-height: 70px; min-width: 70px"
          src="${img}"
          class="img-fluid rounded-start"
          alt="pic"
        />
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <h5 class="card-text fw-bold fs-6">${title}</h5>
        </div>
      </div>
    </div>
  </div>`;
};

const createCard = (title, img, artist) => {
  const row2 = document.querySelector("#cards2");
  const col2 = document.createElement("div");
  col2.setAttribute("class", "col");
  row2.appendChild(col2);

  col2.innerHTML = `<div class="col">
    <div style="background-color: #171717" class="card border-0 text-light">
      <div class="px-4 pt-4 pb-1 rounded-3">
        <img src="${img}" class="card-img img-fluid" alt="${title}" />
      </div>
      <div class="card-body px-4">
        <h5 class="card-title fs-5 text-truncate">${title}</h5>
        <p class="card-text text-secondary">${artist}</p>
      </div>
    </div>
  </div>`;
};

const createCardPrincipale = (title, img, artist) => {
  const cardPrincipale = document.querySelector("#card-principale");
  cardPrincipale.innerHTML = `<div class="row g-0">
    <div class="col-2">
      <img src="${img}" class="img-fluid" alt="${title}" />
    </div>
    <div class="col-6">
      <div class="card-body">
        <h6 class="card-title fw-bold">ALBUM</h6>
        <h1 class="card-title fw-bold">${title}</h1>
        <p class="card-text fw-bold">${artist}</p>
        <p class="card-text fw-bold">Ascolta il nuovo singolo di ${artist}!</p>
        <div class="d-flex gap-2">
          <button style="background-color: #1ed760" class="btn px-4 py-2 rounded-pill fw-bold">Play</button>
          <button
            style="background-color: #2125297c"
            class="btn px-4 py-2 rounded-pill fw-bold text-light border border-1 border-light"
          >
            Salva
          </button>
          <button class="btn rounded-pill fw-bold text-light">
            <i class="bi bi-three-dots text-secondary fs-3"></i>
          </button>
        </div>
      </div>
    </div>
  </div>`;
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const btnSearch = document.querySelector("#search");
btnSearch.addEventListener("click", event => {
  event.preventDefault();
  const cerca = document.querySelector("#input-search").value;
  const payload = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${cerca}`;
  richiesta(payload);
});
