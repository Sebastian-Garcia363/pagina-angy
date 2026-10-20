const CONFIG = {
  nombre: "mi princesita",


  velas: 5,

  musica: "cancion1.mp3",

  // Carta
  cartaTitulo: "Para mi princesita 💞",
  carta: [
    "Hoy es un día muy especial porque nació la persona que le dio color a mi vida, pese a que puede ser un detalle bobo representa los dos amores de mi vida",
    "La programacion y tu, tu mi pequeñita la niña por la que mi corazon late, no se que haria sin ti bebe pero bueno doy gracias a dios que te tengo aqui y que voy a estar en tu memoria",
    "Por este detalle eso, eso ya me hace muy feliz espero que pases un dia fenomal mi princesita te amo, te amo de aqui a otro universo mua",
    "Gracias por ser mi lugar favorito. Te amo muchísimo."
  ],
  firma: "Con todo mi amor, tu niño 💞",

  razones: [
    { emoji: "😊", titulo: "Tu sonrisa",         texto: "Tienes el poder de arreglarme cualquier día." },
    { emoji: "👀", titulo: "Tus ojitos dindos",  texto: "Me pierdo en ellos cada vez que me miras." },
    { emoji: "🧸", titulo: "Tu ternura",         texto: "Eres suave y dulce" },
    { emoji: "💞", titulo: "Tu forma de amar",   texto: "Me haces sentir querido de la mejor manera." },
    { emoji: "✨", titulo: "Tu forma de ser",    texto: "Eres única, y por eso eres mi princesita hermosa." },
    { emoji: "💞", titulo: "Lo que somos",       texto: "Contigo todo es mas facil todo se siente bien." }
  ],

  fotos: [
    { src: "fotos/ojitos.jpg", texto: "Mi princesita" },
    { src: "fotos/tus ojos.jpg", texto: "Mis ojitos dindos" },
    { src: "fotos/cachetes.jpg", texto: "Tan bonita" },
    { src: "fotos/tu felicidad es la mia.jpg", texto: "Mi razón de sonreír" },
    { src: "fotos/bb.jpg", texto: "tu de bebeee :)" },
    { src: "fotos/cachetes x2.jpg", texto: "Te amo 💞" }
  ],


  deseo: "Que todos tus sueños se cumplan, mi princesita 💞"
};


const $ = (id) => document.getElementById(id);

/* ---- Contenido ---- */
$('nombre').textContent = CONFIG.nombre;
$('cartaTitulo').textContent = CONFIG.cartaTitulo;
$('cartaTexto').innerHTML = CONFIG.carta.map(p => `<p>${p}</p>`).join('');
$('firma').textContent = CONFIG.firma;

$('razones').innerHTML = CONFIG.razones.map((r, i) => `
  <div class="reason reveal" style="transition-delay:${i * 80}ms">
    <div class="ic">${r.emoji}</div>
    <h3>${r.titulo}</h3>
    <p>${r.texto}</p>
  </div>`).join('');

const tilts = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3.5, 2];
$('galeria').innerHTML = CONFIG.fotos.map((f, i) => `
  <figure class="polaroid reveal" style="--r:${tilts[i % tilts.length]}deg;transition-delay:${i * 90}ms" data-i="${i}">
    <div class="ph"><img src="${f.src}" alt="${f.texto}" loading="lazy"></div>
    <figcaption class="script">${f.texto}</figcaption>
  </figure>`).join('');

/* Si una foto aún no existe, muestra un espacio bonito con peluche */
document.querySelectorAll('.polaroid img').forEach(img => {
  img.addEventListener('error', () => {
    img.parentElement.innerHTML = '<div class="empty"><div><b>🧸</b>Aquí va tu foto</div></div>';
    img.closest('.polaroid').dataset.empty = '1';
  });
});


const lb = $('lb');
$('galeria').addEventListener('click', (e) => {
  const fig = e.target.closest('.polaroid');
  if (!fig || fig.dataset.empty) return;
  const f = CONFIG.fotos[+fig.dataset.i];
  $('lbImg').src = f.src; $('lbImg').alt = f.texto; $('lbTxt').textContent = f.texto;
  lb.classList.add('open');
});
lb.addEventListener('click', () => lb.classList.remove('open'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });


const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));


const audio = $('audio'), mBtn = $('musica');
if (CONFIG.musica) {
  audio.src = CONFIG.musica;
  audio.addEventListener('canplaythrough', () => { mBtn.hidden = false; }, { once: true });
  audio.addEventListener('error', () => { mBtn.hidden = true; });
}
mBtn.addEventListener('click', () => {
  if (audio.paused) { audio.play(); mBtn.textContent = '🎵'; }
  else { audio.pause(); mBtn.textContent = '🔇'; }
});

$('abrir').addEventListener('click', () => {
  $('intro').classList.add('hide');
  document.body.classList.remove('locked');
  if (CONFIG.musica) audio.play().catch(() => {});
});


const nVelas = Math.min(7, Math.max(1, CONFIG.velas || 5));
$('velas').innerHTML = Array.from({ length: nVelas }, () => '<div class="candle"><div class="flame"></div></div>').join('');

let typing, soplado = false;
$('soplar').addEventListener('click', () => {
  const cake = $('cake'), t = $('deseoTexto'), btn = $('soplar');
  clearInterval(typing);
  if (!soplado) {
    soplado = true;
    cake.classList.add('off');
    btn.textContent = 'Enciende de nuevo';
    t.textContent = '';
    let i = 0;
    typing = setInterval(() => {
      t.textContent = CONFIG.deseo.slice(0, ++i);
      if (i >= CONFIG.deseo.length) clearInterval(typing);
    }, 45);
  } else {
    soplado = false;
    cake.classList.remove('off');
    btn.textContent = 'Soplar las velitas ';
    t.textContent = '';
  }
});
