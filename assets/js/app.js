// Variables globales
let currentMessage = null;
let isJumping = false;
let currentMessageIndex = 0;
let messages = [];

// Elementos del DOM
const jumpBtn = document.getElementById('jumpBtn');
const personaje = document.getElementById('personaje');
const block = document.getElementById('block');

// Cargar propuestas desde JSON
async function loadMessages() {
    try {
        const response = await fetch('assets/data/propuestas.json');
        if (!response.ok) {
            throw new Error('Error al cargar las propuestas');
        }
        messages = await response.json();
    } catch (error) {
        console.error('Error cargando propuestas:', error);
        // Mensaje de fallback en caso de error
        messages = [{
            title: "Error",
            content: ["No se pudieron cargar las propuestas. Por favor, recarga la página."]
        }];
    }
}

// Obtener siguiente mensaje
function getNextMessage() {
    if (messages.length === 0) {
        return null;
    }
    const message = messages[currentMessageIndex];
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    return message;
}

// Crear y reproducir sonido de salto
function createJumpSound() {
    try {
        const audio = new Audio('sounds/salto.mp3');
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.log('Error al reproducir sonido de salto:', error);
        });
    } catch (e) {
        console.log('Audio no disponible:', e);
    }
}

// Crear y reproducir sonido de moneda
function createHitSound() {
    try {
        const audio = new Audio('sounds/coin.mp3');
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.log('Error al reproducir sonido de moneda:', error);
        });
    } catch (e) {
        console.log('Audio no disponible:', e);
    }
}

// Manejar el salto del personaje
function handleJump() {
    if (isJumping || messages.length === 0) return;
    
    if (!personaje) return;

    isJumping = true;
    personaje.classList.add('jumping');
    
    createJumpSound();

    setTimeout(() => {
        hitBlock();
    }, 400);

    setTimeout(() => {
        personaje.classList.remove('jumping');
        isJumping = false;
    }, 800);
}

// Efecto de golpe al bloque
function hitBlock() {
    block.classList.add('hit');
    createHitSound();
    
    const nextMessage = getNextMessage();
    if (nextMessage) {
        showMessage(nextMessage);
    }

    setTimeout(() => {
        block.classList.remove('hit');
    }, 500);
}

// Mostrar mensaje emergente
function showMessage(messageData) {
    if (currentMessage) {
        currentMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    let contentHTML = '<h3>' + escapeHtml(messageData.title) + '</h3><ul>';
    messageData.content.forEach(item => {
        contentHTML += '<li>' + escapeHtml(item) + '</li>';
    });
    contentHTML += '</ul>';
    contentHTML += '<button class="close-btn" onclick="closeMessage()">✕</button>';
    
    messageDiv.innerHTML = contentHTML;
    document.getElementById('gameContainer').appendChild(messageDiv);
    currentMessage = messageDiv;
}

// Cerrar mensaje
window.closeMessage = function() {
    if (currentMessage) {
        currentMessage.remove();
        currentMessage = null;
    }
};

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Inicializar aplicación
async function init() {
    await loadMessages();
    
    // Event listener para el botón de salto
    if (jumpBtn) {
        jumpBtn.addEventListener('click', handleJump);
    }

    // Soporte para barra espaciadora
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !isJumping) {
            e.preventDefault();
            handleJump();
        }
    });

    // Prevenir zoom en móviles al hacer doble tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

