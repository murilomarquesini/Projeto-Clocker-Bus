// Selecionando os elementos principais do HTML
const containerLista = document.querySelector('.lista-rotas');
const btnNovaRota = document.querySelector('.btn-nova-rota');


function obterRotas() {
    return JSON.parse(localStorage.getItem('rotasClockerBus')) || [];
}

function salvarRotas(rotas) {
    localStorage.setItem('rotasClockerBus', JSON.stringify(rotas));
}

function renderizarRotas() {
    if (!containerLista) return;

    const rotas = obterRotas();
    containerLista.innerHTML = ''; 

    if (rotas.length === 0) {
        containerLista.innerHTML = `
            <article class="card-vazio">
                <i class="fa-solid fa-bus" style="font-size: 2rem; color: #ccc; margin-bottom: 10px;"></i>
                <p>Nenhuma rota cadastrada no momento.</p>
            </article>
        `;
        return;
    }

    rotas.forEach(rota => {

        const statusAtual = rota.status || 'Em operação';
        const classeStatus = statusAtual === 'Pausada' ? 'pausado' : 'ativo';
        const qtdParadas = rota.pontos ? rota.pontos.length : 0;

        const botaoStatus = statusAtual === 'Pausada' 
            ? `<button class="btn-acao iniciar" onclick="alterarStatusRota(${rota.id}, 'Em operação')" title="Iniciar Rota"><i class="fa-solid fa-play"></i></button>`
            : `<button class="btn-acao pausar" onclick="alterarStatusRota(${rota.id}, 'Pausada')" title="Pausar Rota"><i class="fa-solid fa-pause"></i></button>`;

        const article = document.createElement('article');
        article.className = 'card-rota-motorista';
        
        article.innerHTML = `
            <div class="info-rota">
                <h3>${rota.linha}</h3>
                <p>
                    <i class="fa-solid fa-clock"></i>
                    Saída: ${rota.saida}
                </p>
                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${qtdParadas} paradas cadastradas
                </p>
                <span class="status ${classeStatus}">
                    ● ${statusAtual}
                </span>
            </div>

            <div class="acoes-rota">
                ${botaoStatus}
                <button class="btn-acao editar" onclick="editarRota(${rota.id})" title="Editar Rota">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-acao excluir" onclick="excluirRota(${rota.id})" title="Excluir Rota">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        
        containerLista.appendChild(article);
    });
}

window.excluirRota = function(id) {
    if(confirm("Tem certeza que deseja excluir permanentemente esta rota?")) {
        let rotas = obterRotas();
        rotas = rotas.filter(r => r.id !== id);
        salvarRotas(rotas);
        renderizarRotas(); 
    }
};

window.editarRota = function(id) {
    const rotas = obterRotas();
    const index = rotas.findIndex(r => r.id === id);
    
    if(index !== -1) {
        const novoNome = prompt("Edite o número e nome da linha:", rotas[index].linha);
        const novaSaida = prompt("Edite o horário de saída:", rotas[index].saida);
        
        if(novoNome && novoNome.trim() !== "") {
            rotas[index].linha = novoNome.trim();
            if(novaSaida) rotas[index].saida = novaSaida.trim();
            
            salvarRotas(rotas);
            renderizarRotas();
        }
    }
};
let idRastreamentoMotorista = null;

window.alterarStatusRota = function(id, novoStatus) {
    const rotas = obterRotas();
    const index = rotas.findIndex(r => r.id === id);
    
    if(index !== -1) {
        rotas[index].status = novoStatus;
        salvarRotas(rotas);
        renderizarRotas(); 

        if (novoStatus === 'Em operação') {
            alert("Viagem iniciada! Transmitindo seu GPS para os passageiros...");
            
            if ('geolocation' in navigator) {
                idRastreamentoMotorista = navigator.geolocation.watchPosition(function(posicao) {
                    const gpsData = {
                        lat: posicao.coords.latitude,
                        lng: posicao.coords.longitude
                    };
                    localStorage.setItem('gps_onibus_simulado', JSON.stringify(gpsData));
                }, function(erro) {
                    console.log("Erro no GPS do Motorista", erro);
                    alert("Por favor, ative a localização do seu dispositivo para iniciar a rota.");
                }, { enableHighAccuracy: true });
            }

        } else if (novoStatus === 'Pausada') {
            if (idRastreamentoMotorista) {
                navigator.geolocation.clearWatch(idRastreamentoMotorista);
                localStorage.removeItem('gps_onibus_simulado');
                alert("Viagem pausada. Transmissão de GPS interrompida.");
            }
        }
    }
};

if (btnNovaRota) {
    btnNovaRota.addEventListener('click', () => {
        const nomeDaLinha = prompt("Digite o número e destino da nova linha\n(Ex: 099 - Bairro Novo):");
        if (!nomeDaLinha || nomeDaLinha.trim() === "") return;

        const horarioSaida = prompt("Qual o horário previsto de saída?\n(Ex: 07:30)");

        let rotas = obterRotas();
        
        // Cria a nova rota com os dados essenciais
        const novaRota = {
            id: rotas.length > 0 ? Math.max(...rotas.map(r => r.id)) + 1 : 1,
            linha: nomeDaLinha.trim(),
            saida: horarioSaida || "--:--",
            previsao: "No horário",
            chegada: "--:--",
            pontos: [], 
            status: "Em operação",
            imagem: "https://via.placeholder.com/100x70?text=Novo"
        };

        rotas.push(novaRota);
        salvarRotas(rotas);
        renderizarRotas();
    });
}

renderizarRotas();