const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get("id");

const payload = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`;
const payload2 = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`;

window.onload = () => {
  richiesta(payload);
  richiesta2(payload2);
};

const richiesta = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const artista = data;

      const fans = artista.nb_fan;
      const ascoltatori = fans.toLocaleString(undefined, { minimumFractionDigits: 0 });
      createCardPrincipale(artista.name, artista.picture_xl, ascoltatori);
      creaLike(artista.picture_medium, artista.name);
    })
    .catch(error => console.log(error));
};

const richiesta2 = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const canzoni = data.data;
      const row = document.querySelector("#tracks");
      row.innerHTML = "";

      for (const canzone of canzoni) {
        const rank = canzone.rank;
        const riproduzioni = rank.toLocaleString(undefined, { minimumFractionDigits: 0 });
        const durations = canzone.duration;
        const min = Math.floor(durations / 60);
        const sec = durations % 60;

        creaCanzone(
          canzone.title_short,
          canzone.album.cover_small,
          riproduzioni,
          min,
          sec,
          canzone.artist.id,
          canzone.id
        );
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
      }
    })
    .catch(error => console.log(error));
};

const createCardPrincipale = (artist, img, ascoltatori) => {
  const card = document.querySelector("#artistBanner");
  card.style.backgroundImage = `url("${img}")`;
  card.innerHTML = `<div class="d-flex">
  <div class="position-relative">
    <svg
      id="verifiedIcon"
      role="img"
      height="24"
      width="24"
      aria-hidden="true"
      class="Svg-sc-ytk21e-0 kcjDTG b0NcxAbHvRbqgs2S8QDg position-relative z-2"
      viewBox="0 0 24 24"
      data-encore-id="icon"
    >
      <path
        d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"
      ></path>
    </svg>
    <span id="verifyBg"></span>
  </div>

  <p class="text-white px-2 my-0">Artista Verificato</p>
</div>
<h1 class="text-white fw-bold" style="font-size: 4rem">${artist}</h1>
<p class="text-white">${ascoltatori} ascoltatori mensili</p>`;
};

let i = 1;
const creaCanzone = (title, img, riproduzioni, min, sec, idArtist, idTrack) => {
  const row = document.querySelector("#tracks");
  const html = `<div id='riga' class="row mb-3 justify-content-between align-items-center justify-content-lg-start p-1 rounded-2 position-relative">
  <i id='playIcon' style='left:10px' class="bi bi-play-fill position-absolute d-none fs-1"></i>
  <div class="col-1 text-end light-gray">${i}</div>
  <div class="col-7 col-xl-4 d-flex gap-2 align-items-center">
    <img src="${img}" alt="${title}" />
    <span>

       <a class="fs-6 fw-bold mb-0 d-block text-decoration-none position-relative text-light" href="artist.html?id=${idArtist}&idTrack=${idTrack}">
          ${title}
        </a>
      
      <small class="d-block d-xl-none light-gray">${riproduzioni}</small>
    </span>
  </div>
  <div class="col-3 d-none d-xl-block">
    <small class="light-gray">${riproduzioni}</small>
  </div>
  <div class="col-3 text-end light-gray d-none d-lg-block">
  <span style='opacity: 0' class="icone me-3"><i class="bi bi-heart"></i></span>
    ${min}:${sec}
    <span style='opacity: 0' class="icone ms-3"><i class="bi bi-three-dots"></i></span>
  </div>
  <div class="col-3 text-end light-gray d-block d-lg-none">
    <i class="bi bi-three-dots-vertical"></i>
  </div>
</div>`;

  row.innerHTML += html;
  i++;
};

const creaLike = (img, artist) => {
  const col = document.querySelector("#like");
  col.innerHTML = `<h3 class="text-white fs-5 fw-bold ms-5 mb-4">Brani che ti piacciono</h3>
    <div class="d-flex ms-5">
      <div class="position-relative">
        <i class="bi bi-heart-fill position-absolute text-white end-0 bottom-0 z-2"></i>
        <img
          src="${img}"
          alt="${artist}"
          class="rounded-circle"
          height="80px"
          width="80px"
        />
        <span id="hearthBg"></span>
      </div>

      <div style="min-width: 160px" class="px-3 d-flex flex-column justify-content-center">
        <h6 class="text-white">Hai messo mi piace a 11 brani</h6>
        <p class="light-gray">Di ${artist}</p>
      </div>
    </div>`;
};

const apriCerca = () => {
  window.location.href = "index.html?form=1";
};
