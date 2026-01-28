// Główna aplikacja
class MovieApp {
    constructor() {
        this.movieAPI = movieAPI;
        this.moviesContainer = document.getElementById('moviesContainer');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchError = document.getElementById('searchError');
        this.loading = document.getElementById('loading');
        this.noResults = document.getElementById('noResults');
        this.pagination = document.getElementById('pagination');
        this.resultsTitle = document.getElementById('resultsTitle');
        this.yearFilter = document.getElementById('yearFilter');
        this.typeFilter = document.getElementById('typeFilter');
        this.clearFilters = document.getElementById('clearFilters');
        this.movieModal = document.getElementById('movieModal');
        this.modalContent = document.getElementById('modalContent');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupMobileMenu();
        this.loadInitialMovies();
    }

    bindEvents() {
        // Wyszukiwanie
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Filtry
        this.yearFilter.addEventListener('change', () => this.handleSearch());
        this.typeFilter.addEventListener('change', () => this.handleSearch());
        this.clearFilters.addEventListener('click', () => this.clearAllFilters());

        // Modal
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', () => this.closeMovieModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.movieModal) {
                this.closeMovieModal();
            }
        });

        // FAQ (jeśli istnieje na stronie)
        this.setupFAQ();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            });
        }
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    async loadInitialMovies() {
        // Pokazuj przykładowe filmy tylko jeśli nie ma wyników wyszukiwania
        if (this.moviesContainer.children.length === 0) {
            this.showLoading();
            try {
                const movies = await this.movieAPI.getPopularMovies();
                if (movies.length > 0) {
                    this.displayMovies(movies);
                    this.resultsTitle.textContent = 'Popularne filmy';
                    this.hideNoResults();
                } else {
                    this.showNoResults();
                }
            } catch (error) {
                this.showNoResults();
            } finally {
                this.hideLoading();
            }
        }
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        const year = this.yearFilter.value;
        const type = this.typeFilter.value;

        if (!query) {
            this.showError('Wpisz tytuł filmu do wyszukania');
            return;
        }

        this.clearError();
        this.showLoading();
        this.hideNoResults();

        try {
            const movies = await this.movieAPI.searchMovies(query, 1, year, type);
            this.displayMovies(movies);
            this.updateResultsTitle(query);
            this.setupPagination();
        } catch (error) {
            this.showError(error.message);
            this.clearMovies();
            this.showNoResults();
        } finally {
            this.hideLoading();
        }
    }

    displayMovies(movies) {
        this.clearMovies();
        
        if (!movies || movies.length === 0) {
            this.showNoResults();
            return;
        }

        movies.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            this.moviesContainer.appendChild(movieCard);
        });

        // Animacja pojawiania się kart
        const movieCards = this.moviesContainer.querySelectorAll('.movie-card');
        movieCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : '';
        
        card.innerHTML = `
            <div class="movie-poster">
                ${posterUrl ? `<img src="${posterUrl}" alt="${movie.Title}">` : `<i class="fas fa-film"></i>`}
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <p class="movie-year">${movie.Year}</p>
                <span class="movie-type">${movie.Type}</span>
            </div>
        `;
        
        // Kliknięcie na kartę otwiera modal ze szczegółami
        card.addEventListener('click', () => this.showMovieDetails(movie.imdbID));
        
        return card;
    }

    async showMovieDetails(movieId) {
        this.showLoading();
        
        try {
            const movie = await this.movieAPI.getMovieDetails(movieId);
            this.displayMovieModal(movie);
        } catch (error) {
            alert('Nie udało się pobrać szczegółów filmu');
        } finally {
            this.hideLoading();
        }
    }

    displayMovieModal(movie) {
        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : '';
        
        this.modalContent.innerHTML = `
            <div class="movie-details">
                ${posterUrl ? `<img src="${posterUrl}" alt="${movie.Title}">` : ''}
                <div>
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <div class="detail-item">
                        <span class="detail-label">Gatunek:</span> ${movie.Genre}
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Reżyser:</span> ${movie.Director}
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Aktorzy:</span> ${movie.Actors}
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Ocena IMDb:</span> ${movie.imdbRating}/10
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Opis:</span> ${movie.Plot}
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nagrody:</span> ${movie.Awards}
                    </div>
                </div>
            </div>
        `;
        
        this.openMovieModal();
    }

    openMovieModal() {
        this.movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeMovieModal() {
        this.movieModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    setupPagination() {
        this.clearPagination();
        
        const totalPages = this.movieAPI.getTotalPages();
        if (totalPages <= 1) return;
        
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        
        // Przycisk poprzedni
        if (this.movieAPI.currentPage > 1) {
            const prevBtn = this.createPaginationButton('←', () => {
                this.changePage(this.movieAPI.currentPage - 1);
            });
            paginationContainer.appendChild(prevBtn);
        }
        
        // Numery stron
        const startPage = Math.max(1, this.movieAPI.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = this.createPaginationButton(
                i.toString(),
                () => this.changePage(i),
                i === this.movieAPI.currentPage
            );
            paginationContainer.appendChild(pageBtn);
        }
        
        // Przycisk następny
        if (this.movieAPI.currentPage < totalPages) {
            const nextBtn = this.createPaginationButton('→', () => {
                this.changePage(this.movieAPI.currentPage + 1);
            });
            paginationContainer.appendChild(nextBtn);
        }
        
        this.pagination.appendChild(paginationContainer);
    }

    createPaginationButton(text, onClick, isActive = false) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${isActive ? 'active' : ''}`;
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    async changePage(page) {
        this.showLoading();
        
        try {
            const movies = await this.movieAPI.searchMovies(
                this.movieAPI.currentSearch,
                page,
                this.yearFilter.value,
                this.typeFilter.value
            );
            this.displayMovies(movies);
            this.setupPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    clearAllFilters() {
        this.searchInput.value = '';
        this.yearFilter.value = '';
        this.typeFilter.value = '';
        this.clearError();
        this.loadInitialMovies();
    }

    updateResultsTitle(query) {
        this.resultsTitle.textContent = `Wyniki dla: "${query}"`;
    }

    showError(message) {
        this.searchError.textContent = message;
        this.searchError.style.display = 'block';
    }

    clearError() {
        this.searchError.textContent = '';
        this.searchError.style.display = 'none';
    }

    showLoading() {
        this.loading.style.display = 'flex';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showNoResults() {
        this.noResults.style.display = 'block';
    }

    hideNoResults() {
        this.noResults.style.display = 'none';
    }

    clearMovies() {
        this.moviesContainer.innerHTML = '';
    }

    clearPagination() {
        this.pagination.innerHTML = '';
    }
}

// Inicjalizacja aplikacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    new MovieApp();
});