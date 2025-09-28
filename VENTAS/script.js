document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inicialización de Swiper para la Galería Carrusel
    const swiper = new Swiper('.galeria-swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1, 
        spaceBetween: 30,
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        breakpoints: {
            768: {
                slidesPerView: 2, 
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3, 
                spaceBetween: 40,
            },
        }
    });

    // 2. Lógica del Header Dinámico (Efecto de encoger al hacer scroll)
    const header = document.getElementById('mainHeader');
    const scrollThreshold = 50; 

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            // Solo aplica si el header no es estático (para móvil)
            if (window.getComputedStyle(header).position === 'fixed') {
                header.classList.add('header-shrink');
            }
        } else {
            header.classList.remove('header-shrink');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 


    // 3. Lógica AÑADIDA y MODIFICADA para Ocultar el Preloader
    const preloader = document.getElementById('preloader');
    
    // Función para ocultar el preloader de forma controlada
    function hidePreloader() {
        if (preloader) {
            // Inicia la transición CSS (opacity: 0)
            preloader.classList.add('hidden');
            
            // Elimina el elemento del DOM después de la transición (600ms)
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }
    }
    
    // Guardamos el tiempo en que el contenido básico de la página está listo
    const domReadyTime = Date.now();
    
    window.addEventListener('load', function() {
        const loadCompleteTime = Date.now();
        const elapsedTime = loadCompleteTime - domReadyTime; // Tiempo que tardó en cargar la página
        const minDisplayTime = 3000; // 3000 milisegundos (3 segundos)

        if (elapsedTime >= minDisplayTime) {
            // La página tardó 3s o más en cargar, lo ocultamos inmediatamente.
            hidePreloader();
        } else {
            // La página cargó más rápido de 3s, esperamos el tiempo restante para completar los 3s.
            const timeToWait = minDisplayTime - elapsedTime;
            setTimeout(hidePreloader, timeToWait);
        }
    });

});