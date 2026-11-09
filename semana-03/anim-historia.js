/* Animación · Historia de la IA en una línea del tiempo (1940–2025)
   Datos: tabla 1 de los contenidos de la semana 3 («Detalle de la historia de la IA»,
   traducción de Schroer, 2023, Built In). Cada año y cada hito se copiaron de esa tabla;
   los dos inviernos son los periodos que da el texto: 1974–1980 y 1987–1993.
   Escala: 1940 → x = 40 y 2025 → x = 960 (10,82 px por año).
   Pasos: 1 inicios (1940–1959) · 2 laboratorios y sistemas expertos (1960–1973) ·
   3 primer invierno (1974–1980) · 4 sistemas expertos y Quinta Generación (1980–1993) ·
   5 vuelve el aprendizaje (1997–2016) · 6 modelos de lenguaje (2018–2023).
   En modo lectura se muestra el eje completo y, debajo, la lista de todas las etapas. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const fig = document.getElementById('anim-historia');
  if (!fig) return;
  const diapositiva = fig.closest('.diapositiva');

  function nodo(etiqueta, atributos, padre, texto) {
    const e = document.createElementNS(NS, etiqueta);
    for (const k in atributos) e.setAttribute(k, atributos[k]);
    if (texto !== undefined) e.textContent = texto;
    if (padre) padre.appendChild(e);
    return e;
  }

  const A0 = 1940, A1 = 2025, X0 = 40, X1 = 960;
  const x = (anio) => X0 + ((anio - A0) / (A1 - A0)) * (X1 - X0);

  const ETAPAS = [
    { titulo: 'Los inicios', desde: 1940, hasta: 1959, hitos: [
      [1942, 'Isaac Asimov publica las Tres Leyes de la Robótica.'],
      [1943, 'McCulloch y Pitts: primer modelo matemático de una red neuronal.'],
      [1949, 'Hebb: las conexiones entre neuronas se refuerzan con el uso.'],
      [1950, 'Alan Turing propone su test para saber si una máquina es inteligente.'],
      [1952, 'Arthur Samuel crea un programa de damas que aprende solo.'],
      [1956, 'Dartmouth: John McCarthy acuña «inteligencia artificial».'],
      [1959, 'Samuel acuña «aprendizaje automático» en IBM.'],
    ] },
    { titulo: 'Laboratorios y primeros sistemas expertos', desde: 1960, hasta: 1973, hitos: [
      [1963, 'John McCarthy crea el Laboratorio de IA de Stanford.'],
      [1966, 'Informe ALPAC: se cancelan los proyectos de traducción automática.'],
      [1969, 'Stanford: DENDRAL y MYCIN, los primeros sistemas expertos de éxito.'],
      [1972, 'Se crea el lenguaje de programación lógica PROLOG.'],
      [1973, 'Informe Lighthill: el Reino Unido recorta los fondos para la IA.'],
    ] },
    { titulo: 'Primer invierno de la IA', desde: 1974, hasta: 1980, hitos: [
      [1974, 'DARPA recorta las subvenciones por la frustración con los avances.'],
      [1980, 'Con ALPAC y Lighthill, la financiación se agota y la investigación se estanca.'],
    ] },
    { titulo: 'Sistemas expertos y Quinta Generación', desde: 1980, hasta: 1993, hitos: [
      [1980, 'R1 (XCON): primer sistema experto comercial de éxito.'],
      [1982, 'Japón lanza el proyecto de Quinta Generación (FGCS): rendimiento de'],
      [null, '    superordenador y una plataforma para el desarrollo de la IA.'],
      [1983, 'EE. UU. responde con la Iniciativa de Computación Estratégica.'],
      [1987, 'Se hunde el mercado de las máquinas Lisp: segundo invierno (1987–1993).'],
      [1992, 'Japón termina el FGCS sin alcanzar sus objetivos.'],
    ] },
    { titulo: 'Vuelve el aprendizaje', desde: 1994, hasta: 2017, hitos: [
      [1997, 'Deep Blue, de IBM, vence al campeón de ajedrez Gary Kasparov.'],
      [2011, 'Watson gana en Jeopardy y Apple lanza Siri.'],
      [2012, 'Una red neuronal aprende sola a reconocer gatos en videos de YouTube.'],
      [2016, 'AlphaGo vence al campeón mundial de Go, Lee Sedol.'],
    ] },
    { titulo: 'La era de los modelos de lenguaje', desde: 2018, hasta: 2025, hitos: [
      [2018, 'Google lanza BERT, para comprender el lenguaje natural.'],
      [2020, 'OpenAI lanza GPT-3, que escribe como una persona.'],
      [2022, 'ChatGPT supera los 100 millones de usuarios en pocos meses.'],
      [2023, 'Bing con IA y Bard: la competencia de los chats.'],
    ] },
  ];
  const INVIERNOS = [[1974, 1980, '1.er invierno'], [1987, 1993, '2.º invierno']];

  const svg = nodo('svg', { viewBox: '0 0 1000 400', role: 'img',
    'aria-label': 'Línea del tiempo de la IA de 1940 a 2025, con los dos inviernos (1974–1980 y 1987–1993) y los hitos de cada etapa.' });
  svg.style.cssText = 'width:100%;height:auto;max-height:calc(var(--u) * 60);display:block;font-family:var(--f-texto)';
  fig.prepend(svg);

  // Inviernos (franjas sobre el eje)
  const franjas = INVIERNOS.map(([a, b, rotulo]) => {
    const g = nodo('g', {}, svg);
    g.style.transition = 'opacity 400ms ease';
    nodo('rect', { x: x(a), y: 18, width: x(b) - x(a), height: 52, style: 'fill:var(--caja-diagrama);opacity:0.35' }, g);
    nodo('text', { x: (x(a) + x(b)) / 2, y: 36, 'text-anchor': 'middle', style: 'fill:var(--tinta);font-size:14px;font-weight:700' }, g, rotulo);
    return g;
  });

  // Resaltado de la etapa actual
  const resalte = nodo('rect', { y: 50, height: 40, rx: 4, style: 'fill:var(--dorado);opacity:0.35' }, svg);
  resalte.style.transition = 'x 400ms ease, width 400ms ease';

  // Eje y décadas
  nodo('line', { x1: X0, x2: X1, y1: 70, y2: 70, style: 'stroke:var(--tinta);stroke-width:3' }, svg);
  for (let a = 1940; a <= 2020; a += 10) {
    nodo('line', { x1: x(a), x2: x(a), y1: 62, y2: 78, style: 'stroke:var(--tinta);stroke-width:2' }, svg);
    nodo('text', { x: x(a), y: 104, 'text-anchor': 'middle', style: 'fill:var(--tinta-suave);font-family:var(--f-codigo);font-size:16px' }, svg, String(a));
  }

  // Puntos de cada hito (uno por año distinto)
  const puntos = ETAPAS.map((et) => {
    const anios = [...new Set(et.hitos.map((h) => h[0]).filter((a) => a !== null))];
    return anios.map((a) => nodo('circle', { cx: x(a), cy: 70, r: 7, style: 'fill:var(--acento);stroke:var(--fondo);stroke-width:2' }, svg));
  });

  // Panel de la etapa
  const titulo = nodo('text', { x: X0, y: 150, style: 'fill:var(--acento);font-size:24px;font-weight:900' }, svg, '');
  const lineas = [];
  for (let i = 0; i < 7; i++) {
    const t = nodo('text', { x: X0, y: 188 + i * 30, style: 'fill:var(--tinta);font-size:19px' }, svg);
    const anio = nodo('tspan', { style: 'font-family:var(--f-codigo);font-weight:700;fill:var(--acento)' }, t);
    const resto = nodo('tspan', {}, t);
    lineas.push({ anio, resto });
  }

  function dibujar(paso) {
    const p = Math.max(0, Math.min(ETAPAS.length, paso));
    const et = ETAPAS[p - 1];
    puntos.forEach((lista, k) => lista.forEach((c) => {
      c.style.opacity = k < p ? (k === p - 1 ? 1 : 0.35) : 0;
    }));
    franjas[0].style.opacity = p >= 3 ? 1 : 0;
    franjas[1].style.opacity = p >= 4 ? 1 : 0;
    if (!et) {
      resalte.setAttribute('width', 0);
      titulo.textContent = 'Avanza para recorrer 80 años de historia.';
      lineas.forEach((l) => { l.anio.textContent = ''; l.resto.textContent = ''; });
      return;
    }
    resalte.setAttribute('x', x(et.desde));
    resalte.setAttribute('width', x(et.hasta) - x(et.desde));
    titulo.textContent = `${et.titulo} (${et.desde === 1994 ? 1997 : et.desde}–${et.hasta === 2025 ? 2023 : et.hasta === 2017 ? 2016 : et.hasta})`;
    lineas.forEach((l, i) => {
      const h = et.hitos[i];
      l.anio.textContent = h ? (h[0] === null ? '' : `${h[0]}  `) : '';
      l.resto.textContent = h ? h[1] : '';
    });
  }

  // Modo lectura: eje completo y todas las etapas como lista
  let lista = null;
  function modoLectura() {
    dibujar(ETAPAS.length);
    if (lista) return;
    lista = document.createElement('div');
    lista.className = 'historia-lista';
    ETAPAS.forEach((et) => {
      const h = document.createElement('h3');
      h.textContent = et.titulo;
      const ul = document.createElement('ul');
      et.hitos.forEach(([a, texto]) => {
        if (a === null) { ul.lastChild.textContent += ' ' + texto.trim(); return; }
        const li = document.createElement('li');
        li.textContent = `${a}: ${texto}`;
        ul.appendChild(li);
      });
      lista.append(h, ul);
    });
    fig.appendChild(lista);
  }

  diapositiva.addEventListener('paso', (e) => {
    if (e.detail.lectura) modoLectura();
    else {
      if (lista) { lista.remove(); lista = null; }
      dibujar(e.detail.paso);
    }
  });
  // Si la página ya está en modo lectura al cargar (celular), el aviso del motor llegó antes que este script
  if (document.body.classList.contains('lectura')) modoLectura();
  else dibujar(0);
})();
