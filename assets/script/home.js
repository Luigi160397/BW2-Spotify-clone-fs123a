const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q={query}";

fetch(url)
  .then(res => res.json())
  .then(data => {
    const row1 = document.querySelector("#card-playlist");
    row1.innerHTML = "";
    const row2 = document.querySelector("#cards2");
    row2.innerHTML = "";
    const canzoni = data.data;
    for (const canzone of canzoni) {
      createCard(canzone.title, canzone.artist.picture_medium, canzone.artist.name);
    }
  })
  .catch(error => console.log(error));

const createCard = (title, img, artist) => {
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
