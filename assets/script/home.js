const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

window.onload = function () {
  richiesta(url);
  const Params = new URLSearchParams(window.location.search);
  const form = Params.get("form");
  if (form === "1") {
    showBtn();
  }
};

const spinner = document.querySelector("#spinner");
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
      const row4 = document.querySelector("#recenti");
      row4.innerHTML = "";
      spinner.style.display = "none";
      const canzoni = data.data;
      shuffle(canzoni);
      createCardPrincipale(
        canzoni[0].title,
        canzoni[0].artist.picture_medium,
        canzoni[0].artist.name,
        canzoni[0].artist.id,
        canzoni[0].album.title,
        canzoni[0].album.id,
        canzoni[0].id
      );
      for (let i = 0; i < 6; i++) {
        const canzone = canzoni[i];
        createCardPlaylist(canzone.title, canzone.artist.picture_medium, canzone.id);
      }
      for (let i = 6; i < 10; i++) {
        const canzone = canzoni[i];
        createCard(canzone.title, canzone.artist.picture_medium, canzone.artist.name, canzone.artist.id, canzone.id);
        createCard2(
          canzone.album.title,
          canzone.album.cover_medium,
          canzone.artist.name,
          canzone.album.id,
          canzone.artist.id
        );
      }
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get("idTrack");
      if (id) {
        const trackTrovata = canzoni.find(canzone => canzone.id === id);
        console.log(trackTrovata);
        //   creaCardPlayer(
        //     trackTrovata.album.cover_small,
        //     trackTrovata.title,
        //     trackTrovata.artist.name,
        //     trackTrovata.artist.id
        //   );
      }
    })
    .catch(error => console.log(error));
};

const createCardPlaylist = (title, img, idTrack) => {
  const row1 = document.querySelector("#card-playlist");
  const col1 = document.createElement("div");
  col1.setAttribute("class", "col");
  row1.appendChild(col1);

  col1.innerHTML = `<a href='index.html?idTrack=${idTrack}' id="cardsPlaylist" class="card mb-3 border-0 text-light rounded-2 text-decoration-none">
    <div class="row g-0"   style="flex-wrap: nowrap;">
      <div class="col-4 col-md-4">
        <img
          id="imgMobile"
          style="min-height: 60px; min-width: 60px"
          src="${img}"
          class="img-fluid rounded-start"
          alt="pic"
        />
      </div>
      <div class="col-8 col-md-8">
        <div class="card-body">
          <h5 class="card-text text-truncate fw-bold fs-6">${title}</h5>
        </div>
      </div>
    </div>
  </a>`;
};

const createCard = (title, img, artist, idArtist, idTrack) => {
  const row2 = document.querySelector(`#cards2`);
  const col2 = document.createElement("div");
  col2.setAttribute("class", "col");
  row2.appendChild(col2);

  col2.innerHTML = `<div class="col">
    <div id='canzoni' style="background-color: #171717" class="card border-0 text-light position-relative">
    <button id="playBtn" class="p-2 rounded-circle me-4 position-absolute">
                <svg
                  role="img"
                  height="32"
                  width="32"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-encore-id="icon"
                  class="Svg-sc-ytk21e-0 uPxdw"
                >
                  <path
                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                  ></path>
                </svg>
              </button>
      <div class="px-4 pt-4 pb-1 rounded-3">
        <img src="${img}" class="card-img img-fluid shadow" alt="${title}" />
      </div>
      <div class="card-body px-4">
        <h5 class="card-title fs-5 text-truncate">${title}</h5>
        <p class="card-text"><a id='artista' class="text-decoration-none text-secondary" href=artist.html?id=${idArtist}>${artist}</a></p>
      </div>
    </div>
  </div>`;

  col2.addEventListener("click", () => {
    window.location.assign(`index.html?idTrack=${idTrack}`);
  });
};

const createCard2 = (album, img, artist, idAlbum, idArtist) => {
  const row2 = document.querySelector(`#recenti`);
  const col2 = document.createElement("div");
  col2.setAttribute("class", "col");
  row2.appendChild(col2);

  col2.innerHTML = `<div class="col">
      <div id='canzoni' style="background-color: #171717" class="card border-0 text-light position-relative">
      <button id="playBtn" class="p-2 rounded-circle me-4 position-absolute">
            <svg
              role="img"
              height="32"
              width="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 uPxdw"
            >
              <path
                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
              ></path>
            </svg>
          </button>
        <div class="px-4 pt-4 pb-1 rounded-3">
          <img src="${img}" class="card-img img-fluid shadow" alt="${album}" />
        </div>
        <div class="card-body px-4">
          <h5 class="card-title fs-5 text-truncate"><a class="text-decoration-none text-light" href=album.html?id=${idAlbum}>${album}</a></h5>
          <p class="card-text"><a id='artista' class="text-decoration-none text-secondary" href=artist.html?id=${idArtist}>${artist}</a></p>
        </div>
      </div>
    </div>`;

  col2.addEventListener("click", () => {
    window.location.assign(`album.html?id=${idAlbum}`);
  });
};

const createCardPrincipale = (title, img, artist, idArtist, album, idAlbum, idTrack) => {
  const cardPrincipale = document.querySelector("#card-principale");
  cardPrincipale.innerHTML = `<div class="row g-0">
    <div class="col-2">
      <img src="${img}" class="img-fluid" alt="${title}" />
    </div>
    <div class="col-6">
      <div class="card-body">
        <h6 class="card-title fw-bold text-truncate"><a class="text-decoration-none text-light" href=album.html?id=${idAlbum}>${album}</a></h6>
        <h1 class="card-title fw-bold text-truncate"><a class="text-decoration-none text-light" href="index.html?idTrack=${idTrack}">${title}</a></h1>
        <p class="card-text"><a class="text-decoration-none text-light fw-bold" href=artist.html?id=${idArtist}>${artist}</a></p>
        <p class="card-text fw-bold">Ascolta il nuovo singolo di <a class="text-decoration-none text-light" href=artist.html?id=${idArtist}>${artist}</a>!</p>
        <div class="d-flex gap-2">
          <a id='play' href="index.html?idTrack=${idTrack}" style="background-color: #1ed760" class="border-0 px-4 py-2 rounded-pill fw-bold text-decoration-none text-dark"><span style="vertical-align: -webkit-baseline-middle;">Play</span></a>
          <button
          id='salva'
            style="background-color: #2125297c"
            class="px-4 py-2 rounded-pill fw-bold text-light border border-1 border-light"
          >
            Salva
          </button>
          <button class="btn rounded-pill fw-bold text-light">
            <i id='dots' class="bi bi-three-dots text-secondary fs-3"></i>
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

const showBtn = () => {
  const form = document.querySelector("#form-input");
  if (form.style.display === "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
    const input = document.querySelector("#input-search");
    input.focus();
  }
};

const form = document.querySelector("#form-input");
form.addEventListener("submit", event => {
  event.preventDefault();
  const cerca = document.querySelector("#input-search").value;
  const payload = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${cerca}`;
  richiesta(payload);
});

const creaCardPlayer = (img, title, artist, idArtist) => {
  const col = document.querySelector("#cardPlayer");
  col.innerHTML = `<div class="card bg-dark border-0">
  <div class="row g-0">
    <div class="col-4 col-md-4">
      <img
        src="${img}"
        style="min-height: 60px; min-width: 60px"
        class="img-fluid rounded-0"
        alt="${title}"
      />
    </div>
    <div class="col-8 col-md-8">
      <div class="card-body">
        <h6 id="titoloPlayer" class="card-title text-light text-truncate">
          <a class="text-decoration-none text-light" href="#"
            >${title}</a
          >
        </h6>
        <p id="artistaPlayer" class="card-text">
          <a class="text-decoration-none text-light text-nowrap" href="artist.html?id=${idArtist}">${artist}</a>
        </p>
      </div>
    </div>
  </div>
</div>`;
};
