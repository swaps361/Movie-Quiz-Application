const API_KEY = 'a579d815';
const API_URL = 'https://www.omdbapi.com/';

async function searchMovies(query) {
    try {
        const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

function displayMovies(movies) {
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const imageUrl = movie.Poster === 'N/A' ? 'placeholder.jpg' : movie.Poster;
        const title = movie.Title;
        const year = movie.Year;
        const type = movie.Type;
        const imdbID = movie.imdbID;

        movieElement.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <div class="movie-info">
                <h2 class="movie-title">${title}</h2>
                <p>Year: ${year}</p>
                <p>Type: ${type}</p>
                <button class="info-button" data-imdbID="${imdbID}">More Info</button>
            </div>
        `;

        moviesContainer.appendChild(movieElement);
    });
}

async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}

async function handleMoreInfo(event) {
    const imdbID = event.target.dataset.imdbid;
    if (imdbID) {
        const movieDetails = await fetchMovieDetails(imdbID);
        if (movieDetails) {
            alert(`Title: ${movieDetails.Title}\nYear: ${movieDetails.Year}\nType: ${movieDetails.Type}\nIMDb Rating: ${movieDetails.imdbRating}`);
        } else {
            alert('Failed to fetch movie details.');
        }
    }
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('info-button')) {
        handleMoreInfo(event);
    }
});

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        const movies = await searchMovies(query);
        displayMovies(movies);
    }
});

document.getElementById('quiz-button').addEventListener('click', () => {
    redirectToQuiz();
});

setTimeout(() => {
    redirectToQuiz();
}, 120000); // 2 minutes in milliseconds

function redirectToQuiz() {
    window.location.replace('quiz.html');
}

window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function() {
    window.history.pushState(null, null, window.location.href);
});
