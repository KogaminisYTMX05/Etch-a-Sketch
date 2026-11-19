const container = document.getElementById('grid-container');
const resetBtn = document.getElementById('reset-btn');

// --- CRÉDITO EXTRA: Función para generar un color RGB aleatorio ---
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Función principal para crear la cuadrícula
function createGrid(size) {
    // 1. Limpiar el contenedor por si ya había una cuadrícula
    container.innerHTML = '';

    // 2. Calcular el tamaño de cada cuadrado para que quepan perfectamente en 960px
    const squareSize = 960 / size;

    // 3. Crear los cuadrados (size * size)
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        
        // Asignar tamaño dinámico
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // 4. Evento para pintar (Hover)
        square.addEventListener('mouseover', (e) => {
            
            // Crédito Extra 1: Color RGB aleatorio
            // Si el cuadrado no tiene color de fondo asignado aún, le damos uno aleatorio
            if (!e.target.style.backgroundColor) {
                e.target.style.backgroundColor = getRandomColor();
            }

            // Crédito Extra 2: Oscurecimiento progresivo
            // Obtenemos la opacidad actual (inicialmente es 0 por el CSS)
            let currentOpacity = parseFloat(e.target.style.opacity) || 0;
            
            // Si aún no está completamente negro (opacidad < 1), aumentamos en 0.1 (10%)
            if (currentOpacity < 1) {
                e.target.style.opacity = currentOpacity + 0.1;
            }
        });

        // Añadir el cuadrado al contenedor
        container.appendChild(square);
    }
}

// --- EVENTO DEL BOTÓN PARA REINICIAR ---
resetBtn.addEventListener('click', () => {
    // Pedir al usuario el nuevo tamaño
    let userInput = prompt("¿De cuántos cuadrados por lado quieres la nueva cuadrícula? (Máximo 100):");
    
    // Si el usuario cancela el prompt, no hacemos nada
    if (userInput === null) return;

    // Convertir a número entero
    let newSize = parseInt(userInput);

    // Validaciones
    if (isNaN(newSize) || newSize < 1) {
        alert("Por favor, introduce un número válido mayor a 0.");
    } else if (newSize > 100) {
        alert("El número máximo permitido es 100. Se creará una cuadrícula de 100x100.");
        createGrid(100);
    } else {
        // Crear la nueva cuadrícula
        createGrid(newSize);
    }
});

// --- INICIALIZACIÓN ---
// Crear la cuadrícula inicial de 16x16 al cargar la página
createGrid(16);