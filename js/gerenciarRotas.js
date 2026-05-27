function showModal(mensagem, callback) {
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
                <hr>
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
            </div>
        `;
        
        containerLista.appendChild(article);
    });
}



window.editarRota = function(id) {
    const rotas = obterRotas();
    const rota = rotas.find(r => r.id === id);
    
    if(rota) {
        document.querySelector('#linha').value = rota.linha;
        document.querySelector('#horario').value = rota.saida !== "--:--" ? rota.saida : "";
        
        const inputIdOculto = document.querySelector('#editarId');
        if (inputIdOculto) {
            inputIdOculto.value = rota.id;
        }

        const editarRotaModal = document.querySelector('#editarRota');
        if(editarRotaModal){
            const modalR = new bootstrap.Modal(editarRotaModal);
            modalR.show();
        }   
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const btnSalvar = document.querySelector('#salvarInfoRota');

    if(btnSalvar){
        btnSalvar.addEventListener('click', () => {
            const inputIdOculto = document.querySelector('#editarId');
            
            if (!inputIdOculto || !inputIdOculto.value) {
                console.error("ID da rota não encontrado no formulário.");
                return;
            }

            const id = parseInt(inputIdOculto.value);
            const novaLinha = document.querySelector('#linha').value.trim();
            const novoHorario = document.querySelector('#horario').value;

            if (novaLinha.length < 3) {
                alert("Digite um nome de linha válido.");
                return;
            }

            const rotas = obterRotas();
            const index = rotas.findIndex(r => r.id === id);

            if(index !== -1){
                rotas[index].linha = novaLinha;
                rotas[index].saida = novoHorario ? novoHorario.trim() : "--:--";

                salvarRotas(rotas);
                renderizarRotas();

                const elementoModal = document.querySelector('#editarRota');
                const modalInstance = bootstrap.Modal.getInstance(elementoModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            } 
        });
    }
});




let idRastreamentoMotorista = null;
let socketMotorista = null;

window.alterarStatusRota = function(id, novoStatus) {
    const rotas = obterRotas();
    const index = rotas.findIndex(r => r.id === id);
    
    if(index !== -1) {
        rotas[index].status = novoStatus;
        salvarRotas(rotas);
        renderizarRotas(); 

        if (novoStatus === 'Em operação') {
            alert("Viagem iniciada! Transmitindo seu GPS para os passageiros...");
            
            if (!socketMotorista) {
                socketMotorista = io('https://projeto-clocker-bus.onrender.com'); 
            }
            
            if ('geolocation' in navigator) {
                idRastreamentoMotorista = navigator.geolocation.watchPosition(function(posicao) {
                    const gpsData = {
                        linha: rotas[index].linha,
                        lat: posicao.coords.latitude,
                        lng: posicao.coords.longitude
                    };

                   
                    socketMotorista.emit('enviar_gps', gpsData);
        
                }, function(erro) {
                    console.log("Erro no GPS do Motorista", erro);
                    alert("Por favor, ative a localização do seu dispositivo para iniciar a rota.");
                }, { enableHighAccuracy: true });
            }

        } else if (novoStatus === 'Pausada') {
            if (idRastreamentoMotorista) {
                navigator.geolocation.clearWatch(idRastreamentoMotorista);
                alert("Viagem pausada. Transmissão de GPS interrompida.");
            }
        }
    }
};


renderizarRotas();