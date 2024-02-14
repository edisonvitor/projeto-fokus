
const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const inputMusicaFoco = document.getElementById('alternar-musica');
const btStartPause = document.getElementById('start-pause');
const textBtIniciarPausar = document.querySelector('#start-pause span');
const imgBtIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.getElementById('timer');

const somInciar = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somBeep = new Audio('./sons/beep.mp3');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoEmSegundos = 1500;
let intervaloId = null;


inputMusicaFoco.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function alterarContexto(contexto) {
    textBtIniciarPausar.textContent = 'Começar';
    zerar();
    mostrarTempo();
    botoes.forEach (function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }

}

btFoco.addEventListener('click', () => {
    tempoEmSegundos = 5
    alterarContexto('foco');
    btFoco.classList.add ('active');
})

btCurto.addEventListener('click', () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto');
    btCurto.classList.add ('active');
})

btLongo.addEventListener('click', () => {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo');
    btLongo.classList.add ('active');
})

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0) {
        somBeep.play();
        //alert('Tempo Finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoEmSegundos -= 1;
    mostrarTempo();
}

btStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play();
        textBtIniciarPausar.textContent = 'Continuar';
        zerar();
        return;
    }
    somInciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    textBtIniciarPausar.textContent = 'Pausar';
    imgBtIniciarPausar.setAttribute('src', './imagens/pause.png');
}
function zerar() {
    clearInterval(intervaloId);
    imgBtIniciarPausar.setAttribute('src', './imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();