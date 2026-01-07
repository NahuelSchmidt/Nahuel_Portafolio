// ===== LOADER REMOVIDO - La página carga directamente =====
const mainContent = document.getElementById('main-content');

// Permitir scroll desde el inicio
document.body.style.overflow = 'auto';

// ===== NAVEGACIÓN =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.getElementById('navOverlay');

// Toggle del menú móvil
function toggleMenu() {
    if (menuToggle && mainNav) {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Toggle overlay
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        
        // Prevenir scroll del body cuando el menú está abierto
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Cerrar menú
function closeMenu() {
    if (menuToggle && mainNav) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        
        // Cerrar overlay
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }
        
        document.body.style.overflow = 'auto';
    }
}

// Event listener para el botón del menú
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        // Cerrar menú móvil si está abierto
        closeMenu();
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cerrar menú al hacer clic fuera de él o en el overlay
document.addEventListener('click', (e) => {
    if (mainNav && mainNav.classList.contains('active')) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    }
});

// Cerrar menú al hacer clic en el overlay
if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Cerrar menú al hacer scroll (se maneja en el listener de scroll del header más abajo)

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


// Scroll habilitado desde el inicio (loader removido)

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

// Inicializar animaciones directamente
setTimeout(() => {
    initScrollAnimations();
}, 100);

// ===== ANIMACIÓN DE HOVER EN TARJETAS =====
document.querySelectorAll('.project-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===== TEMA OSCURO / CLARO =====
const root = document.documentElement;
const header = document.querySelector('.header');
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
    } else {
        root.removeAttribute('data-theme');
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    
    // Resetear el header cuando cambia el tema
    if (header) {
        header.style.backgroundColor = '';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '';
    }
}

// Determinar tema inicial
const storedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (storedTheme) {
    applyTheme(storedTheme);
} else if (prefersLight) {
    applyTheme('light');
} else {
    applyTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
}

// ===== ANIMACIÓN EN HEADER AL SCROLL =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cerrar menú móvil si está abierto y hay scroll significativo
    if (mainNav && mainNav.classList.contains('active')) {
        if (Math.abs(currentScroll - lastScroll) > 50) {
            closeMenu();
        }
    }
    
    if (!header) return;

    // Verificar el tema actual
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';

    if (currentScroll > 100) {
        if (isLightTheme) {
            // Modo claro: header blanco
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            // Modo oscuro: header negro
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.7)';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
        header.style.backdropFilter = 'blur(10px)';
    } else {
        if (isLightTheme) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.6)';
        }
        header.style.backgroundColor = '';
        header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMACIONES DE TEXTO ADICIONALES =====

// Animación de letras en títulos
function animateTextByLetters(element, delay = 0) {
    if (!element) return;
    
    const text = element.textContent.trim(); // Eliminar espacios al inicio y final
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
    
    const text = element.textContent.trim(); // Eliminar espacios al inicio y final
    const words = text.split(/\s+/).filter(word => word.length > 0); // Dividir por espacios y filtrar vacíos
    element.textContent = '';
    element.style.opacity = '1';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        
        // Agregar espacio solo si no es el último elemento
        if (index < words.length - 1) {
            span.style.marginRight = '0.3em';
        }
        
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.animation = 'wordFadeIn 0.6s ease-out forwards';
            span.style.opacity = '1';
        }, delay + (index * 100));
    });
}

// Aplicar animaciones directamente
setTimeout(() => {
    // Animar títulos principales
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.querySelector('span')) {
        setTimeout(() => {
            animateTextByLetters(heroTitle, 200);
        }, 300);
    }
    
    // Descripción hero con animación simple fadeIn
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        heroDesc.style.opacity = '0';
        heroDesc.style.animation = 'fadeIn 0.8s ease-out 0.6s forwards';
    }
}, 500);

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
            
            // Si es una descripción, usar animación simple fadeIn
            if (element.classList.contains('project-description') || 
                element.classList.contains('service-description') ||
                element.classList.contains('about-bio')) {
                // Remover animación palabra por palabra, usar fadeIn simple
                element.style.opacity = '0';
                element.style.animation = 'fadeIn 0.8s ease-out forwards';
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
    initTextAnimations();
}, 100);

// ===== ANIMACIÓN 3D SIGUIENDO EL CURSOR =====
function init3dMouseFollow() {
    const code3dPanel = document.querySelector('.code-3d-panel');
    const code3dContainer = document.querySelector('.code-3d-container');

    if (code3dContainer && code3dPanel) {
        code3dContainer.addEventListener('mousemove', (e) => {
            const rect = code3dContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 20;
            const rotateX = -((y - centerY) / centerY) * 20;
            
            code3dPanel.style.transform = `rotateY(${-18 + rotateY}deg) rotateX(${12 + rotateX}deg)`;
        });
        
        code3dContainer.addEventListener('mouseleave', () => {
            code3dPanel.style.transform = 'rotateY(-18deg) rotateX(12deg)';
        });
    }
}

// Inicializar 3D mouse follow directamente
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        init3dMouseFollow();
    }, 100);
});

