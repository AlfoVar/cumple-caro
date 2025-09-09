// Configuración de la fecha objetivo para la cuenta regresiva
// CAMBIAR ESTA FECHA POR LA FECHA DESEADA
// IMPORTANTE: Esta fecha usa la zona horaria local del usuario
// Para especificar zona horaria, usa formato ISO: '2024-12-25T00:00:00-04:00' (GMT-5)
// O para UTC: '2024-12-25T00:00:00Z'
const targetDate = new Date('2024-09-09T12:00:00-04:00').getTime(); // Ejemplo: 25 de diciembre, GMT-5 (Colombia/Perú)

// Variables globales
let countdownInterval;
let confettiCanvas;
let confettiCtx;
let confettiParticles = [];
let useServerTime = false; // Cambiar a true para usar hora del servidor
let serverTimeOffset = 0; // Diferencia entre servidor y cliente

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initConfetti();
    
    // Si se quiere usar hora del servidor, primero sincronizar
    if (useServerTime) {
        syncWithServerTime().then(() => {
            startCountdown();
        });
    } else {
        startCountdown();
    }
    
    setupGiftInteraction();
    addFloatingParticles();
});

// Función para sincronizar con hora del servidor
async function syncWithServerTime() {
    try {
        // Opción 1: Usar un servicio de tiempo público
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Bogota');
        const data = await response.json();
        const serverTime = new Date(data.datetime).getTime();
        const clientTime = new Date().getTime();
        serverTimeOffset = serverTime - clientTime;
        
        console.log('🕐 Sincronizado con hora del servidor (Colombia)');
        console.log(`📊 Diferencia: ${serverTimeOffset}ms`);
    } catch (error) {
        console.warn('⚠️ No se pudo sincronizar con el servidor, usando hora local');
        useServerTime = false;
        serverTimeOffset = 0;
    }
}

// Función para obtener la hora actual (servidor o local)
function getCurrentTime() {
    const localTime = new Date().getTime();
    return useServerTime ? localTime + serverTimeOffset : localTime;
}

// Función de cuenta regresiva
function startCountdown() {
    // Verificar inmediatamente si la fecha ya pasó
    const now = getCurrentTime();
    const distance = targetDate - now;
    
    if (distance <= 0) {
        // Si la fecha ya pasó, mostrar el regalo inmediatamente
        console.log('🎁 La fecha objetivo ya pasó, mostrando regalo inmediatamente');
        showGiftButton();
        return;
    }
    
    countdownInterval = setInterval(function() {
        const now = getCurrentTime(); // Usar función que maneja servidor/local
        const distance = targetDate - now;

        if (distance > 0) {
            // Cálculos de tiempo
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Actualizar la pantalla
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            // Efecto de parpadeo cuando quedan menos de 10 segundos
            if (hours === 0 && minutes === 0 && seconds <= 10) {
                document.querySelector('.countdown-container').style.animation = 'pulse 0.5s ease-in-out infinite';
            }
        } else {
            // Tiempo terminado
            clearInterval(countdownInterval);
            showGiftButton();
        }
    }, 1000);
}

// Mostrar el botón para abrir el regalo
function showGiftButton() {
    document.getElementById('countdownSection').style.display = 'none';
    document.getElementById('openGiftSection').style.display = 'block';
    
    // Animación especial para el regalo
    const giftBox = document.getElementById('giftBox');
    giftBox.style.animation = 'bounce 0.5s ease-in-out infinite, glow-pulse 1s ease-in-out infinite';
    
    // Cambiar el mensaje
    document.querySelector('.subtitle').textContent = '¡Tu regalo está listo! 🎁';
    
    // Activar partículas de celebración
    startCelebrationParticles();
}

// Configurar la interacción con el regalo
function setupGiftInteraction() {
    const giftBox = document.getElementById('giftBox');
    const openGiftBtn = document.getElementById('openGiftBtn');
    
    // Hacer que el regalo sea clickeable
    giftBox.addEventListener('click', function() {
        if (document.getElementById('openGiftSection').style.display === 'block') {
            openGift();
        }
    });
    
    // Botón para abrir regalo
    openGiftBtn.addEventListener('click', openGift);
}

// Función para abrir el regalo
function openGift() {
    // Efectos especiales antes de redirigir
    launchConfetti();
    playOpeningAnimation();
    
    // Animación de la caja abriéndose
    const giftBox = document.getElementById('giftBox');
    giftBox.style.transform = 'scale(1.5) rotateY(180deg)';
    giftBox.style.opacity = '0';
    
    // Cambiar el fondo
    document.querySelector('.background-container').style.background = 
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
    
    // Redirigir a la página del regalo después de un breve delay para mostrar efectos
    setTimeout(() => {
        window.location.href = 'regalo.html';
    }, 1500);
}

// Animación de apertura
function playOpeningAnimation() {
    // Sonido de celebración (si se desea agregar)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
    
    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
}

// Explosión de corazones
function startHeartExplosion() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.animation = 'heartFloat 3s ease-in-out infinite';
        }, index * 300);
    });
}

// Configuración del canvas de confetti
function initConfetti() {
    confettiCanvas = document.getElementById('confetti');
    confettiCtx = confettiCanvas.getContext('2d');
    
    // Ajustar el tamaño del canvas
    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// Lanzar confetti
function launchConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0', '#e15554', '#f093fb'];
    
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
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
        particle.vy += 0.2;
        
        // Dibujar partícula
        confettiCtx.save();
        confettiCtx.translate(particle.x, particle.y);
        confettiCtx.rotate(particle.rotation * Math.PI / 180);
        confettiCtx.fillStyle = particle.color;
        confettiCtx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        confettiCtx.restore();
        
        // Remover partículas que salen de la pantalla
        if (particle.y > confettiCanvas.height + 10 || 
            particle.x < -10 || 
            particle.x > confettiCanvas.width + 10) {
            confettiParticles.splice(i, 1);
        }
    }
    
    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Partículas de celebración continuas
function startCelebrationParticles() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de probabilidad cada intervalo
            const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0'];
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 5 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 8
            });
            
            if (confettiParticles.length === 1) {
                animateConfetti();
            }
        }
    }, 2000);
}

// Agregar partículas flotantes al fondo
function addFloatingParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 4 + 6}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Función para actualizar la fecha objetivo (útil para personalizar)
function setTargetDate(year, month, day, hour = 0, minute = 0, second = 0) {
    const newTargetDate = new Date(year, month - 1, day, hour, minute, second).getTime();
    targetDate = newTargetDate;
    
    // Reiniciar countdown si es necesario
    if (countdownInterval) {
        clearInterval(countdownInterval);
        startCountdown();
    }
}

// Función para configurar zona horaria específica
function setTargetDateWithTimezone(dateString) {
    // Ejemplos de formato:
    // '2024-12-25T00:00:00-05:00' (GMT-5, Colombia/Perú)
    // '2024-12-25T00:00:00+01:00' (GMT+1, España)
    // '2024-12-25T00:00:00Z' (UTC)
    targetDate = new Date(dateString).getTime();
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
        startCountdown();
    }
}

// Función para activar/desactivar hora del servidor
function toggleServerTime(enabled = true) {
    useServerTime = enabled;
    if (enabled) {
        syncWithServerTime().then(() => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
                startCountdown();
            }
        });
    } else {
        serverTimeOffset = 0;
        if (countdownInterval) {
            clearInterval(countdownInterval);
            startCountdown();
        }
    }
}

// Función para saltarse la cuenta regresiva (para testing)
function skipCountdown() {
    clearInterval(countdownInterval);
    showGiftButton();
}

// Easter egg: doble click en el título para saltarse la cuenta regresiva
document.querySelector('.birthday-title').addEventListener('dblclick', function() {
    if (confirm('¿Quieres saltarte la cuenta regresiva? (Solo para testing)')) {
        skipCountdown();
    }
});

// Efectos de hover para elementos interactivos
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('gift-box')) {
        e.target.style.filter = 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('gift-box')) {
        e.target.style.filter = 'none';
    }
});

// Prevenir zoom en dispositivos móviles al hacer doble tap
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Mensaje de console para desarrolladores
console.log('🎉 ¡Página de cumpleaños cargada exitosamente!');
console.log('💝 Para personalizar la fecha objetivo, usa:');
console.log('   setTargetDate(año, mes, día, hora, minuto, segundo)');
console.log('   setTargetDateWithTimezone("2024-12-25T00:00:00-05:00")');
console.log('🕐 Para usar hora del servidor: toggleServerTime(true)');
console.log('🎁 Para saltarse la cuenta regresiva durante testing: skipCountdown()');
console.log(`⏰ Modo actual: ${useServerTime ? 'Hora del servidor' : 'Hora local del usuario'}`);

// Debug de fechas
const now = getCurrentTime();
const distance = targetDate - now;
console.log(`📅 Fecha objetivo: ${new Date(targetDate).toLocaleString()}`);
console.log(`📅 Fecha actual: ${new Date(now).toLocaleString()}`);
console.log(`⏱️ Diferencia en ms: ${distance}`);
console.log(`🎯 Estado: ${distance > 0 ? 'Cuenta regresiva activa' : 'Tiempo cumplido - Regalo disponible'}`);

// Exportar funciones útiles para personalización
window.giftPage = {
    setTargetDate: setTargetDate,
    setTargetDateWithTimezone: setTargetDateWithTimezone,
    toggleServerTime: toggleServerTime,
    skipCountdown: skipCountdown,
    launchConfetti: launchConfetti,
    getCurrentTime: getCurrentTime
};