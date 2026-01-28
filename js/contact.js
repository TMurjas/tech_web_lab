// Walidacja formularza kontaktowego
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.successMessage = document.getElementById('formSuccess');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Walidacja w czasie rzeczywistym
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.messageInput.addEventListener('blur', () => this.validateMessage());
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            this.submitForm();
        }
    }
    
    validateName() {
        const name = this.nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (name.length < 2) {
            this.showError(this.nameInput, errorElement, 'Imię musi mieć co najmniej 2 znaki');
            return false;
        }
        
        if (name.length > 50) {
            this.showError(this.nameInput, errorElement, 'Imię może mieć maksymalnie 50 znaków');
            return false;
        }
        
        this.clearError(this.nameInput, errorElement);
        return true;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError(this.emailInput, errorElement, 'Email jest wymagany');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError(this.emailInput, errorElement, 'Wpisz poprawny adres email');
            return false;
        }
        
        this.clearError(this.emailInput, errorElement);
        return true;
    }
    
    validateMessage() {
        const message = this.messageInput.value.trim();
        const errorElement = document.getElementById('messageError');
        
        if (message.length < 10) {
            this.showError(this.messageInput, errorElement, 'Wiadomość musi mieć co najmniej 10 znaków');
            return false;
        }
        
        if (message.length > 1000) {
            this.showError(this.messageInput, errorElement, 'Wiadomość może mieć maksymalnie 1000 znaków');
            return false;
        }
        
        this.clearError(this.messageInput, errorElement);
        return true;
    }
    
    showError(input, errorElement, message) {
        input.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    clearError(input, errorElement) {
        input.style.borderColor = '#ddd';
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }


        // submitForm() {
    //     const templateParams = {
    //         from_name: this.nameInput.value,
    //         from_email: this.emailInput.value,
    //         subject: document.getElementById('subject').value,
    //         message: this.messageInput.value
    //     };

    //     emailjs.send(
    //         'SERVICE_ID',
    //         'TEMPLATE_ID',
    //         templateParams
    //     )
    //     .then(() => {
    //         this.showSuccessMessage();
    //         this.form.reset();
    //         setTimeout(() => this.hideSuccessMessage(), 5000);
    //     })
    //     .catch(() => {
    //         alert('Wystąpił błąd podczas wysyłania wiadomości');
    //     });
    // }
    
    submitForm() {
        // W rzeczywistej aplikacji tutaj byłoby wysyłanie danych do serwera
        // Na potrzeby demonstracji symulujemy wysłanie formularza
        
        // Symulacja opóźnienia wysyłania
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            
            // Ukryj komunikat sukcesu po 5 sekundach
            setTimeout(() => {
                this.hideSuccessMessage();
            }, 5000);
        }, 1000);
    }
    
    showSuccessMessage() {
        this.successMessage.style.display = 'flex';
        this.successMessage.style.animation = 'fadeIn 0.5s ease';
    }
    
    hideSuccessMessage() {
        this.successMessage.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 500);
    }
}

// Inicjalizacja formularza kontaktowego
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contactForm')) {
        new ContactForm();
    }
});

// Pokaż informacje w faq
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});