// Klucz API dla OMDb API (darmowy klucz dla demonstracji)
// W prawdziwej aplikacji powinien być przechowywany bezpiecznie na serwerze
const API_KEY = '4a3b711b';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

class MovieAPI {
    constructor() {
        this.currentPage = 1;
        this.totalResults = 0;
        this.currentSearch = '';
    }

    // Wyszukiwanie filmów
    async searchMovies(query, page = 1, year = '', type = '') {
        if (!query.trim()) {
            throw new Error('Wpisz tytuł filmu do wyszukania');
        }

        this.currentSearch = query;
        this.currentPage = page;

        let url = `${API_URL}&s=${encodeURIComponent(query)}&page=${page}`;
        
        if (year) {
            url += `&y=${year}`;
        }
        
        if (type) {
            url += `&type=${type}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.Response === 'False') {
                throw new Error(data.Error || 'Nie znaleziono filmów');
            }
            
            this.totalResults = parseInt(data.totalResults);
            return data.Search || [];
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            throw error;
        }
    }

    // Pobieranie szczegółów filmu
    async getMovieDetails(id) {
        const url = `${API_URL}&i=${id}&plot=full`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.Response === 'False') {
                throw new Error(data.Error || 'Nie znaleziono szczegółów filmu');
            }
            
            return data;
        } catch (error) {
            console.error('Błąd podczas pobierania szczegółów filmu:', error);
            throw error;
        }
    }

    // Obliczanie całkowitej liczby stron
    getTotalPages() {
        return Math.ceil(this.totalResults / 10);
    }

    // Pobieranie przykładowych filmów przy pierwszym załadowaniu
    async getPopularMovies() {
        const popularQueries = ['avatar', 'avengers', 'batman', 'star wars', 'inception'];
        const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
        
        try {
            const movies = await this.searchMovies(randomQuery, 1);
            return movies.slice(0, 6); // Zwróć tylko 6 filmów
        } catch (error) {
            console.error('Błąd podczas pobierania popularnych filmów:', error);
            return [];
        }
    }
}

// Eksportuj instancję API

const movieAPI = new MovieAPI();
