// Base de datos de las habitaciones del Hotel Aló Inn
const roomData = {
    sencilla: {
        title: "Habitación Sencilla",
        price: "$570 MXN",
        capacity: "1-2 Personas",
        description: "Espacio de diseño acogedor pensado para estancias individuales o de pareja. Ofrece una atmósfera de total tranquilidad con excelente iluminación, escritorio funcional y acabados limpios que garantizan un descanso reparador durante tu visita.",
        features: ["1 Cama Matrimonial", "Ventilación Natural", "Smart TV HD", "Baño Privado Integrado"],
        images: ["img/habitacionsencilla.jpeg", "img/sencilla-2.jpg", "img/sencilla-3.jpg"],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Sencilla."
    },
    doble: {
        title: "Habitación Doble",
        price: "$780 MXN",
        capacity: "2-4 Personas",
        description: "Amplia habitación configurada meticulosamente para viajes familiares o de negocios. Cuenta con una distribución optimizada de los espacios, mobiliario contemporáneo y todo el confort necesario para múltiples huéspedes.",
        features: ["2 Camas Matrimoniales", "Espacio para equipaje", "Smart TV con cable", "Baño Confortable"],
        images: ["img/habitaciondoble.jpeg", "img/doble-2.jpg", "img/doble-3.jpg"],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Doble."
    },
    triple: {
        title: "Habitación Triple",
        price: "$980 MXN",
        capacity: "3-6 Personas",
        description: "Nuestra alternativa de máxima comodidad para grupos grandes o familias numerosas. Diseñada bajo un concepto que integra amplitud, privacidad y servicios de primer nivel para coordinar una estancia perfecta en el hotel.",
        features: ["3 Camas Matrimoniales", "Área de descanso extendida", "Múltiples accesos Wi-Fi", "Ventilación Premium"],
        images: ["img/habitaciontriple.jpeg", "img/triple-2.jpg", "img/triple-3.jpg"],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Triple."
    },
    cuadruple: {
        title: "Habitación Cuádruple",
        price: "$1,180 MXN",
        capacity: "4-8 Personas",
        description: "La opción ideal en capacidad y confort. Un espacio de proporciones masivas ideado para delegaciones o familias extendidas que no desean comprometer comodidad por espacio. Totalmente equipada con los servicios del hotel.",
        features: ["4 Camas Matrimoniales", "Máximo metraje cuadrado", "Distribución simétrica", "Vistas exteriores"],
        images: ["img/habitacioncuadruple.jpeg", "img/cuadruple-2.jpg", "img/cuadruple-3.jpg"],
        waMsg: "Hola! Me interesa cotizar disponibilidad para la Habitación Cuádruple."
    }
};

// 1. Leer el parámetro de la URL (ej: habitacion.html?tipo=sencilla)
const urlParams = new URLSearchParams(window.location.search);
const roomType = urlParams.get('tipo') || 'sencilla'; // Si no encuentra tipo, carga la sencilla por defecto
const currentData = roomData[roomType];

// Variables globales para el Slider de fotos
let currentSlideIndex = 0;
let slideImages = [];

// 2. Inyectar los datos en el HTML si la habitación existe en la base de datos
if (currentData) {
    document.getElementById('room-title').innerText = currentData.title;
    document.getElementById('room-subtitle').innerText = currentData.title;
    document.getElementById('room-price').innerText = currentData.price;
    document.getElementById('room-capacity').innerText = currentData.capacity;
    document.getElementById('room-description').innerText = currentData.description;
    
    // Configurar el enlace de WhatsApp con el mensaje personalizado
    document.getElementById('wa-reserve-btn').href = `https://wa.me/522282358579?text=${encodeURIComponent(currentData.waMsg)}`;
    
    // Guardar el arreglo de imágenes de la habitación
    slideImages = currentData.images;
    
    // Cargar la primera imagen en el contenedor principal del slider
    document.getElementById('active-slide-img').src = slideImages[0];

    // Cargar la lista de características en la columna izquierda
    const featuresContainer = document.getElementById('room-features-list');
    currentData.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<span>▪</span> ${feat}`;
        featuresContainer.appendChild(li);
    });

    // Generar dinámicamente los puntitos (Dots) inferiores según la cantidad de fotos
    const dotsContainer = document.getElementById('slider-dots-container');
    slideImages.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active'); // El primer punto inicia activo
        dot.onclick = () => jumpToSlide(idx); // Permitir saltar a la foto haciendo clic en el punto
        dotsContainer.appendChild(dot);
    });
}

// 3. Funciones lógicas para controlar el Slider / Carrusel Animado

function updateSliderUI() {
    const imgEl = document.getElementById('active-slide-img');
    
    // Efecto visual de desvanecimiento (fade-out rápido)
    imgEl.style.opacity = '0.3';
    
    setTimeout(() => {
        imgEl.src = slideImages[currentSlideIndex];
        imgEl.style.opacity = '1'; // Volver a encender la opacidad (fade-in)
    }, 150);

    // Actualizar el estado visual del puntito activo
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Cambiar de slide con las flechas laterales (< y >)
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    // Ciclar el carrusel si llega al final o al principio
    if (currentSlideIndex >= slideImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slideImages.length - 1;
    
    updateSliderUI();
}

// Saltar directamente a una foto usando los puntitos
function jumpToSlide(index) {
    currentSlideIndex = index;
    updateSliderUI();
}