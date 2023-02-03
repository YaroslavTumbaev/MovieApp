const apiKey = 'ff6d7be4-5fef-4e8c-b3ae-99f1bb97fd06';
const apiUrlPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const apiUrlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(apiUrlPopular)
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'aplication/json',
            'X-API-KEY': apiKey,
        },
    });

    let respData = await resp.json()
    showMovies(respData);
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies')

    moviesEl.innerHTML = ''

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = 
         `
                <div class="movieCoverInner">
                    <img src="${movie.posterUrlPreview}" alt="" class="movieCover">               
                    <div class="movieCoverDarked"></div>
                </div>

                <div class="movieInfo">
                        <div class="movieTitle">${movie.nameRu}</div>
                        <div class="movieCategory">${movie.genres.map(
                            (genre) => `${genre.genre}`
                        )}</div>
                        <div class="movieAverage border${getClassByRate(ifConst(movie))}">${ifConst(movie)}</div>
        `;

        movieEl.addEventListener('click', () => openModal())
        moviesEl.appendChild(movieEl);
    });
}


function getClassByRate(vote) {
    if (vote >= 7) {
        return 'Green'
    } else if(vote > 5) {
        return 'Orange'
    }else{
        return 'Red'
    }
}

function ifConst(par){ 
    if(par.rating == '99.0%') {
        return '8.0'
    }else if(par.rating == null) {
        return '8.0'
    }else{
        return par.rating
    }
}

const form = document.querySelector('form');
const search = document.querySelector('.headerSearch');


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const apiSearchUrl = `${apiUrlSearch}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl)
    }
    if (search.value = '') {
        getMovies(apiUrlPopular)
    }
})



const modalEl = document.querySelector('.modal');

async function openModal() {
    modalEl.classList.add('modal--show')


        modalEl.innerHTML = `
        <div class="modal__card">
        <img class="modal__movie-backdrop" src="" alt="">
        <h2>
            <span class="modal__movie-title">Название</span>
            <span class="modal__movie-release-year">Год</span>
        </h2>
        <ul class="modal__movie-info">
            <div class="loader"></div>
            <li class="modal__movie-genre">Жанр</li>
        <li class="modal__movie-runtime">Время</li>
            <li >Сайт: <a class="modal__movie-site" href=""</a></li>
            <li class="modal__movie-overview">Описание</li>
        </ul>
        </div>
    `
}

function closeModal() {
    modalEl.classList.remove('modal--show')
}

window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  })
  
  window.addEventListener("keydown", (e) => {
    if (e.code.toLowerCase() === 'escape') {
      closeModal();
    }
  })