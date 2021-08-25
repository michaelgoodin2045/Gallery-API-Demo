const input = document.getElementById('input');
const grid = document.querySelector('.grid');
const clientId = 'tQ9gOWwvGlE3bhS7acOrHBiTZaliK2hlKVACqN3pnSw';

input.addEventListener('keydown', function (event) {
  let key = event.key;
  if (key === 'Enter') {
    loadImg();
  }
});

window.addEventListener('load', loadImg);

function loadImg() {
  removeImg();
  const url = `https://api.unsplash.com/search/photos/?query=${input.value}&per_page=24&client_id=${clientId}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(response.status);
      }
    })
    .then((data) => {
      const imageNodes = [];
      for (let i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement('div');
        imageNodes[i].className = 'image';
        imageNodes[
          i
        ].innerHTML = `<div class="name">${data.results[i].user.name}</div><div class="username">${data.results[i].user.username}</div>`;

        imageNodes[
          i
        ].style.backgroundImage = `url(${data.results[i].urls.raw})`;
        imageNodes[i].addEventListener('dblclick', function () {
          window.open(data.results[i].links.download, '_blank');
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImg() {
  grid.innerHTML = '';
}
