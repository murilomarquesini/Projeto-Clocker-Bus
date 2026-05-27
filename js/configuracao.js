// Abre o modal de configuração
const mudarConfiguracao = document.querySelector('#btnConfiguracoes');
const modalConfig = document.querySelector('.modalConfiguracao');

if(mudarConfiguracao && modalConfig){
    const modalC = new bootstrap.Modal(modalConfig);

    mudarConfiguracao.addEventListener('click', (e) => {
        e.preventDefault();
        modalC.show();
    });
}

const temaSalvo = localStorage.getItem('tema');

if(temaSalvo === 'escuro'){
    ativarModoEscuro();
} else {
    ativarModoClaro();
}

function ativarModoClaro(){
    document.documentElement.style.setProperty('--cor-fundo-pontual', '#F1FEC6');
    document.documentElement.style.setProperty('--cor-fundo-geral', '#B6D6CC');
    document.documentElement.style.setProperty('--cor-detalhes', '#64B6AC');
    document.documentElement.style.setProperty('--cor-texto-icone', '#34A0A4');
    document.documentElement.style.setProperty('--cor-texto-geral', '#04191F');
    document.documentElement.style.setProperty('--cor-fundo-sidebar', '#B6D6CC'); 
    document.documentElement.style.setProperty('--cor-texto-sidebar', '#04191F');

    localStorage.setItem('tema', 'claro');
}

function ativarModoEscuro(){
    document.documentElement.style.setProperty('--cor-fundo-geral', '#121212');    // Fundo total preto
    document.documentElement.style.setProperty('--cor-fundo-pontual', '#1e1e1e');  // Modais cinza escuro
    document.documentElement.style.setProperty('--cor-detalhes', '#2B5A53');       // Botões verde escuro
    document.documentElement.style.setProperty('--cor-texto-icone', '#809c98');     // Ícones suaves
    document.documentElement.style.setProperty('--cor-texto-geral', '#ffffff');     // Texto branco puro

    
    document.documentElement.style.setProperty('--cor-fundo-sidebar', '#1e1e1e');  // Fundo do menu escuro
    document.documentElement.style.setProperty('--cor-texto-sidebar', '#ffffff');  // Letras do menu brancas

    localStorage.setItem('tema', 'escuro');
}

const modoClaro = document.querySelector('#modoClaro');
const modoEscuro = document.querySelector('#modoEscuro');

if(modoClaro){
    modoClaro.addEventListener('click', ativarModoClaro);
}

if(modoEscuro){
    modoEscuro.addEventListener('click', ativarModoEscuro);
}

let tamanhoFonte = Number(localStorage.getItem('fonteSite')) || 100;
aplicarFonte(tamanhoFonte);

function aplicarFonte(porcentagem){
    const elementos = document.querySelectorAll(
        'p, span, a, li, button, input, label, h1, h2, h3, h4, h5, h6'
    );

    elementos.forEach(elemento => {
        const estilo = window.getComputedStyle(elemento);

        if (!elemento.dataset.fonteOriginal) {
            elemento.dataset.fonteOriginal = parseFloat(estilo.fontSize);
        }

        const tamanhoOriginal = Number(elemento.dataset.fonteOriginal);
        elemento.style.fontSize =`${tamanhoOriginal * (porcentagem / 100)}px`;
    });

    localStorage.setItem('fonteSite', porcentagem);
}

const btnAumentar = document.querySelector('#btnAumentarFonte');
const btnDiminuir = document.querySelector('#btnDiminuirFonte');

if(btnAumentar){
    btnAumentar.addEventListener('click', () => {
        if(tamanhoFonte < 150){
            tamanhoFonte += 10;
            aplicarFonte(tamanhoFonte);
        }
    });
}

if(btnDiminuir){
    btnDiminuir.addEventListener('click', () => {
        if(tamanhoFonte > 50){
            tamanhoFonte -= 10;
            aplicarFonte(tamanhoFonte);
        }
    });
}