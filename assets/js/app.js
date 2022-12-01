(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias de HTML
    const btnPedir = document.querySelector('#btn-pedir'),
        btnDetener = document.querySelector('#btn-detener'),
        btnNuevo = document.querySelector('#btn-nuevo');

    const divCartasJugadores = document.querySelectorAll('.div-cartas'),
        puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(img => img.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(`${i}${tipo}`)
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(`${especial}${tipo}`)
            }
        }
        return _.shuffle(deck);
    }

    // Esta función me permite tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (!isNaN(valor)) ? valor * 1
            : (valor === 'A') ? 11 : 10;
    }


    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    // IA Máquina

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/img/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }


    const determinarGanador = () => {

        const [puntosMinimos, puntosMaquina] = puntosJugadores;
        setTimeout(() => {
            if (puntosMinimos === puntosMaquina) {
                alert('Empate')
            } else if (puntosMinimos > 21) {
                alert('El ganador es la máquina')
            } else if (puntosMaquina > 21) {
                alert('El ganador es el jugador')
            } else {
                alert('El ganador es la máquina')
            }
        }, 100);
    }

    const turnoMaquina = (puntosMinimos) => {
        let puntosMaquina = 0;
        do {
            const carta = pedirCarta();
            puntosMaquina = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }


    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Has ganado');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoMaquina(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoMaquina(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();

    })
})();

