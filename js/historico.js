//essa função é a mesma que tem em principaisRotas.js - exibe as informações da linha
function exibeInformacoesLinha(linha){
    if(informacoesLinha){
        const conteudoLinha = document.querySelector('#conteudoLinha');
        conteudoLinha.innerHTML = '';

        if(linha){
            conteudoLinha.innerHTML = `
                <p><strong>Linha:</strong> ${linha.linha}</p>
                <p><strong>Previsão do horário de saída:</strong> ${linha.saida}</p>
                <p><strong>Previsão do horário de chegada:</strong> ${linha.chegada}</p>
                <p><strong>Pontualidade:</strong> ${linha.previsao}</p>
                <p><strong>Rota (pontos de parada):</strong></p>
            `;

            const ul = document.createElement('ul');
            linha.pontos.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = p;

                ul.appendChild(li);
            });

            conteudoLinha.appendChild(ul);
        } 
    }
}


//e quando o usuário clica no 'Mais Informações' de uma linha, a função é chamada e o modal é aberto
const rotasSalvas = JSON.parse(localStorage.getItem('rotasClockerBus')) || [];
const informacoesLinha = document.querySelector('#informacoesLinha');

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('informacoes')){
        event.preventDefault();

        const info = event.target;
        const idRota = Number(info.dataset.rotaId);

        let linha = rotasSalvas.find(r => r.id == idRota);
        
        if(linha){
            exibeInformacoesLinha(linha);

            const modalLinha = new bootstrap.Modal(informacoesLinha);
            modalLinha.show();
        }
    }
});


//o histórico do usuário logado é puxado e os cards das linhas são criados e exibidos
const historico = document.querySelector('#historico');

function exibeHistorico(){
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {historicoLinhas: []};
    const listaLinhas = usuarioLogado.historicoLinhas || [];

    if(!historico){
        return;
    }

    historico.innerHTML = '';

    if(listaLinhas.length > 0){
        listaLinhas.forEach(id => {
            let linha = rotasSalvas.find(l => l.id === id);

            if(linha){
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <img src="" class="card-img" alt="Mapa da rota">
                    <div class="card-linha">
                        <p>Número da linha: <b>${linha.linha}</b></p>
                        <p>Pontualidade: <b>${linha.previsao}</b></p>
                        <div class="opcoes">
                            <a class="informacoes" data-rota-id="${linha.id}" href="#">Mais Informações</a>
                            <strong><a class="salvarLinha" data-rota-id="${linha.id}" href="#">Salvar</a></strong>
                        </div>
                    </div>
                `;

                historico.appendChild(card);
            }
        });

    } else {
        historico.innerHTML = '<p>Você ainda não acessou nenhuma linha!</p>';
    }
}

window.addEventListener('DOMContentLoaded', exibeHistorico);