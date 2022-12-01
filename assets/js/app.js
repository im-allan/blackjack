let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosMaquina = 0;


// Referencias de HTML
const btnPedir = document.querySelector('#btn-pedir');
const btnDetener = document.querySelector('#btn-detener');
const btnNuevo = document.querySelector('#btn-nuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasMaquina = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

// Esta función crea un nuevo deck
const crearDeck = () => {
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
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

// Esta función me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop()

    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return puntos = (!isNaN(valor)) ? valor * 1
        : (valor === 'A') ? 11 : 10;
}
const valor = valorCarta(pedirCarta());

// IA Máquina

const turnoMaquina = (puntosMinimos) => {

    do {

        const carta = pedirCarta();
        puntosMaquina = puntosMaquina + valorCarta(carta);
        puntosHTML[1].innerText = puntosMaquina;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/img/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasMaquina.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosMaquina < puntosJugador) && (puntosMinimos <= 21));
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
    }, 20);

}


// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/img/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

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
    turnoMaquina(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    console.clear();

    puntosJugador = 0;
    puntosMaquina = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasMaquina.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

})