//api pexel key : 563492ad6f917000010000018daa46c91c10408d8c1f55989160117f

const auth = "563492ad6f917000010000018daa46c91c10408d8c1f55989160117f";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//event listeners
searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

//functions

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = dataFetch.json();
  return data;
}

function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
        <a href="${photo.photographer_url}">${photo.photographer}</a>
        <a href="${photo.src.original}">Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  console.log(data);
  generatePhotos(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  console.log(data);
  generatePhotos(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

curatedPhotos();
