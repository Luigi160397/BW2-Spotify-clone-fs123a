const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q={query}";

fetch(url)
  .then(res => res.json())
  .then(data => {
    const row = document.querySelector("#card-playlist");
    row.innerHTML = "";
    const canzoni = data.data;
    for (const canzone of canzoni) {
      createCard(canzone.title, canzone.artist.picture_small);
    }
  })
  .catch(error => console.log(error));

const createCard = (title, img) => {
  const row = document.querySelector("#card-playlist");
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  row.appendChild(col);

  col.innerHTML = `<div style="background-color: #363636" class="card mb-3 border-0 text-light rounded-2">
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
