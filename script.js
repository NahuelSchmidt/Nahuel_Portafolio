// ===== PANTALLA DE CARGA =====
let progress = 0;
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');
const playButton = document.getElementById('playButton');

// Simular carga de progreso
function simulateLoading() {
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressText.textContent = '100%';
            progressBar.style.width = '100%';
            
            // Esperar un momento antes de mostrar el contenido
            setTimeout(() => {
                hideLoader();
            }, 500);
        } else {
            progressText.textContent = Math.floor(progress) + '%';
            progressBar.style.width = progress + '%';
        }
    }, 200);
}

// Ocultar loader
function hideLoader() {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        loader.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 10);
    }, 500);
}

// Permitir saltar la carga con el botón de play
if (playButton) {
    playButton.addEventListener('click', () => {
        progress = 100;
        progressText.textContent = '100%';
        progressBar.style.width = '100%';
        setTimeout(() => {
            hideLoader();
        }, 300);
    });

    // Permitir saltar la carga después de 2 segundos
    setTimeout(() => {
        if (playButton) {
            playButton.style.cursor = 'pointer';
        }
    }, 2000);
}

// Iniciar carga automática
window.addEventListener('load', () => {
    simulateLoading();
});

// ===== NAVEGACIÓN =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Actualizar navegación activa al hacer scroll
function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navegación suave
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

window.addEventListener('scroll', updateActiveNav);

// ===== EFECTO DE TYPING =====
const typingText = document.getElementById('typingText');
if (typingText) {
    const text = 'Desarrollador Web Full Stack|';
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (isDeleting) {
            typingText.textContent = text.substring(0, charIndex - 1) + '|';
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
            }
        } else {
            typingText.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === text.length - 1) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            }
        }
        
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    // Iniciar efecto de typing después de cargar el contenido
    setTimeout(() => {
        typeEffect();
    }, 1000);
}

// ===== SCROLL SUAVE AL INICIO =====
window.addEventListener('scroll', () => {
    updateActiveNav();
});


// ===== PREVENIR SCROLL DURANTE LOADER =====
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
    setTimeout(() => {
        if (loader.classList.contains('hidden')) {
            document.body.style.overflow = 'auto';
        }
    }, 600);
});

// Cuando se oculta el loader, permitir scroll
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('hidden')) {
            document.body.style.overflow = 'auto';
        }
    });
});

observer.observe(loader, {
    attributes: true,
    attributeFilter: ['class']
});

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observerScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Agregar observadores a elementos que deben animarse al hacer scroll
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.section, .project-card, .service-card, .section-title, .about-text, .about-image');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observerScroll.observe(el);
    });
}

// Inicializar animaciones cuando el contenido principal esté visible
setTimeout(() => {
    if (!mainContent.classList.contains('hidden')) {
        initScrollAnimations();
    }
}, 500);

// Reinicializar cuando el contenido se muestre
const mainObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.target.classList.contains('hidden')) {
            setTimeout(() => {
                initScrollAnimations();
            }, 300);
        }
    });
});

mainObserver.observe(mainContent, {
    attributes: true,
    attributeFilter: ['class']
});

// ===== ANIMACIÓN DE HOVER EN TARJETAS =====
document.querySelectorAll('.project-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===== ANIMACIÓN SMOOTH EN LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMACIÓN EN HEADER AL SCROLL =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMACIONES DE TEXTO ADICIONALES =====

// Animación de letras en títulos
function animateTextByLetters(element, delay = 0) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.animation = 'letterPop 0.5s ease-out forwards';
            span.style.opacity = '1';
        }, delay + (index * 50));
    });
}

// Animación de palabras en descripciones
function animateTextByWords(element, delay = 0) {
    if (!element) return;
    
    const text = element.textContent;
    const words = text.split(' ');
    element.textContent = '';
    element.style.opacity = '1';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.marginRight = '0.3em';
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.animation = 'wordFadeIn 0.6s ease-out forwards';
            span.style.opacity = '1';
        }, delay + (index * 100));
    });
}

// Aplicar animaciones cuando el contenido esté visible
setTimeout(() => {
    if (!mainContent.classList.contains('hidden')) {
        // Animar títulos principales
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.querySelector('span')) {
            setTimeout(() => {
                animateTextByLetters(heroTitle, 200);
            }, 300);
        }
        
        // Animar descripciones palabra por palabra
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) {
            setTimeout(() => {
                animateTextByWords(heroDesc, 800);
            }, 600);
        }
    }
}, 1000);

// Animación de textos al hacer scroll
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Si es un título, animar letra por letra
            if (element.classList.contains('section-title')) {
                if (!element.querySelector('span')) {
                    animateTextByLetters(element, 0);
                }
            }
            
            // Si es una descripción, animar palabra por palabra
            if (element.classList.contains('project-description') || 
                element.classList.contains('service-description') ||
                element.classList.contains('about-bio')) {
                if (!element.querySelector('span')) {
                    animateTextByWords(element, 0);
                }
            }
            
            textObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Observar textos para animación
function initTextAnimations() {
    const textElements = document.querySelectorAll('.section-title, .project-description, .service-description, .about-bio');
    textElements.forEach(el => {
        textObserver.observe(el);
    });
}

// Inicializar cuando el contenido esté visible
setTimeout(() => {
    if (!mainContent.classList.contains('hidden')) {
        initTextAnimations();
    }
}, 500);

