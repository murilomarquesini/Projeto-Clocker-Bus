const {
    obterRotas,
    carregarRotas,
    buscarRotas,
    exibeInformacoesLinha,
    atualizaHistorico
} = require('../js/principaisRotas.js');


describe('Testes do Sistema de Rotas ClockerBus', () => {
   
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="container-rotas"></div>
            <button class="button-buscar"></button>
            <div id="informacoesLinha">
                <div id="conteudoLinha"></div>
            </div>
        `;
        
        localStorage.clear();
        localStorage.removeItem('rotasClockerBus');
    });



    describe('obterRotas()', () => {

        test('Deve criar as rotas padrão no localStorage se ele estiver vazio', () => {
            expect(localStorage.getItem('rotasClockerBus')).toBeNull();
            
            const rotas = obterRotas();
            
            expect(rotas.length).toBe(10); 
            expect(localStorage.getItem('rotasClockerBus')).not.toBeNull(); 
        });


        test('Deve retornar as rotas já salvas no localStorage sem sobrescrever', () => {
            const rotasMock = [{ id: 99, linha: "999 - Teste", pontos: [] }];
            localStorage.setItem('rotasClockerBus', JSON.stringify(rotasMock));

            const rotas = obterRotas();

            expect(rotas.length).toBe(1);
            expect(rotas[0].linha).toBe("999 - Teste");
        });
    });



    describe('carregarRotas()', () => {

        test('Deve exibir apenas 4 rotas inicialmente e o botão "Ver Todas as Rotas"', () => {
            carregarRotas();
            
            const container = document.getElementById('container-rotas');
            const cards = container.querySelectorAll('.card-rota');
            const botaoVerMais = container.querySelector('.button-buscar');

            expect(cards.length).toBe(4);
            expect(botaoVerMais).not.toBeNull();
            expect(botaoVerMais.innerText).toBe('Ver Todas as Rotas');
        });


        test('Deve exibir mensagem de "Nenhuma rota encontrada" se o array for vazio', () => {
            carregarRotas([]); 
            
            const container = document.getElementById('container-rotas');
            expect(container.innerHTML).toContain('Nenhuma rota encontrada');
        });
    });



    describe('buscarRotas()', () => {

        test('Deve filtrar rotas corretamente pelo nome do destino', () => {

            buscarRotas("", "Aeroporto");
            
            const container = document.getElementById('container-rotas');
            const cards = container.querySelectorAll('.card-rota');
            
            expect(cards.length).toBe(1);
            expect(container.innerHTML).toContain('Praça Central / Aeroporto');
        });


        test('Deve filtrar rotas corretamente combinando origem e destino', () => {
            buscarRotas("UPA", "Centro");
            
            const container = document.getElementById('container-rotas');
            const cards = container.querySelectorAll('.card-rota');
            
            expect(cards.length).toBe(1);
            expect(container.innerHTML).toContain('102 - UPA / Centro');
        });
    });



    describe('atualizaHistorico()', () => {

        test('Deve adicionar o ID da rota pesquisada ao histórico do usuário logado', () => {

            const usuarioFalso = { email: "teste@teste.com", historicoLinhas: [] };
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioFalso));
            localStorage.setItem('usuarios', JSON.stringify([usuarioFalso]));

            
            atualizaHistorico(5);

            const usuarioAtualizado = JSON.parse(localStorage.getItem('usuarioLogado'));
            expect(usuarioAtualizado.historicoLinhas).toContain(5);
            expect(usuarioAtualizado.historicoLinhas[0]).toBe(5);
        });


        test('Deve mover a rota para o topo do histórico se ela já existir', () => {
            const usuarioFalso = { email: "teste@teste.com", historicoLinhas: [3, 5, 8] };
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioFalso));
            localStorage.setItem('usuarios', JSON.stringify([usuarioFalso]));

            
            atualizaHistorico(5);

            const usuarioAtualizado = JSON.parse(localStorage.getItem('usuarioLogado'));
            expect(usuarioAtualizado.historicoLinhas).toEqual([5, 3, 8]);
        });
    });


    describe('exibeInformacoesLinha()', () => {

        test('Deve preencher o modal com as informações da linha clicada', () => {
            const linhaMock = {
                id: 1, 
                linha: "042 - Centro / Shopping", 
                saida: "14:00", 
                previsao: "No horário", 
                chegada: "14:45", 
                pontos: ["Ponto A", "Ponto B"],  
            };

            exibeInformacoesLinha(linhaMock);

            const conteudoModal = document.getElementById('conteudoLinha').innerHTML;
            
            expect(conteudoModal).toContain('042 - Centro / Shopping');
            expect(conteudoModal).toContain('14:00');
            expect(conteudoModal).toContain('Ponto A');
            expect(conteudoModal).toContain('Ponto B');
        });
    });

});