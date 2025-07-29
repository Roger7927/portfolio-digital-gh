document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll para links de navegação
    document.querySelectorAll('a.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.header').offsetHeight), // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menu Hamburguer Responsivo
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times'); // Muda para ícone X
        });

        // Fechar menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // Animação de elementos ao rolar a página (Fade In)
    const faders = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .fade-in-delay-5, .fade-in-up');
    const appearOptions = {
        threshold: 0.2, // Quando 20% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px" // Inicia 50px antes do final da tela
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Gerar Estrelas
    const starsContainer = document.querySelector('.background-stars');
    const numberOfStars = 100; // Quantidade de estrelas

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1; // Tamanho entre 1px e 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`; // Atraso para cada estrela
        starsContainer.appendChild(star);
    }

    // Gerar Bolhas
    const bubblesContainer = document.querySelector('.background-bubbles');
    const numberOfBubbles = 20; // Quantidade de bolhas

    for (let i = 0; i < numberOfBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 60 + 20; // Tamanho entre 20px e 80px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`; // Duração da animação entre 10s e 20s
        bubble.style.animationDelay = `${Math.random() * 5}s`; // Atraso para cada bolha
        bubblesContainer.appendChild(bubble);
    }
});
// Lógica do Validador de Formulário
    const contactForm = document.getElementById('contactForm');
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formMessage = document.getElementById('form-message');
    const formDisplayMessage = document.getElementById('formMessage'); // O div para mensagens

    if (contactForm) { // Verifica se o formulário existe na página
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // <--- ESSA LINHA É CRUCIAL! IMPEDE O ENVIO PADRÃO DO FORMULÁRIO.

            // Limpa mensagens e estilos de erro anteriores
            formDisplayMessage.textContent = '';
            formDisplayMessage.className = 'form-message'; // Reseta classes
            [formName, formEmail, formMessage].forEach(input => {
                input.parentElement.classList.remove('invalid');
            });

            let isValid = true; // Flag de validação

            // Validação de Nome
            if (formName.value.trim() === '') {
                showError(formName, 'Por favor, digite seu nome.');
                isValid = false;
            }

            // Validação de Email
            if (formEmail.value.trim() === '') {
                showError(formEmail, 'Por favor, digite seu email.');
                isValid = false;
            } else if (!isValidEmail(formEmail.value.trim())) {
                showError(formEmail, 'Por favor, digite um email válido.');
                isValid = false;
            }

            // Validação de Mensagem
            if (formMessage.value.trim() === '') {
                showError(formMessage, 'Por favor, digite sua mensagem.');
                isValid = false;
            }

            // Se tudo estiver válido, simula envio
            if (isValid) {
                formDisplayMessage.classList.add('success');
                formDisplayMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                contactForm.reset(); // Limpa os campos do formulário
            }
        });
    }

    // Funções auxiliares para o validador (precisam estar no script.js principal)
    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.add('invalid'); // Adiciona classe 'invalid' ao pai
        formDisplayMessage.classList.add('error');
        formDisplayMessage.textContent = message;
        // Rolagem para o formulário para mostrar a mensagem de erro
        formDisplayMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function isValidEmail(email) {
        // Regex simples para validação de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
