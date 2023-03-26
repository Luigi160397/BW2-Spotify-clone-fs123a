const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get("id");

const payload = `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`;

const audio = document.createElement("audio");
const volume = document.querySelector(".form-range");
const iconaVolume = document.querySelector("#icona-volume");
const progress = document.querySelector(".progress-bar");
const playBtn = document.querySelector(".iconaPlay");

audio.volume = 0.5;

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
  if (audio.volume === 0) {
    iconaVolume.className = "bi bi-volume-off text-light fs-2 iconePlayer";
  } else if (audio.volume > 0 && audio.volume < 1) {
    iconaVolume.className = "bi bi-volume-down text-light fs-2 iconePlayer";
  } else {
    iconaVolume.className = "bi bi-volume-up text-light fs-2 iconePlayer";
  }
});

iconaVolume.addEventListener("click", () => {
  iconaVolume.className = "bi bi-volume-mute text-light fs-2 iconePlayer";
  audio.volume = 0;
});

// Aggiorna la progress bar durante la riproduzione
audio.addEventListener("timeupdate", () => {
  // Calcola la percentuale di avanzamento della canzone
  const progressPercent = (audio.currentTime / audio.duration) * 100;

  // Aggiorna la larghezza della progress bar
  progress.style.width = `${progressPercent}%`;
});

// gestisci l'evento clic sul pulsante di riproduzione
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.remove("bi-play-fill");
    playBtn.classList.add("bi-pause-fill");
  } else {
    audio.pause();
    playBtn.classList.remove("bi-pause-fill");
    playBtn.classList.add("bi-play-fill");
  }
});

// gestisci l'evento di fine della riproduzione
audio.addEventListener("ended", () => {
  playBtn.classList.remove("bi-pause-fill");
  playBtn.classList.add("bi-play-fill");
});

window.onload = () => {
  richiesta(payload);
};

const richiesta = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const album = data;

      const row = document.querySelector("#row-canzoni");
      row.innerHTML = "";
      const release_date = album.release_date;
      const year = new Date(release_date).getFullYear();
      const durata = album.duration;
      const minuti = Math.floor(durata / 60);
      const secondi = durata % 60;
      createCardPrincipale(
        album.cover_big,
        album.artist.picture_small,
        album.title,
        album.artist.name,
        year,
        album.nb_tracks,
        minuti,
        secondi,
        album.artist.id
      );
      const arrayCanzoni = album.tracks.data;
      for (const canzone of arrayCanzoni) {
        const rank = canzone.rank;
        const riproduzioni = rank.toLocaleString(undefined, { minimumFractionDigits: 0 });
        const durations = canzone.duration;
        const min = Math.floor(durations / 60);
        const sec = durations % 60;

        creaCanzone(
          canzone.title,
          canzone.artist.name,
          riproduzioni,
          min,
          sec,
          canzone.artist.id,
          canzone.album.cover_medium,
          canzone.preview
        );
      }

      const righe = document.querySelectorAll("#riga");
      for (const riga of righe) {
        riga.addEventListener("mouseenter", event => {
          const icone = riga.querySelectorAll(".icone");
          icone.forEach(icona => {
            icona.style.opacity = "1";
          });
        });

        riga.addEventListener("mouseleave", event => {
          const icone = riga.querySelectorAll(".icone");
          icone.forEach(icona => {
            icona.style.opacity = "0";
          });
        });
      }
    })
    .catch(error => console.log(error));
};

const createCardPrincipale = (imgCard, imgArtist, album, artist, anno, brani, min, sec, idArtist) => {
  const card = document.querySelector("#albumInfo");
  card.innerHTML = `<div class="row">
    <div class="col-12 col-lg-6 align-self-center pb-3 pb-lg-0">
      <img
        style="min-height: 200px; min-width: 200px"
        id="cover"
        class="img-fluid"
        src="${imgCard}"
        alt="${album}"
      />
    </div>
    <div class="col-9 col-lg-5 text-white d-flex flex-column justify-content-end align-self-center">
      <h3 id="type" class="small fw-semibold m-0">ALBUM</h3>
      <h2 id="titolo-card" class="display-1 fw-bold mb-4">${album}</h2>
      <div>
        <img
          class="img-fluid rounded-circle"
          src="${imgArtist}"
          alt="${artist}"
          width="24px"
        />
        <small class="fw-bold"><a class='text-decoration-none text-light' href='artist.html?id=${idArtist}' id='artista'>${artist}</a> &bull; ${anno} &bull; ${brani} brani,</small>
        <small>${min} min ${sec} sec.</small>
      </div>
    </div>
  </div>`;
};

let i = 1;
const creaCanzone = (title, artist, riproduzioni, min, sec, idArtist, img, preview) => {
  const row = document.querySelector("#row-canzoni");
  const div = document.createElement("div");
  div.id = "riga";
  div.className =
    "row mb-2 justify-content-between gap-3 justify-content-lg-start align-items-center p-1 rounded-2 position-relative";
  div.innerHTML = `
    <i id='playIcon' style='left:-5px' class="bi bi-play-fill position-absolute d-none fs-1"></i>
    <div class="col-1 songNumber d-none d-lg-block">${i}</div>
    <div class="col-4">
      <a class="fs-6 fw-bold mb-0 d-block text-decoration-none position-relative text-light">
        ${title}
      </a>
      <small class="light-gray"><a class='text-decoration-none text-light' href='artist.html?id=${idArtist}' id='artista'>${artist}</a></small>
    </div>
    <div class="col-3 text-end light-gray d-none d-lg-block">${riproduzioni}</div>
    <div class="col-3 text-end light-gray d-none d-lg-block">
      <span style='opacity: 0' class="icone me-3"><i class="bi bi-heart"></i></span>
      ${min}:${sec}
      <span style='opacity: 0' class="icone ms-3"><i class="bi bi-three-dots"></i></span>
    </div>
    <div class="col-3 text-end light-gray d-block d-lg-none"><i class="bi bi-three-dots-vertical"></i></div>
  `;
  row.appendChild(div);
  i++;

  div.onclick = function () {
    creaCardPlayer(img, title, artist, idArtist, preview);
  };
};

const apriCerca = () => {
  window.location.href = "index.html?form=1";
};

const creaCardPlayer = (img, title, artist, idArtist, preview) => {
  const col = document.querySelector("#cardPlayer");
  col.style.opacity = "1";
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

  document.querySelector(".title-player").style.opacity = "1";
  document.querySelector(".title-player").innerText = `${title}`;
  // ottieni elementi HTML del player audio

  const playBtn = document.querySelector(".iconaPlay");

  // imposta file audio da riprodurre
  audio.src = `${preview}`;
  audio.play();
  playBtn.classList.remove("bi-play-fill");
  playBtn.classList.add("bi-pause-fill");
};
