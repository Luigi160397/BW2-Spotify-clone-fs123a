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
      const canzone = data;
      const release_date = canzone.release_date;
      const year = new Date(release_date).getFullYear();
      const durata = canzone.duration;
      const minuti = Math.floor(durata / 60);
      const secondi = durata % 60;
      createCardPrincipale(
        canzone.cover_big,
        canzone.artist.picture_small,
        canzone.title,
        canzone.artist.name,
        year,
        canzone.nb_tracks,
        minuti,
        secondi
      );
    })
    .catch(error => console.log(error));
};

const createCardPrincipale = (imgCard, imgArtist, album, artist, anno, brani, min, sec) => {
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
        <small class="fw-bold">${artist} &bull; ${anno} &bull; ${brani} brani,</small>
        <small>${min} min ${sec} sec.</small>
      </div>
    </div>
  </div>`;
};
