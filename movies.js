// Fetch로 API 데이터 가져오기
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDVjYzZkODA1ZjAxYzc5YTgyMTYwZTUyYTQ4YzRjZCIsIm5iZiI6MTcyMTg5NTQ1My4xMjYzNDksInN1YiI6IjY2YTIwNzE4ZTE2YjQ4Mzg4MDAyM2NlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eqIcu4uiD5ma9M5l8_NSE9aZia8joAwz-iQlUKvRz94'
    }
  };

const URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

fetch(URL, options)
.then((Response) => Response.json())
.then(data => {console.log(data);
})
.catch(error => console.error('Error:', error));


// 카드 생성
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt"${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
    `;
    card.addEventListener('click', () => alert(`Movie ID : ${movie.id}`));
    return card;
}


// 받아온 데이터로 카드 생성 및 DOM에 추가
fetch(URL)
 .then(response => response.json())
 .then(data => {
    const movies = data.results;
    const movieContainer = document.getElementById('movie-container');
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        movieContainer.appendChild(card);        
    });
 })
 .catch(error => console.error('Error:', error));


// 영화 제목 검색 기능 구현
const searchBtn = document.querySelector('#search-button');
function filter() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
}
searchBtn.addEventListener('click', filter);