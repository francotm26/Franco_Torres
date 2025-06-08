document.addEventListener('DOMContentLoaded', () => {
  // Fondo burbujas animadas (igual que antes)
  const bubblesContainer = document.getElementById('background-bubbles');
  const numBubbles = 30;

  for (let i = 0; i < numBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${3 + Math.random() * 5}s`;
    bubble.style.width = bubble.style.height = `${10 + Math.random() * 20}px`;
    bubblesContainer.appendChild(bubble);
  }

  // Toggle modo claro / oscuro con transición suave en el botón
  const modoToggle = document.getElementById('modoToggle');
  const iconoModo = document.getElementById('iconoModo');
  const body = document.body;

  // Añadimos transición CSS al botón (puede ser también en CSS)
  modoToggle.style.transition = 'background-color 0.4s ease, color 0.4s ease';

  // Cargar estado modo guardado
  if (localStorage.getItem('modoOscuro') === 'true') {
    body.classList.add('modo-oscuro');
    iconoModo.textContent = '☀️';
  }

  modoToggle.addEventListener('click', () => {
    body.classList.toggle('modo-oscuro');

    if (body.classList.contains('modo-oscuro')) {
      iconoModo.textContent = '☀️'; // Sol para modo oscuro activo
      localStorage.setItem('modoOscuro', 'true');
      modoToggle.style.backgroundColor = '#222'; // ejemplo
      modoToggle.style.color = '#fff';
    } else {
      iconoModo.textContent = '🌙'; // Luna para modo claro
      localStorage.setItem('modoOscuro', 'false');
      modoToggle.style.backgroundColor = '#eee';
      modoToggle.style.color = '#000';
    }
  });

  // Cursos para el carrusel
  const cursos = [
    {
      titulo: "Programación",
      descripcion: "Aprende a programar en diversos lenguajes y desarrolla tus propias aplicaciones.",
      imagen: "curso-programacion.jpg"
    },
    {
      titulo: "Robótica",
      descripcion: "Descubre el fascinante mundo de la robótica y crea tus propios robots.",
      imagen: "curso-robotica.jpg"
    },
    {
      titulo: "Matemáticas",
      descripcion: "Fortalece tus habilidades matemáticas con métodos innovadores.",
      imagen: "curso-matematicas.jpg"
    },
    {
      titulo: "Ciencia de Datos",
      descripcion: "Analiza y interpreta datos para tomar decisiones inteligentes.",
      imagen: "curso-cienciadatos.jpg"
    }
  ];

  const carruselCursos = document.getElementById('carrusel-cursos');

  cursos.forEach(curso => {
    const card = document.createElement('div');
    card.className = 'curso-card';

    card.innerHTML = `
      <img src="${curso.imagen}" alt="Curso de ${curso.titulo}" />
      <h3>${curso.titulo}</h3>
      <p>${curso.descripcion}</p>
    `;

    carruselCursos.appendChild(card);
  });

  // Carrusel automático - scroll infinito hacia la derecha
  let scrollPos = 0;
  const scrollStep = 1; // pixeles por frame
  const maxScroll = carruselCursos.scrollWidth - carruselCursos.clientWidth;

  function autoScroll() {
    scrollPos += scrollStep;
    if (scrollPos >= maxScroll) {
      scrollPos = 0; // reinicia para efecto loop infinito
    }
    carruselCursos.scrollLeft = scrollPos;
    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  // Asistente interactivo sencillo
  const btnAsistente = document.getElementById('btn-asistente');
  const asistenteMensaje = document.getElementById('asistente-mensaje');

  // Crearemos un input para que puedas escribir preguntas
  let inputAsistente;

  btnAsistente.addEventListener('click', () => {
    if (!asistenteMensaje.style.display || asistenteMensaje.style.display === 'none') {
      asistenteMensaje.style.display = 'block';
      asistenteMensaje.innerHTML = `
        <div style="margin-bottom: 8px;">Hola! Pregúntame algo sobre los cursos o el sitio.</div>
        <input type="text" id="input-asistente" placeholder="Escribe tu pregunta..." style="width: 100%; padding: 5px; border-radius: 4px; border: 1px solid #ccc;" />
        <div id="respuesta-asistente" style="margin-top: 8px; font-style: italic; color: #eee;"></div>
      `;

      inputAsistente = document.getElementById('input-asistente');
      const respuestaAsistente = document.getElementById('respuesta-asistente');

      inputAsistente.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const pregunta = inputAsistente.value.trim().toLowerCase();

          let respuesta = 'Lo siento, no entendí tu pregunta. Intenta con algo como "¿Qué cursos hay?" o "¿Cómo usar el carrusel?".';

          if (pregunta.includes('curso')) {
            respuesta = 'Actualmente ofrecemos Programación, Robótica, Matemáticas y Ciencia de Datos.';
          } else if (pregunta.includes('carrusel')) {
            respuesta = 'El carrusel se desplaza automáticamente para que puedas ver todos los cursos.';
          } else if (pregunta.includes('modo') || pregunta.includes('oscuro')) {
            respuesta = 'Puedes cambiar entre modo claro y oscuro usando el botón con el ícono de sol o luna.';
          } else if (pregunta.includes('ayuda')) {
            respuesta = 'Estoy aquí para ayudarte. Pregúntame sobre los cursos o cómo navegar por la página.';
          }

          respuestaAsistente.textContent = respuesta;
          inputAsistente.value = '';
        }
      });
    } else {
      asistenteMensaje.style.display = 'none';
    }
  });

});
