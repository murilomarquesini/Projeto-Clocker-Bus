const containerRotas = document.getElementById('container-rotas');
const btnAdicionar = document.getElementById('btn-adicionar');

function obterRotas() {
    let rotaSalva = JSON.parse(localStorage.getItem('rotasClockerBus'));
    
    if (!rotaSalva || rotaSalva.length === 0) {
        rotaSalva = [
            {
                linha: "042 - Centro / Shopping",
                saida: "14:00",
                previsao: "No horário",
                chegada: "14:45",
            },
            {
                linha: "015 - Terminal / Bairro",
                saida: "14:15",
                previsao: "Atrasado 5 min",
                chegada: "15:05",
            }
        ];
        localStorage.setItem('rotasClockerBus', JSON.stringify(rotaSalva));
    }
    
    return rotaSalva;
}


function carregarRotas() {
    if(!containerRotas) return;

    const rotas = obterRotas();
    containerRotas.innerHTML = '';

    rotas.forEach(function(rota) {
        const card = document.createElement('div');
        card.className = 'card-rota';

        card.innerHTML = `
            <img src="${rota.imagem}" class="card-img" alt="Mapa da rota">
            <div class="card-info">
                <span>Número da linha: <b>${rota.linha}</b></span>
                <span>Previsão de saída: <b>${rota.saida}</b></span>
                <span>Previsão: <b>${rota.previsao}</b></span>
                <span>Previsão de chegada: <b>${rota.chegada}</b></span>
                <a class="card-link" href="#">Mais Informações</a>
            </div>
        `;
        
        containerRotas.appendChild(card);
    });
}


if (btnAdicionar) {
    btnAdicionar.addEventListener('click', function(e) {
        e.preventDefault();

        let nomeDaLinha = prompt("Digite o número e o destino da nova linha (Ex: 099 - Bairro Novo):");

        if (!nomeDaLinha || nomeDaLinha.trim().length === 0) {
            alert('Aviso: O nome da linha é obrigatório para adicionar!');
            return;
        }

        let rotasAtuais = obterRotas();

        const novaRota = {
            linha: nomeDaLinha.trim(),
            saida: "--:--",
            previsao: "Aguardando",
            chegada: "--:--",
            imagem: "https://via.placeholder.com/100x70?text=Novo"
        };

        rotasAtuais.push(novaRota);

        localStorage.setItem('rotasClockerBus', JSON.stringify(rotasAtuais));

        alert('Nova rota adicionada com sucesso no sistema!');
        carregarRotas();
    });
}

carregarRotas();