// Variables globales
let confettiCanvas;
let confettiCtx;
let confettiParticles = [];
let confettiAnimation;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initConfetti();
    launchWelcomeConfetti();
    hideLoadingOverlay();
    addFloatingParticles();
    
    // Agregar evento al iframe para detectar cuando carga
    const iframe = document.getElementById('canva-video');
    iframe.addEventListener('load', hideLoadingOverlay);
    
    // Ocultar loading después de 3 segundos como fallback
    setTimeout(hideLoadingOverlay, 3000);
});

// Configuración del canvas de confetti
function initConfetti() {
    confettiCanvas = document.getElementById('confetti-canvas');
    confettiCtx = confettiCanvas.getContext('2d');
    
    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// Lanzar confetti de bienvenida
function launchWelcomeConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0', '#e15554', '#f093fb', '#ff9a9e'];
    
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 6 + 3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }
    
    animateConfetti();
}

// Animar confetti
function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const particle = confettiParticles[i];
        
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Gravedad
        particle.vy += 0.15;
        
        // Dibujar partícula
        confettiCtx.save();
        confettiCtx.translate(particle.x, particle.y);
        confettiCtx.rotate(particle.rotation * Math.PI / 180);
        confettiCtx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        } else {
            confettiCtx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        }
        
        confettiCtx.restore();
        
        // Remover partículas que salen de la pantalla
        if (particle.y > confettiCanvas.height + 10 || 
            particle.x < -10 || 
            particle.x > confettiCanvas.width + 10) {
            confettiParticles.splice(i, 1);
        }
    }
    
    if (confettiParticles.length > 0) {
        confettiAnimation = requestAnimationFrame(animateConfetti);
    }
}

// Ocultar overlay de carga
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }
}

// Agregar partículas flotantes decorativas
function addFloatingParticles() {
    const container = document.querySelector('.particles-bg');
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 6 + 8}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(particle);
    }
}

// Función para compartir regalo
function shareGift() {
    document.getElementById('shareModal').style.display = 'block';
}

// Cerrar modal
function closeModal() {
    document.getElementById('shareModal').style.display = 'none';
}

// Compartir en WhatsApp
function shareOnWhatsApp() {
    const text = encodeURIComponent('¡Mira este hermoso regalo de cumpleaños que recibí! 🎁✨');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
    closeModal();
}

// Compartir en Facebook
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    closeModal();
}

// Copiar enlace
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // Cambiar temporalmente el texto del botón
        const btn = document.querySelector('.copy');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
            closeModal();
        }, 2000);
    }).catch(() => {
        alert('No se pudo copiar el enlace. Cópialo manualmente: ' + window.location.href);
        closeModal();
    });
}

// Función para descargar regalo - abrir enlace directo de Canva
function downloadGift() {
    // Enlace directo al diseño de Canva para descarga
    const canvaDirectLink = 'https://www.canva.com/design/DAGycVW93GM/QfI1SVFBRh4MpVVBIBt1cg/watch?utm_content=DAGycVW93GM&utm_campaign=designshare&utm_medium=embeds&utm_source=link';
    
    // Abrir en nueva pestaña
    window.open(canvaDirectLink, '_blank');
    
    // Mostrar mensaje informativo
    setTimeout(() => {
        alert('Se ha abierto Canva en una nueva pestaña. Desde ahí podrás descargar el video usando las opciones de Canva.');
    }, 1000);
}

// Volver a la página anterior
function goBack() {
    // Intentar volver a la página anterior
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
    } else {
        // Si no hay referrer, redirigir a index.html
        window.location.href = 'index.html';
    }
}

// Cerrar modal al hacer click fuera de él
window.addEventListener('click', function(event) {
    const modal = document.getElementById('shareModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Efectos especiales al scroll
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const elements = document.querySelectorAll('.floating-heart, .floating-star, .floating-gift, .floating-balloon');
    
    elements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Función para relanzar confetti (útil para eventos especiales)
function relaunchConfetti() {
    // Limpiar confetti existente
    confettiParticles = [];
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
    }
    
    // Lanzar nuevo confetti
    launchWelcomeConfetti();
}

// Easter egg: triple click en el título para relanzar confetti
let titleClickCount = 0;
let titleClickTimer;

document.querySelector('.gift-title').addEventListener('click', function() {
    titleClickCount++;
    
    if (titleClickCount === 1) {
        titleClickTimer = setTimeout(() => {
            titleClickCount = 0;
        }, 1000);
    } else if (titleClickCount === 3) {
        clearTimeout(titleClickTimer);
        titleClickCount = 0;
        relaunchConfetti();
        
        // Pequeña sorpresa visual
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'titleGlow 2s ease-in-out infinite alternate';
        }, 100);
    }
});

// Detectar si el dispositivo soporta hover para optimizar efectos
const hasHover = window.matchMedia('(hover: hover)').matches;
if (!hasHover) {
    // En dispositivos táctiles, remover algunos efectos hover para mejor rendimiento
    document.body.classList.add('touch-device');
}

// Función para cambiar el video de Canva (útil para personalización)
function changeCanvaVideo(newSrc) {
    const iframe = document.getElementById('canva-video');
    const overlay = document.getElementById('loadingOverlay');
    
    // Mostrar loading
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    
    // Cambiar src
    iframe.src = newSrc;
    
    // Ocultar loading cuando cargue
    iframe.onload = hideLoadingOverlay;
    
    // Fallback
    setTimeout(hideLoadingOverlay, 5000);
}

// Mensajes de console para desarrolladores
console.log('🎁 ¡Página del regalo cargada exitosamente!');
console.log('🎬 Para cambiar el video de Canva, usa: changeCanvaVideo("tu-nuevo-enlace")');
console.log('🎉 Para relanzar confetti, usa: relaunchConfetti()');
console.log('✨ Easter egg: Triple click en el título para más confetti');

// Exportar funciones útiles
window.giftPage = {
    changeCanvaVideo: changeCanvaVideo,
    relaunchConfetti: relaunchConfetti,
    shareGift: shareGift,
    goBack: goBack
};
