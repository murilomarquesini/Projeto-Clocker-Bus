function sowModal(mensagem, callback) {
    const overlay = document.querySelector('#modal-feedback-overlay');
    const texto   = document.querySelector('#modal-feedback-msg');
    const botao   = document.querySelector('#modal-feedback-fechar');

    texto.textContent = mensagem;
    overlay.classList.add('ativo');

    const novo = botao.cloneNode(true);
    botao.parentNode.replaceChild(novo, botao);

    novo.addEventListener('click', function () {
        overlay.classList.remove('ativo');
        if (typeof callback === 'function') callback();
    });
}



//lista de itinerários simulados
const itinerariosValidos = [
    {
        id: 1,
        origem: 'Rua das Palmeiras',
        saida: '07:00',
        chegada: '07:40',
        destino: 'Avenida Brasil',
        margemAtraso: 15,
        status: 'Ativo',
        paradas: [
            'Rua do Comércio',
            'Praça Central'
        ]
    },
    {
        id: 2,
        origem: 'Avenida Paulista',
        saida: '08:10',
        chegada: '08:35',
        destino: 'Rua Augusta',
        margemAtraso: 5,
        status: 'Ativo',
        paradas: [
            'Rua Haddock Lobo'
        ]
    },
    {
        id: 3,
        origem: 'Rua XV de Novembro',
        saida: '09:00',
        chegada: '09:50',
        destino: 'Avenida Independência',
        margemAtraso: 20,
        status: 'Ativo',
        paradas: [
            'Rua Sete de Setembro',
            'Praça Central',
            'Praça da Matriz'
        ]
    },
    {
        id: 4,
        origem: 'Rua das Flores',
        saida: '10:15',
        chegada: '11:00',
        destino: 'Rua dos Andradas',
        margemAtraso: 25,
        status: 'Ativo',
        paradas: [
            'Rua das Nações',
            'Avenida Brasil'
        ]
    },
    {
        id: 5,
        origem: 'Rua Santa Luzia',
        saida: '11:20',
        chegada: '12:00',
        destino: 'Avenida Getúlio Vargas',
        margemAtraso: 10,
        status: 'Ativo',
        paradas: []
    },
    {
        id: 6,
        origem: 'Avenida Rio Branco',
        saida: '13:00',
        chegada: '14:10',
        destino: 'Rua São João',
        margemAtraso: 30,
        status: 'Ativo',
        paradas: [
            'Rua da Consolação',
            'Largo do Arouche',
            'Rua da Liberdade'
        ]
    },
    {
        id: 7,
        origem: 'Rua das Acácias',
        saida: '15:30',
        chegada: '16:20',
        destino: 'Avenida dos Estados',
        margemAtraso: 10,
        status: 'Ativo',
        paradas: [
            'Rua dos Lírios',
            'Praça Central'
        ]
    },
    {
        id: 8,
        origem: 'Avenida Santos Dumont',
        saida: '16:50',
        chegada: '18:00',
        destino: 'Rua Marechal Deodoro',
        margemAtraso: 20,
        status: 'Ativo',
        paradas: [
            'Rua Barão do Rio Branco',
            'Terminal',
            'Praça Verde',
            'Rua das Oliveiras'
        ]
    },
    {
        id: 9,
        origem: 'Rua das Oliveiras',
        saida: '18:20',
        chegada: '19:00',
        destino: 'Avenida Industrial',
        margemAtraso: 5,
        status: 'Ativo',
        paradas: [
            'Rua do Progresso',
            'Praça das Indústrias'
        ]
    },
    {
        id: 10,
        origem: 'Avenida Presidente Vargas',
        saida: '19:40',
        chegada: '20:30',
        destino: 'Rua Bela Vista',
        margemAtraso: 15,
        status: 'Ativo',
        paradas: [
            'Rua da Paz',
            'Terminal'
        ]
    }
];



//função para exibir os itinerários válidos no modal
function exibirListaItinerarios(){
    const lista = document.querySelector("#cardsModal");
    lista.innerHTML = "";


    itinerariosValidos.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-modal";

        card.innerHTML = `
            <div class="info">
                <p class="trajeto"><strong>${item.origem} <i class="fa-solid fa-arrow-right"></i> ${item.destino}</strong></p>
                <p><strong><i class="fa-solid fa-clock"></i> Horário de saída: ${item.saida}</strong></p>
                <p><strong> Tolerância: ${item.margemAtraso} minutos</strong></p>
            </div>
            <button type="button" class="btn-selecionar-modal select" onclick="selecionarItinerario(this, ${item.id})">
                <i class="fa-solid fa-circle-plus"></i>
                <span>Selecionar</span>
            </button>
        `;

        lista.appendChild(card);
    });
}



const indexManha = 0;
const indexTarde = 1;
const indexNoite = 2;


const colunaManha = document.querySelector('#manha');
const colunaTarde = document.querySelector('#tarde');
const colunaNoite = document.querySelector('#noite');

let colunaAtual = null;


const colunaTurno = document.querySelectorAll('.novoItinerario');

if(colunaTurno.length >= 3){
    colunaTurno[indexManha].addEventListener('click', (e) =>{
        e.preventDefault();

        colunaAtual = colunaManha;
        modalItinerario();
    });

    colunaTurno[indexTarde].addEventListener('click', (e) => {
        e.preventDefault();

        colunaAtual = colunaTarde;
        modalItinerario();
    });

    colunaTurno[indexNoite].addEventListener('click', (e) => {
        e.preventDefault();

        colunaAtual = colunaNoite;
        modalItinerario();
    });
}



//abre o modal para adicionar um novo itinerário
function modalItinerario(){
    exibirListaItinerarios();

    const modalItinerario = document.querySelector('#modalItinerario');

    if(modalItinerario){
        const modalI = new bootstrap.Modal(modalItinerario);
        modalI.show();
    }
}



//adiciona o novo itinerário na coluna correspondente 
function addCardI(coluna, itinerario){
    const novoCard = document.createElement('div');
    novoCard.className = 'cardSalvo';

    novoCard.innerHTML = `
        <div class="enderecos">
            <i class="fa-solid fa-location-dot"></i>
            <strong>${itinerario.origem} - ${itinerario.destino}</strong>
        </div>
        <hr>
        <p><strong> Status:</strong> ${itinerario.status}</p>
        <p><strong><i class="fa-solid fa-clock"></i>  Saída:</strong> ${itinerario.saida}</p>
        <p><strong><i class="fa-solid fa-clock"></i>  Chegada prevista:</strong> ${itinerario.chegada}</p>
        <p><strong><i class="fa-solid fa-clock-rotate-left"></i> Tolerância:</strong> ${itinerario.margemAtraso} minutos</p>
        <div class="botoesI">
            <button class='buscarPontos' data-itinerario-id='${itinerario.id}'>Buscar</button>
            <button class='excluirItinerario' data-itinerario-id='${itinerario.id}'>Exluir</button>
        </div>
    `;

    coluna.appendChild(novoCard);
    //alert('Itinerário salvo com sucesso!');
}



//valida o período do itinerário
function periodo(horario, colunaAtual){
    const hora = parseInt(horario.split(':')[0]);

    if(colunaAtual === colunaManha){
        return hora >= 5 && hora < 12;
    }
    
    if(colunaAtual === colunaTarde){
        return hora >= 12 && hora < 18;
    }
    
    if(colunaAtual === colunaNoite){
        return hora >= 18 && hora < 23;
    }

    return false;
}



//relaciona os itinerarios ao usuário logado
function exibeItinerarios(){
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if(usuarioLogado){        
        colunaManha.innerHTML = '';
        colunaTarde.innerHTML = '';
        colunaNoite.innerHTML = '';

        let salvos = usuarioLogado.itinerariosSalvos;

        salvos.forEach(id => {
            const itinerario = itinerariosValidos.find(i => i.id === id);
            if(!itinerario) return;

            if(periodo(itinerario.saida, colunaManha)){
                addCardI(colunaManha, itinerario);

            } else if(periodo(itinerario.saida, colunaTarde)){
                addCardI(colunaTarde, itinerario);
            
            } else {
                addCardI(colunaNoite, itinerario);
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', exibeItinerarios);



//para selecionar um itinerário
function selecionarItinerario(botao, id){
    const itensModal = document.querySelectorAll(".item-modal");
    itensModal.forEach(card => card.classList.remove('selecionado'));
    
    const selecionado = botao.closest('.item-modal');
    selecionado.classList.add('selecionado');

    const modalItinerario = document.querySelector('#modalItinerario');
    modalItinerario.dataset.itinerarioSelecionado = id;
}



//salva e exibe o itinerário na tabela
const salvarItinerario = document.querySelector('#salvarItinerario');

if(salvarItinerario){
    salvarItinerario.addEventListener('click', (e) => {
        e.preventDefault();

        const modal = document.querySelector('#modalItinerario');

        const idSelecionado = Number(modal.dataset.itinerarioSelecionado);
        if(!idSelecionado){
            alert('Selecione um itinerário');
            return;
        }


        const itinerario = itinerariosValidos.find(i => i.id === idSelecionado);
        if(!itinerario){
            alert('Itinerário inválido');
            return;
        }


        if(!periodo(itinerario.saida, colunaAtual)){
            alert('O horário do itinerário não corresponde ao período selecionado');
            return;
        }


        const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {itinerariosSalvos: []};

        let index = usuariosCadastrados.findIndex(usuario => usuario.email === usuarioLogado.email);
        
        //o site pode travar sem essa validação
        if(index === -1){
            return;
        }


        
        if(!usuarioLogado.itinerariosSalvos.includes(itinerario.id)){
            usuarioLogado.itinerariosSalvos.push(itinerario.id);
            usuariosCadastrados[index].itinerariosSalvos.push(itinerario.id);

            localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

            addCardI(colunaAtual, itinerario);
        
        } else {
            alert('Itinerário já salvo');
        }


        delete modal.dataset.itinerarioSelecionado;
    });
}



//com o itinerário salvo, o usuário tem a opção de buscar os pontos de parada
function exibePontos(paradas){
    if(pontosParada){
        const listaPontos = document.querySelector('#listaPontos');
        listaPontos.innerHTML = '';

        if(paradas.length > 0){
            paradas.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = p;

                listaPontos.appendChild(li);
            });
        
        } else {
            listaPontos.innerHTML = 'Não há pontos de parada nesse itinerário';
        }
    }
}


const pontosParada = document.querySelector('#pontosParada');

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('buscarPontos')){
        e.preventDefault();

        const botaoBusca = e.target;
        const idItinerario = Number(botaoBusca.dataset.itinerarioId);
        
        let itinerario = itinerariosValidos.find(i => i.id == idItinerario);
        
        if(itinerario){
            exibePontos(itinerario.paradas);

            const modalP = new bootstrap.Modal(pontosParada);
            modalP.show();
        }
    }
});


//o usuário também deve ter a opção de excluir o itinerário
document.addEventListener('click', (event) => {
    if(event.target.classList.contains('excluirItinerario')){
        event.preventDefault();

        const botaoExcluir = event.target;
        const id = Number(botaoExcluir.dataset.itinerarioId);
        
        let itinerario = itinerariosValidos.find(i => i.id == id);

        if(itinerario){
            const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {itinerariosSalvos: []};

            let index = usuariosCadastrados.findIndex(usuario => usuario.email === usuarioLogado.email);

            if(index === -1) return;

            if(usuarioLogado.itinerariosSalvos.includes(itinerario.id)){

                usuarioLogado.itinerariosSalvos = usuarioLogado.itinerariosSalvos.filter(i => i !== itinerario.id);
                usuariosCadastrados[index].itinerariosSalvos = usuariosCadastrados[index].itinerariosSalvos.filter(i => i !== itinerario.id);
                
                localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

                alert('Itinerário excluido com sucesso!');
                exibeItinerarios();
            }
        }
    }
});

//assim que o usuário clica no botão de excluir, o itinerário é excluido
//o ideal é que antes apareça uma mensagem de confirmação, perguntando se ele realmente deseja excluir o itinerário


// --------------------------------------------------------------------------------------

// PARA OS TESTES USANDO JEST
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        periodo,
        selecionarItinerario
    };
}