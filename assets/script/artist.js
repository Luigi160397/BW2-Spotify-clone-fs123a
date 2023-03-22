const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get("id");

const payload = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`;

window.onload = () => {
  richiesta(payload);
};

const richiesta = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const artista = data;

      const fans = artista.nb_fan;
      const ascoltatori = fans.toLocaleString(undefined, { minimumFractionDigits: 0 });
      createCardPrincipale(artista.name, artista.picture_xl, ascoltatori);
      //   for (const canzone of album.tracks.data) {
      //     const rank = canzone.rank;
      //     const riproduzioni = rank.toLocaleString(undefined, { minimumFractionDigits: 0 });
      //     const durations = canzone.duration;
      //     const min = Math.floor(durations / 60);
      //     const sec = durations % 60;

      //     creaCanzone(canzone.title, canzone.artist.name, riproduzioni, min, sec);
      //   }
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
const creaCanzone = (title, riproduzioni, min, sec) => {
  const row = document.querySelector("#tracks");
  const html = `<div class="row mb-3 justify-content-between justify-content-lg-start">
  <div class="col-1 text-end light-gray">1</div>
  <div class="col-7 col-xl-4 d-flex gap-2 align-items-center">
    <img src="https://picsum.photos/seed/picsum/40/40" alt="Album cover" />
    <span>
      <h3 class="fs-6 fw-bold mb-0">Lorem ipsum</h3>
      <small class="d-block d-xl-none light-gray">2.368.942</small>
    </span>
  </div>
  <div class="col-3 d-none d-xl-block">
    <small class="light-gray">2.368.942</small>
  </div>
  <div class="col-3 text-end light-gray d-none d-lg-block">3:18</div>
  <div class="col-3 text-end light-gray d-block d-lg-none">
    <i class="bi bi-three-dots-vertical"></i>
  </div>
</div>`;

  row.innerHTML += html;
  i++;
};
