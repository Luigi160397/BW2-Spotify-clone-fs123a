const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get("id");

const payload = `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`;

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
      for (const canzone of album.tracks.data) {
        const rank = canzone.rank;
        const riproduzioni = rank.toLocaleString(undefined, { minimumFractionDigits: 0 });
        const durations = canzone.duration;
        const min = Math.floor(durations / 60);
        const sec = durations % 60;

        creaCanzone(canzone.title, canzone.artist.name, riproduzioni, min, sec, canzone.artist.id);
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
const creaCanzone = (title, artist, riproduzioni, min, sec, idArtist) => {
  const row = document.querySelector("#row-canzoni");
  const html = `<div id='riga' class="row mb-2 justify-content-between gap-3 justify-content-lg-start align-items-center p-1 rounded-2">
                    <div class="col-1 songNumber d-none d-lg-block">${i}</div>
                    <div class="col-4">
                      <h3 class="fs-6 fw-bold mb-0">${title}</h3>
                      <small class="light-gray"><a class='text-decoration-none text-light' href='artist.html?id=${idArtist}' id='artista'>${artist}</a></small>
                    </div>

                    <div class="col-3 text-end light-gray d-none d-lg-block">${riproduzioni}</div>
                    <div class="col-3 text-end light-gray d-none d-lg-block">
                    <span style='opacity: 0' class="icone me-3"><i class="bi bi-heart"></i></span>
                    ${min}:${sec}
                    <span style='opacity: 0' class="icone ms-3"><i class="bi bi-three-dots"></i></span>
                    </div>
                    <div class="col-3 text-end light-gray d-block d-lg-none"><i class="bi bi-three-dots-vertical"></i></div>
                  </div>`;

  row.innerHTML += html;
  i++;
  const riga = document.querySelector(".songNumber");
  riga.addEventListener("mouseenter", event => {
    riga.innerHTML = '<i class="bi bi-play-fill"></i>';
  });

  riga.addEventListener("mouseleave", event => {
    riga.innerHTML = `${i}`;
  });
};
