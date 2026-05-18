const { exibeInformacoesLinha, exibeHistorico } = require('../js/historico.js');


describe('Testes da Página de Histórico', () => {
    
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="informacoesLinha">
                <div id="conteudoLinha"></div>
            </div>
            <div id="historico"></div>
        `;

        localStorage.clear();
        global.bootstrap = {
            Modal: jest.fn().mockImplementation(() => {
                return { show: jest.fn() };
            })
        };
    });



    describe('exibeInformacoesLinha()', () => {

        test('Deve preencher o #conteudoLinha com os dados da linha recebida', () => {
    
            const linhaMock = {
                linha: "042 - Centro / Shopping",
                saida: "14:00",
                chegada: "14:45",
                previsao: "No horário",
                pontos: ["Terminal", "Avenida"]
            };

    
            exibeInformacoesLinha(linhaMock);

            const conteudo = document.getElementById('conteudoLinha').innerHTML;
            expect(conteudo).toContain('042 - Centro / Shopping');
            expect(conteudo).toContain('Terminal');
            expect(conteudo).toContain('Avenida');
        });

    });



    describe('exibeHistorico()', () => {

        test('Deve exibir mensagem de lista vazia quando o usuário não tiver histórico', () => {
            
            localStorage.setItem("usuarioLogado", JSON.stringify({ historicoLinhas: [] }));
            exibeHistorico();

            const historicoDiv = document.getElementById('historico');
            expect(historicoDiv.innerHTML).toContain('Você ainda não acessou nenhuma linha!');
        });


        test('Deve criar os cards corretamente se o usuário tiver histórico salvo', () => {
    
            const rotasMock = [
                { id: 1, linha: "010 - Circular", previsao: "No horário" },
                { id: 2, linha: "020 - Bairro", previsao: "Atrasado" }
            ];
            localStorage.setItem('rotasClockerBus', JSON.stringify(rotasMock));

            localStorage.setItem('usuarioLogado', JSON.stringify({ historicoLinhas: [1, 2] }));
            exibeHistorico();

            const historicoDiv = document.getElementById('historico');
            const cards = historicoDiv.querySelectorAll('.card');

            expect(cards.length).toBe(2);
            
            expect(historicoDiv.innerHTML).toContain('010 - Circular');
            expect(historicoDiv.innerHTML).toContain('020 - Bairro');
        });
    });


    describe('Event Listener (Clique)', () => {

        test('Deve abrir o Modal do Bootstrap ao clicar em "Mais Informações"', () => {
            
            localStorage.setItem('rotasClockerBus', JSON.stringify([{ id: 10, linha: "100 - Teste", pontos: [] }]));
            
            document.body.innerHTML += `<a class="informacoes" data-rota-id="10" href="#">Mais Informações</a>`;

            const botaoInfo = document.querySelector('.informacoes');
            botaoInfo.click();
    
            expect(global.bootstrap.Modal).toHaveBeenCalled();
        });
    });
    
});