const { validacoes } = require('../js/cadastro.js');

describe('Testes de Validação de Cadastro', () => {
    
    // Antes de cada teste, vamos criar os campos de input no "navegador de mentira"
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="nome" />
            <input id="email" />
            <input id="senha" />
        `;
        // Mock do alert (para o teste não travar tentando abrir uma janela real)
        global.alert = jest.fn();
    });


    test('deve retornar false e mostrar alerta se o nome estiver vazio', () => {
        const nomeInput = document.querySelector('#nome');
        nomeInput.value = ''; // Nome vazio

        const resultado = validacoes();

        expect(resultado).toBe(false);
        expect(global.alert).toHaveBeenCalledWith('O nome é obrigatório');
    });


    test('deve retornar false se o nome tiver menos de 5 caracteres', () => {
        const nomeInput = document.querySelector('#nome');
        nomeInput.value = 'Ana'; // Nome curto demais

        const resultado = validacoes();

        expect(resultado).toBe(false);
        expect(global.alert).toHaveBeenCalledWith('Nome deve ter pelo menos 5 caracteres');
    });
    

    test('deve retornar true se todos os campos estiverem preenchidos corretamente', () => {
        document.querySelector('#nome').value = 'Sarah Oliveira';
        document.querySelector('#email').value = 'sarah@email.com';
        document.querySelector('#senha').value = 'Senha123!';
        
        // Mock do validity (o JSDOM às vezes precisa de uma ajuda com validações complexas)
        document.querySelector('#nome').validity = { patternMismatch: false };
        document.querySelector('#email').validity = { patternMismatch: false };
        document.querySelector('#senha').validity = { patternMismatch: false };

        const resultado = validacoes();
        expect(resultado).toBe(true);
    });
});