// localStorage.removeItem('rotasClockerBus');

function obterRotas() {
    let rotaSalva = JSON.parse(localStorage.getItem('rotasClockerBus'));
    
    if (!rotaSalva || rotaSalva.length === 0) {
        rotaSalva = [
            { id: 1, 
                linha: "042 - Centro / Shopping", 
                saida: "14:00", 
                status: "No horário", 
                lotacao: "Baixa",
                pontos: ["Terminal Central", "Avenida Brasil, 200", "Campus UNESP", "Shopping Plaza"],  
            },
            { id: 2, 
                linha: "015 - Terminal / Bairro da Liberdade", 
                saida: "14:15", 
                status: "Atrasado 5 min", 
                lotacao: "Alta",
                pontos: ["Centro", "Avenida Brasil, 890", "Largo da Paz", "Bairro da Liberdade"],  
            },
            { id: 3, 
                linha: "102 - UPA / Centro", 
                saida: "14:10",
                status: "Chegando", 
                lotacao: "Baixa", 
                pontos: ["UPA Norte", "Rua 15 de Novembro", "Praça da Matriz", "Centro", "UNIARA"], 
            },
            { id: 4, 
                linha: "088 - Campus Univ. / Terminal", 
                saida: "14:30", 
                status: "No horário", 
                lotacao: "Moderada",
                pontos: ["UNIP", "Av. dos Estudantes", "IFSP", "Terminal Central"], 
            },
            { id: 5, 
                linha: "055 - Zona Sul / Distrito Ind.", 
                saida: "14:05", 
                status: "Atrasado 10 min", 
                lotacao: "Moderada", 
                pontos: ["Avenida Sul", "Fábrica de Tecidos", "Distrito Industrial"], 
            },
            { id: 6, 
                linha: "021 - Praça Central / Aeroporto", 
                saida: "14:20", 
                status: "No horário", 
                lotacao: "Baixa",
                pontos: ["Praça Central", "FATEC", "Avenida das Nações", "Terminal de Cargas", "Aeroporto"], 
            },
            { id: 7, 
                linha: "074 - Terminal Leste / Mercado", 
                saida: "14:12",
                status: "Chegando", 
                lotacao: "Baixa", 
                pontos: ["Terminal Leste", "UNIARA", "Rua do Comércio", "Mercado Municipal"], 
            },
            { id: 8, 
                linha: "033 - Bairro Esperança / Centro", 
                saida: "14:40",
                status: "No horário", 
                lotacao: "Alta",
                pontos: ["Bairro Esperança", "Campus UNESP", "Instituto de Química - UNESP", "Rua das Palmeiras", "Avenida da Paz", "Centro"], 
            },
            { id: 9, 
                linha: "099 - Via Expressa / Rodoviária", 
                saida: "14:25", 
                status: "Atrasado 2 min", 
                lotacao: "Baixa",
                pontos: ["Trevo da Via Expressa", "Supermercado Atacadão", "Rodoviária"], 
            },
            { id: 10, 
                linha: "010 - Circular Central", 
                saida: "14:00", 
                status: "No horário", 
                lotacao: "Moderada",
                pontos: ["Terminal Central", "IFSP", "Rua 1", "Rua 2", "Rua 3", "Rua 4"], 
            }
        ];
        localStorage.setItem('rotasClockerBus', JSON.stringify(rotaSalva));
    }
    return rotaSalva;
}

let mostrarTodasAsRotas = false;

function pontosUni(rota, filtroUni){
    if(!filtroUni){
        return true;
    }

    const mapeamentoOpcoes = {
        "IFSP": ["ifsp", "instituto federal"],
        "UNESP": ["unesp", "campus unesp", "instituto de química"],
        "UNIARA": ["uniara", "universidade de araraquara"],
        "UNIP": ["unip", "universidade paulista"],
        "FATEC": ["fatec", "faculdade de tecnologia"]
    };

    const palavrasChave = mapeamentoOpcoes[filtroUni] || [];
    return rota.pontos.some(ponto => palavrasChave.some(p => ponto.toLowerCase().includes(p)));
}

function mensagemFiltro(uniSelecionada){
    const respostaFiltro = document.querySelector('#respostaFiltro');

    if(respostaFiltro){
        if(uniSelecionada){
            respostaFiltro.innerHTML = `Opção do filtro selecionada: <b>${uniSelecionada}</b>`;
        } else {
            respostaFiltro.innerHTML = "Nenhum filtro está sendo aplicado...";
        }
    }
}

function aplicarInformacoes(){
    const inputPill = document.querySelector('.input-pill');
    const textoBusca = inputPill ? inputPill.value : "";
    const uniSelecionada = document.querySelector('input[name="uni"]:checked')?.value;

    mensagemFiltro(uniSelecionada);

    const rotas = obterRotas(); 

    const rotasFiltradas = rotas.filter(rota => {
        const texto = (rota.linha + " " + rota.pontos.join(" ")).toLowerCase();
        const matchTexto = (textoBusca === "" || texto.includes(textoBusca.toLowerCase().trim()));
        const matchUni = pontosUni(rota, uniSelecionada);
        return matchTexto && matchUni;
    });

    carregarRotas(rotasFiltradas);
}


function carregarRotas(rotasFiltradas = null) {
    const containerRotas = document.getElementById('container-rotas');
    if(!containerRotas) return;

    const rotas = rotasFiltradas || obterRotas();
    containerRotas.innerHTML = '';

    if (rotas.length === 0) {
        containerRotas.innerHTML = `
            <p style="text-align: center; color: var(--cor-texto-geral); padding: 20px;">
                <b>Nenhuma rota encontrada :(</b><br>
                Tente buscar por "Centro", "Terminal" ou "Shopping".<br>
                Ou selecione uma das opções do filtro.
            </p>
        `;
        return;
    }

    const estaPesquisando = rotasFiltradas !== null;
    let rotasExibidas = rotas;

    if (!estaPesquisando && !mostrarTodasAsRotas) {
        rotasExibidas = rotas.slice(0, 4);
    }

    rotasExibidas.forEach(function(rota) {
        const card = document.createElement('div');
        card.className = 'card-rota';

        let corstatus = "var(--cor-texto-geral)";
        if(rota.status.includes("Atrasado")) corstatus = "var(--cor-alerta)"; 
        if(rota.status.includes("Chegando")) corstatus = "green"; 

        card.innerHTML = `
            <img src="${rota.imagem || 'https://via.placeholder.com/100x70?text=Mapa'}" class="card-img" alt="Mapa da rota">
            
            <div class="card-conteudo">
                <h3><i class="fa-solid fa-bus"></i><strong> ${rota.linha}</strong></h3>

                <div class="card-info">
                    <div>
                        <p><i class="fa-solid fa-clock"></i> Previsão de saída: <b>${rota.saida}</b></p>
                        <p><i class="fa-solid fa-tower-broadcast"></i> Previsão: <b style="color: ${corstatus};">${rota.status}</b></p>
                    </div>
                    <div>
                        <p><i class="fa-solid fa-users"></i> Lotação: <b>${rota.lotacao}</b></p>
                        <a class="card-link" data-rota-id="${rota.id}" href="#">Mais Informações</a>
                    </div>
                </div>
            </div>
        `;
        
        containerRotas.appendChild(card);
    });

    if (!estaPesquisando && !mostrarTodasAsRotas && rotas.length > 4) {
        const btnVerMais = document.createElement('button');
        btnVerMais.className = 'botaoIndex'; 
        btnVerMais.style.margin = '20px auto';
        btnVerMais.style.display = 'block';
        btnVerMais.innerText = 'Ver Todas as Rotas';

        btnVerMais.addEventListener('click', () => {
            mostrarTodasAsRotas = true;
            carregarRotas(); 
        });

        containerRotas.appendChild(btnVerMais);
    }

    if (!estaPesquisando && mostrarTodasAsRotas && rotas.length > 4) {
        const btnVerMenos = document.createElement('button');
        btnVerMenos.className = 'botaoIndex';
        btnVerMenos.style.margin = '20px auto';
        btnVerMenos.style.display = 'block';
        btnVerMenos.style.backgroundColor = '#ccc';
        btnVerMenos.innerText = 'Mostrar Menos Rotas';

        btnVerMenos.addEventListener('click', () => {
            mostrarTodasAsRotas = false;
            carregarRotas();
        });

        containerRotas.appendChild(btnVerMenos);
    }
}

function exibeInformacoesLinha(linha){
    const conteudoLinha = document.querySelector('#conteudoLinha');
    if (!conteudoLinha) return;
    
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
// exibe as fdaculdades no mapa
function exibeModalFaculdade(nomeDaUni) {
    const titulo = document.getElementById('tituloModalFaculdade');
    const conteudo = document.getElementById('conteudoModalFaculdade');
    const modalElement = document.getElementById('modalFaculdade');
    
    if (!titulo || !conteudo || !modalElement) 
        return;

    titulo.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> Rotas para: <b>${nomeDaUni}</b>`;
    conteudo.innerHTML = '';

    const rotas = obterRotas();
    
    const rotasDestaUni = rotas.filter(rota => pontosUni(rota, nomeDaUni));

        if (rotasDestaUni.length === 0) {
            conteudo.innerHTML = `<p style="text-align: center; margin-top: 20px;">Nenhuma rota passando por aqui no momento.</p>`;
        } else {
        const lista = document.createElement('div');
            lista.className = 'list-group'; 
        
            rotasDestaUni.forEach(rota => {
                let corstatus = rota.status.includes("Atrasado") ? "var(--cor-alerta)" : (rota.status.includes("Chegando") ? "green" : "var(--cor-texto-geral)");
            
            // Cria um cardzinho para cada ônibus
                lista.innerHTML += `
                    <div class="list-group-item mb-2" style="border-radius: 8px; border: 1px solid #ccc;">
                        <div style="display: flex; justify-content: space-between; width: 100%;">
                            <h6 style="margin: 0;"><b><i class="fa-solid fa-bus"></i> ${rota.linha}</b></h6>
                            <small style="color: ${corstatus};"><b>${rota.status}</b></small>
                        </div>
                        <small><i class="fa-solid fa-clock"></i> Saída: ${rota.saida}</small>
                    </div>
                `;
            });
        conteudo.appendChild(lista);
    }

    // Abre o modal na tela
    const modalInstancia = new bootstrap.Modal(modalElement);
    modalInstancia.show();
}


function modalFiltros(){
    const modalFiltro = document.querySelector('#modalFiltrar');
    if(modalFiltro && typeof bootstrap !== 'undefined'){
        const modalF = new bootstrap.Modal(modalFiltro);
        modalF.show();
    }
}

const botaoFiltro = document.querySelector(".button-filtrar");
if(botaoFiltro){
    botaoFiltro.addEventListener('click', (e) => {
        e.preventDefault();
        modalFiltros();
    });
}

function limparFiltro(){
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    
    const inputTexto = document.querySelector('.input-pill');
    if (inputTexto) inputTexto.value = "";
    
    mensagemFiltro(null); 
    carregarRotas();
}

function atualizaHistorico(idRota){
    const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {historicoLinhas: []};

    if(usuarioLogado && usuarioLogado.email){
        let index = usuariosCadastrados.findIndex(u => u.email === usuarioLogado.email);
        
        if(index !== -1){
            if(!usuarioLogado.historicoLinhas) usuarioLogado.historicoLinhas = [];
            
            if(usuarioLogado.historicoLinhas.includes(idRota)){
                usuarioLogado.historicoLinhas = usuarioLogado.historicoLinhas.filter(id => id !== idRota);
                usuariosCadastrados[index].historicoLinhas = usuariosCadastrados[index].historicoLinhas.filter(i => i !== idRota);
            }

            usuarioLogado.historicoLinhas.unshift(idRota);
            usuariosCadastrados[index].historicoLinhas.unshift(idRota);

            localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
        }
    }
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('card-link')){
        e.preventDefault();

        const info = e.target;
        const idRota = Number(info.dataset.rotaId);
        const rotaSalva = obterRotas();

        let linha = rotaSalva.find(r => r.id == idRota);
        
        if(linha){
            exibeInformacoesLinha(linha);
            const informacoesLinha = document.querySelector('#informacoesLinha');
            if(informacoesLinha && typeof bootstrap !== 'undefined'){
                const modalLinha = new bootstrap.Modal(informacoesLinha);
                modalLinha.show();
            }
        }

        atualizaHistorico(idRota);
    }
});

const btnBusca = document.querySelector('.button-buscar');
    if(btnBusca){
     btnBusca.addEventListener('click', (e) => {
            e.preventDefault();
            aplicarInformacoes();
        });
    }

const btnSalvarFiltros = document.querySelector('#salvarFiltro');
    if(btnSalvarFiltros){
        btnSalvarFiltros.addEventListener('click', () => {
            aplicarInformacoes();
        });
    }

carregarRotas();


//mapa interativo
const containerMapaUber = document.getElementById('mapa-uber');

if (containerMapaUber && typeof L !== 'undefined') {
    const mapaUber = L.map('mapa-uber').setView([-21.8021, -48.1837], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(mapaUber);

    const iconeUsuario = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3203/3203071.png', 
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    const iconeOnibus = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png', 
        iconSize: [45, 45],
        iconAnchor: [22, 45]
    });

    //  Ícone especial para as Faculdades (Chapéu de formatura)
    const iconeFaculdade = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3068/3068098.png', 
        iconSize: [35, 35],
        iconAnchor: [17, 35]
    });

    //  Coordenadas reais dos polos em Araraquara
    const faculdades = [
        { nome: "IFSP", lat: -21.7840, lng: -48.2107 },
        { nome: "UNIP", lat: -21.7826, lng: -48.1973 },
        { nome: "UNIARA", lat: -21.7960, lng: -48.1781 },
        { nome: "UNESP", lat: -21.8124, lng: -48.1986 },
        { nome: "FATEC", lat: -21.7735, lng: -48.1365 }
    ];

    faculdades.forEach(facu => {
        const marcadorFacu = L.marker([facu.lat, facu.lng], {icon: iconeFaculdade}).addTo(mapaUber);
        
        marcadorFacu.bindTooltip(`<b>${facu.nome}</b>`, { direction: 'top', offset: [0, -30] });

        marcadorFacu.on('click', () => {
            exibeModalFaculdade(facu.nome);
        });
    });

    let marcadorUsuario;
    let marcadorOnibus; 
    
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(function(posicao) {
            const lat = posicao.coords.latitude;
            const lng = posicao.coords.longitude;

            if (marcadorUsuario) {
                marcadorUsuario.setLatLng([lat, lng]);
            } else {
                marcadorUsuario = L.marker([lat, lng], {icon: iconeUsuario}).addTo(mapaUber);
                marcadorUsuario.bindPopup("<b>Você está aqui!</b>").openPopup();
                mapaUber.setView([lat, lng], 16);
                
                // Só inicia a busca pelo ônibus após achar o usuário
                rastrearMotoristaReal();
            }
        }, function(erro) {
            console.log("Erro de GPS do Passageiro: ", erro);
        }, { enableHighAccuracy: true });
    }

    function rastrearMotoristaReal() {
        // Conecta ao servidor Node.js
        const socket = io('http://localhost:3000');
        
        //  vai ficar escutando as atualizações do motorista vindas do servidor
        socket.on('receber_gps', (dadosDoMotorista) => {
            if (marcadorOnibus) {
                // Move o ônibus
                marcadorOnibus.setLatLng([dadosDoMotorista.lat, dadosDoMotorista.lng]);
            } else {
                // Cria o ônibus
                marcadorOnibus = L.marker([dadosDoMotorista.lat, dadosDoMotorista.lng], {icon: iconeOnibus}).addTo(mapaUber);
                marcadorOnibus.bindPopup(`<b>${dadosDoMotorista.linha || 'Ônibus'}</b><br>Em trânsito!`).openPopup();
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        obterRotas,
        carregarRotas,
        exibeInformacoesLinha,
        atualizaHistorico,
        aplicarInformacoes,
        pontosUni
    };
}