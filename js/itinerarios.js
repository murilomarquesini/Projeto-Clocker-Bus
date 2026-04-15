//lista de itinerários simulados
const itinerariosValidos = [
    {
        id: 1,
        origem: 'Rua das Palmeiras',
        saida: '07:00',
        chegada: '07:40',
        destino: 'Avenida Brasil, 950',
        paradas: [
            'Rua do Comércio',
            'Praça Central'
        ]
    },
    {
        id: 2,
        origem: 'Avenida Paulista, 1500',
        saida: '08:10',
        chegada: '08:35',
        destino: 'Rua Augusta, 300',
        paradas: [
            'Rua Haddock Lobo, 200'
        ]
    },
    {
        id: 3,
        origem: 'Rua XV de Novembro, 78',
        saida: '09:00',
        chegada: '09:50',
        destino: 'Avenida Independência, 450',
        paradas: [
            'Rua Sete de Setembro, 120',
            'Praça Central',
            'Praça da Matriz'
        ]
    },
    {
        id: 4,
        origem: 'Rua das Flores, 95',
        saida: '10:15',
        chegada: '11:00',
        destino: 'Rua dos Andradas, 40',
        paradas: [
            'Rua das Nações, 873',
            'Avenida Brasil, 890'
        ]
    },
    {
        id: 5,
        origem: 'Rua Santa Luzia, 310',
        saida: '11:20',
        chegada: '12:00',
        destino: 'Avenida Getúlio Vargas, 780',
        paradas: []
    },
    {
        id: 6,
        origem: 'Avenida Rio Branco, 500',
        saida: '13:00',
        chegada: '14:10',
        destino: 'Rua São João, 210',
        paradas: [
            'Rua da Consolação, 35',
            'Largo do Arouche',
            'Rua da Liberdade, 407'
        ]
    },
    {
        id: 7,
        origem: 'Rua das Acácias, 99',
        saida: '15:30',
        chegada: '16:20',
        destino: 'Avenida dos Estados, 1800',
        paradas: [
            'Rua dos Lírios, 456',
            'Praça Central'
        ]
    },
    {
        id: 8,
        origem: 'Avenida Santos Dumont, 670',
        saida: '16:50',
        chegada: '18:00',
        destino: 'Rua Marechal Deodoro, 120',
        paradas: [
            'Rua Barão do Rio Branco',
            'Terminal',
            'Praça Verde',
            'Rua das Oliveiras, 65'
        ]
    },
    {
        id: 9,
        origem: 'Rua das Oliveiras, 45',
        saida: '18:20',
        chegada: '19:00',
        destino: 'Avenida Industrial, 981',
        paradas: [
            'Rua do Progresso, 150',
            'Praça das Indústrias'
        ]
    },
    {
        id: 10,
        origem: 'Avenida Presidente Vargas, 100',
        saida: '19:40',
        chegada: '20:30',
        destino: 'Rua Bela Vista, 210',
        paradas: [
            'Rua da Paz, 02',
            'Terminal'
        ]
    }
];

//com a implementação da API, podemos usar endereços reais (eu acho)


//indice de cada tabela
const indexManha = 0;
const indexTarde = 1;
const indexNoite = 2;


//abre o modal para adicionar as informações de um novo itinerário
function modalItinerario(){
    const modalItinerario = document.querySelector('#modalItinerario');

    if(modalItinerario){
        const modalI = new bootstrap.Modal(modalItinerario);
        modalI.show();
    }
}


//verifica a existência do itinerário
function verificaExistencia(origemInput, destinoInput){
    return itinerariosValidos.find(itinerario => 
        itinerario.origem.toLowerCase().trim() === origemInput.toLowerCase().trim() &&
        itinerario.destino.toLowerCase().trim() === destinoInput.toLowerCase().trim()
    ) || null;
}


//valida o período do itinerário
function periodo(horario, tabelaAtual){
    const hora = parseInt(horario.split(':')[0]);

    if(tabelaAtual === tabelaManha){
        return hora >= 5 && hora < 12;
    }
    
    if(tabelaAtual === tabelaTarde){
        return hora >= 12 && hora < 18;
    }
    
    if(tabelaAtual === tabelaNoite){
        return hora >= 18 && hora < 23;
    }

    return false;
}


//adiciona o novo itinerário na tabela correspondente 
function addLinha(tabela, itinerario){
    const linhas = tabela.querySelectorAll('tr.linha');

    for(const linha of linhas){
        if(linha.children[0].textContent === itinerario.origem && 
           linha.children[1].textContent === itinerario.saida &&
           linha.children[2].textContent === itinerario.chegada &&
           linha.children[3].textContent === itinerario.destino){

            return;
        }
    }

    const linha = document.createElement('tr');
    linha.className = 'linha';

    linha.innerHTML = `
        <td>${itinerario.origem}</td>
        <td>${itinerario.saida}</td>
        <td>${itinerario.chegada}</td>
        <td>${itinerario.destino}</td>
        <td><button class='buscarPontos' data-itinerario-id='${itinerario.id}'>Buscar</button></td>
        <td><button class='excluirItinerario' data-itinerario-id='${itinerario.id}'>Exluir</button></td>
    `;

    tabela.appendChild(linha);
    //alert('Itinerário salvo com sucesso!');
}


const tabelaManha = document.querySelector('#manha');
const tabelaTarde = document.querySelector('#tarde');
const tabelaNoite = document.querySelector('#noite');

let tabelaAtual = null;

const addItinerario = document.querySelectorAll('.novoItinerario');

if(addItinerario.length >= 3){
    addItinerario[indexManha].addEventListener('click', (e) =>{
        e.preventDefault();

        tabelaAtual = tabelaManha;
        modalItinerario();
    });

    addItinerario[indexTarde].addEventListener('click', (e) => {
        e.preventDefault();

        tabelaAtual = tabelaTarde;
        modalItinerario();
    });

    addItinerario[indexNoite].addEventListener('click', (e) => {
        e.preventDefault();

        tabelaAtual = tabelaNoite;
        modalItinerario();
    });
}


//relaciona os itinerarios ao usuário logado
function exibeItinerarios(){
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if(usuarioLogado){        
        tabelaManha.innerHTML = '';
        tabelaTarde.innerHTML = '';
        tabelaNoite.innerHTML = '';

        let salvos = usuarioLogado.itinerariosSalvos;

        salvos.forEach(id => {
            const itinerario = itinerariosValidos.find(i => i.id === id);
            if(!itinerario) return;

            if(periodo(itinerario.saida, tabelaManha)){
                addLinha(tabelaManha, itinerario);

            } else if(periodo(itinerario.saida, tabelaTarde)){
                addLinha(tabelaTarde, itinerario);
            
            } else {
                addLinha(tabelaNoite, itinerario);
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', exibeItinerarios);


//salva e exibe o itinerário na tabela
const salvarItinerario = document.querySelector('#salvarItinerario');

if(salvarItinerario){
    salvarItinerario.addEventListener('click', (e) => {
        e.preventDefault();

        const origemInput = document.querySelector('#endSaida').value.trim();
        const destinoInput = document.querySelector('#endChegada').value.trim();

        if(!origemInput || !destinoInput){
            alert('Preencha todos os campos');
            return;
        } 
        
        const itinerario = verificaExistencia(origemInput, destinoInput);

        if(!itinerario){
            alert('O itinerário informado não existe');
            document.querySelector('#formItinerarios').reset();
            return;
        }

        if(!periodo(itinerario.saida, tabelaAtual)){
            alert('O horário do itinerário não corresponde ao período da tabela');
            document.querySelector('#formItinerarios').reset();
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
        }
    

        if(tabelaAtual){
            addLinha(tabelaAtual, itinerario);
        }
        document.querySelector('#formItinerarios').reset();
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