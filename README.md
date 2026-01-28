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

## Demo
https://tmurjas.github.io/tech_web_lab/

## Instalacja

### 1. Pobierz kod
```bash
git clone https://github.com/TMurjas/tech_web_lab.git
cd filmsearch
2. Uruchom lokalny serwer
Python:
bash
python -m http.server 8000
PHP:
bash
php -S localhost:8000
Node.js z live-server:
bash
npx live-server --port=8000
3. Otwórz w przeglądarce
Przejdź do: http://localhost:8000
```
##Wymagania
Przeglądarka internetowa

Python 3.x, PHP lub Node.js (do lokalnego serwera)

Połączenie internetowe (dla API)

##Struktura plików

tech_web_lab/
├── index.html         # Strona główna
├── about.html         # O nas
├── contact.html       # Kontakt
├── css/style.css      # Style
├── js/api.js          # Integracja API
├── js/app.js          # Logika aplikacji
└── js/contact.js      # Walidacja formularza
Konfiguracja API
Domyślnie używa darmowego klucza. Aby użyć własnego:

Zarejestruj się na http://www.omdbapi.com/apikey.aspx

Zaktualizuj API_KEY w pliku js/api.js

##Rozwiązywanie problemów
Problem: API nie działa
Rozwiązanie: Sprawdź klucz API w js/api.js

Problem: Strona nie ładuje się
Rozwiązanie: Uruchom przez serwer lokalny, nie bezpośrednio z pliku

##Licencja
MIT


