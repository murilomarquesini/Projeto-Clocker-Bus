//essa função é a mesma que tem em principaisRotas.js - exibe as informações da linha
function exibeInformacoesLinha(linha){
    const informacoesLinha = document.querySelector('#informacoesLinha');

    if(informacoesLinha){
        const conteudoLinha = document.querySelector('#conteudoLinha');
        conteudoLinha.innerHTML = '';

        if(linha){
            conteudoLinha.innerHTML = `
                <h6><strong><i class="fa-solid fa-bus"></i> ${linha.linha}</strong></h6>
                <br>
                <p><strong><i class="fa-solid fa-clock"></i> Previsão de saída:</strong> ${linha.saida}</p>
                <p><strong><i class="fa-solid fa-tower-broadcast"></i> Pontualidade:</strong> ${linha.status}</p>
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

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('informacoes')){
        event.preventDefault();

        const rotasSalvas = JSON.parse(localStorage.getItem('rotasClockerBus')) || [];
        const informacoesLinha = document.querySelector('#informacoesLinha');

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

function exibeHistorico(){
    const rotasSalvas = JSON.parse(localStorage.getItem('rotasClockerBus')) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {historicoLinhas: []};
    const listaLinhas = usuarioLogado.historicoLinhas || [];

    const historico = document.querySelector('#historico');

    if(!historico){
        return;
    }

    historico.innerHTML = '';

    if(listaLinhas.length > 0){
        listaLinhas.forEach(id => {
            let linha = rotasSalvas.find(l => l.id === id);

            if(linha){
                const card = document.createElement('div');
                card.className = 'card-rota';

                let corstatus = "var(--cor-texto-geral)";
                if(linha.status.includes("Atrasado")) corstatus = "var(--cor-alerta)"; 
                if(linha.status.includes("Chegando")) corstatus = "green"; 

                card.innerHTML = `
                    <div class="card-conteudo">
                        <h3><i class="fa-solid fa-bus"></i><strong> ${linha.linha}</strong></h3>

                        <div class="card-info">
                            <div>
                                <p><i class="fa-solid fa-clock"></i> Previsão de saída: <b>${linha.saida}</b></p>
                                <p><i class="fa-solid fa-tower-broadcast"></i> Previsão: <b style="color: ${corstatus};">${linha.status}</b></p>
                            </div>
                            <div>
                                <p><i class="fa-solid fa-users"></i> Lotação: <b>${linha.lotacao}</b></p>
                                <a class="card-link informacoes" data-rota-id="${linha.id}" href="#">Mais Informações</a>
                            </div>
                        </div>
                    </div>
                `;

                historico.appendChild(card);
            }
        });

    } else {
        historico.innerHTML = '<p class="info-aviso">Você ainda não acessou nenhuma linha!</p>';
    }
}

window.addEventListener('DOMContentLoaded', exibeHistorico);


// --------------------------------------------------------------------------------------

// PARA OS TESTES USANDO JEST
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        exibeInformacoesLinha,
        exibeHistorico
    };
}