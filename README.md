# FilmSearch - Wyszukiwarka filmów

## Opis projektu
FilmSearch to responsywna aplikacja webowa umożliwiająca wyszukiwanie filmów, seriali i gier za pomocą zewnętrznego API OMDb. Projekt spełnia wymagania dotyczące struktury HTML5, responsywności, interaktywności i dokumentacji.

## Funkcjonalności
- Wyszukiwanie filmów po tytule
- Filtrowanie według roku i typu (film/serial/gra)
- Wyświetlanie szczegółów filmu w modalu
- Responsywny design (mobile-first)
- Formularz kontaktowy z walidacją
- 3 podstrony: główna, o nas, kontakt

## Live Demo
Aplikacja dostępna online: https://tmurjas.github.io/tech_web_lab/

## Szybkie uruchomienie

### Wersja online (zalecana)
1. Otwórz https://tmurjas.github.io/tech_web_lab/

### Wersja lokalna

#### Opcja A: Prosty serwer HTTP
```bash
# 1. Pobierz pliki projektu
git clone https://tmurjas.github.io/tech_web_lab/
cd filmsearch

# 2. Uruchom serwer lokalny
# Python 3:
python -m http.server 8000

# Lub z PHP:
php -S localhost:8000

# 3. Otwórz w przeglądarce
# http://localhost:8000